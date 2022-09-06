import { type Ref, type ComputedRef, reactive, ref } from "vue";
import { useEventListener } from "./useEventListener";

export enum SwipeDirection {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
  NONE = "NONE",
}

interface Position {
  x: number;
  y: number;
}

export interface UseSwipeOptions {
  /**
   * @default 50
   */
  threshold?: number;
  onSwipeStart?: (e: TouchEvent) => void;
  onSwipeEnd?: (e: TouchEvent, direction: SwipeDirection) => void;
}

export interface UseSwipeReturn {
  isSwiping: Ref<boolean>;
  direction: ComputedRef<SwipeDirection | null>;
  coordsStart: Readonly<Position>;
  coordsEnd: Readonly<Position>;
  lengthX: ComputedRef<number>;
  lengthY: ComputedRef<number>;
  stop: () => void;
}

export function useSwipe(
  target: Ref<EventTarget | HTMLElement | null | undefined>,
  options: UseSwipeOptions,
): UseSwipeReturn {
  const { threshold = 50, onSwipeEnd, onSwipeStart } = options;

  const coordsStart = reactive<Position>({ x: 0, y: 0 });
  const coordsEnd = reactive<Position>({ x: 0, y: 0 });

  const diffX = computed(() => coordsStart.x - coordsEnd.x);
  const diffY = computed(() => coordsStart.y - coordsEnd.y);

  const { max, abs } = Math;
  const isThresholdExceeded = computed(
    () => max(abs(diffX.value), abs(diffY.value)) >= threshold,
  );

  const isSwiping = ref(false);

  const direction = computed(() => {
    if (!isThresholdExceeded.value) return SwipeDirection.NONE;

    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT;
    } else {
      return diffY.value > 0 ? SwipeDirection.UP : SwipeDirection.DOWN;
    }
  });

  const getTouchEventCoords = (e: TouchEvent): number[] => [
    e.touches[0].clientX,
    e.touches[0].clientY,
  ];

  const updateCoordsStart = (x: number, y: number) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };

  const updateCoordsEnd = (x: number, y: number) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };

  const listenerOptions: { passive?: boolean; capture?: boolean } = {
    passive: true,
  };

  const onTouchStart = (e: TouchEvent) => {
    onSwipeStart?.(e);
    const [x, y] = getTouchEventCoords(e);
    updateCoordsStart(x, y);
    updateCoordsEnd(x, y);
  };

  const onTouchMove = (e: TouchEvent) => {
    const [x, y] = getTouchEventCoords(e);
    updateCoordsEnd(x, y);
    if (!isSwiping.value && isThresholdExceeded.value) isSwiping.value = true;
  };

  const onTouchEnd = (e: TouchEvent) => {
    onSwipeEnd?.(e, direction.value);
    isSwiping.value = false;
    updateCoordsStart(0, 0);
    updateCoordsEnd(0, 0);
  };

  const stops = [
    useEventListener(target, "touchstart", onTouchStart, listenerOptions),
    useEventListener(target, "touchmove", onTouchMove, listenerOptions),
    useEventListener(target, "touchend", onTouchEnd, listenerOptions),
    useEventListener(target, "touchcancel", onTouchEnd, listenerOptions),
  ];

  const stop = () => stops.forEach((s) => s());

  return {
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop,
  };
}

export default useSwipe;
