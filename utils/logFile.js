import { InteractiveElementsPage } from "../tests/helper/InteractiveElementsPage.js";
export function logVisibilityStatus(page) {
  const helper = new InteractiveElementsPage(page);
  const status = helper.getVisibilityStatus();
  console.log("Removed button is", status.removed ? "visible" : "not visible");
  console.log(
    "Zero Width button is",
    status.zeroWidth ? "visible" : "not visible",
  );
  console.log(
    "Overlapped button is",
    status.overlapped ? "visible" : "not visible",
  );
  console.log("Opacity button is", status.opacity ? "visible" : "not visible");
  console.log(
    "Visibility Hidden button is",
    status.visibilityHidden ? "visible" : "not visible",
  );
  console.log(
    "Display None button is",
    status.displayNone ? "visible" : "not visible",
  );
  console.log(
    "Offscreen button is",
    status.offscreen ? "visible" : "not visible",
  );
}
