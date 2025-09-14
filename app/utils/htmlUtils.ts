/**
 * @param val Boolean
 * @description Will set overflowY to hidden if passed value is "true"
 */
export const bodyScrollWatcher = (val: boolean) => {
  document.documentElement.style.overflowY = val ? "hidden" : "";
};
