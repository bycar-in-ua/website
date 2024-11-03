import { watch } from "vue";

const defaultWindow = import.meta.client ? window : undefined;

const noop = () => { };

export function useEventListener(...args: any[]) {
  let target: EventTarget | undefined;
  let event: string;
  let listener: any;
  let options: any;

  if (typeof args[0] === "string") {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }

  if (!target) return noop;

  let cleanup = noop;

  const stopWatch = watch(
    target,
    (el) => {
      cleanup();
      if (!el) return;

      el.addEventListener(event, listener, options);

      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = noop;
      };
    },
    { immediate: true, flush: "post" },
  );

  const stop = () => {
    stopWatch();
    cleanup();
  };

  return stop;
}

export default useEventListener;
