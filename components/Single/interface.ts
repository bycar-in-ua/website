import type { Complectation, PowerUnit } from "@bycar-in-ua/sdk";
import type { InjectionKey, Component } from "vue";

export const ComplectationKey: InjectionKey<Complectation | null> =
  Symbol("complectation");

export const PowerUnitKey: InjectionKey<PowerUnit | null> = Symbol("powerUnit");

export type InfoBulletProps = {
  title: string;
  value: string;
  icon: string | Component;
};
