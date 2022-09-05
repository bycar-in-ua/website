/**
 * @param val Boolean
 * @description Will set overflowY to hidden if passed value is "true"
 */
export const bodyScrollWatcher = (val: boolean) => {
  switch (val) {
    case true:
      document.body.style.overflowY = "hidden";
      break;
    case false:
      document.body.style.overflowY = "";
      break;
    default:
      break;
  }
};
