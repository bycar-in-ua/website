import type { Complectation, PowerUnit } from "@bycar-in-ua/sdk";
import type { InjectionKey, Component, DeepReadonly } from "vue";

export const ComplectationKey: InjectionKey<{
  complectation: DeepReadonly<Ref<Complectation | null>>;
  setActiveComplectation: (complectation: Complectation) => void;
}> = Symbol("complectation");

export const PowerUnitKey: InjectionKey<{
  powerUnit: DeepReadonly<Ref<PowerUnit | null>>;
  setActivePowerUnit: (powerUnit: PowerUnit) => void;
}> = Symbol("powerUnit");

export type InfoBulletProps = {
  title: string;
  value: string;
  icon: string | Component;
};
