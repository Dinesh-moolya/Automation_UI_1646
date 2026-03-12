import { test, expect } from "@playwright/test";
import { UIActionsPage } from "../helper/UIActionsPage.js";
import { InteractiveElementsPage } from "../helper/InteractiveElementsPage.js";
import path from "path";
import dotenv from "dotenv";
import { ControlsPage } from "../helper/ControlsPage.js";
dotenv.config();

test.describe("UI Test Automation", () => {
  test.beforeEach(async ({ page }) => {
    const url = process.env.url;
    console.log("page Redirect Url : ", url);
    await page.goto(url);
  });

  test.afterEach(async ({ page }) => {
    await page.goBack();
    console.log("Navigated back to the home page");
    await page.close();
    console.log("page closed");
  });

  // Click on the "Dynamic ID" link and interact with the button
  test("Dynamic ID", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.dynamicLinks();
    await helper.dynamicButtons();
    console.log("Button with Dynamic ID clicked");
  });

  // Click on the "Class Attribute" link and interact with the button
  test("Class Attribute", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.attributeLinks();
    await helper.attributeButtons();
    console.log("Button with Class Attribute clicked");
  });

  // click on the "Load delay" link and interact with the button
  test("Load Delay", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.loadDelayLinks();
    await helper.loadDelayButtons();
    await expect(helper.loadDelayButton).toBeVisible();
    console.log("Button Appearing After Delay clicked");
  });

  // Click on the "Hidden Layers" link and interact with the button
  test("Hidden Layers", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.hiddenLayersLinks();
    await helper.hiddenLayersButtons();
    await expect(helper.hiddenLayersButton.first()).toBeVisible();
    console.log("Button clicked");
  });

  // Click on the "AJAX Data" link and interact with the button
  test("AJAX Data", async ({ page }) => {
    test.setTimeout(60000);
    const helper = new UIActionsPage(page);
    await helper.ajaxDataLinks();
    await helper.ajaxDataButtons();
    await page.waitForLoadState("networkidle");
    console.log("Data loaded with AJAX get request");
  });

  // Click on the "Client Side Delay" link and interact with the button
  test("Client Side Delay", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clientSideDelayLinks();
    await helper.clientSideDelayButtons();
    await expect(helper.clientSideDelayButton).toBeVisible();
    console.log("Button Triggering Client Side Logic clicked");
  });

  // Click on the "Click" link and interact with the button
  test("Click", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickLinks();
    await helper.clickButtons();
    console.log("Button That Ignores DOM Click clicked");
  });

  // Click on the "Text Input" link and interact with the textbox and button
  test("Text Input", async ({ page }) => {
    test.setTimeout(60000);
    const helper = new UIActionsPage(page);
    await helper.textInputLinks();
    await helper.textInputTextbox.fill("Test");
    await helper.textInputButtons();
    await expect(helper.textInputButton1).toBeVisible();
    console.log("Button changed its name based on Input Value and clicked");
  });

  // Click on the "Scrollbars" link and interact with the button
  test("Scrollbars", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.scrollbarsLinks();
    await expect(helper.hidingButton).toBeVisible();
    await helper.hidingButtons();
    console.log("Button clicked");
  });

  // Click on the "Dynamic Table" Verify cell value in a dynamic table
  test("Dynamic Table", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.dynamicTableLinks();
    const expectedCpu = await helper.getExpectedCpuFromWarning();
    const actualCpu = await helper.getCpuValueForBrowser("Chrome");
    expect(actualCpu).toBe(expectedCpu);
    console.log("Table CPU verified for Chrome value: " + actualCpu);
  });

  // Click on the "Verify Text" Finding an element by displayed text has nuances
  test("Verify Text", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.verifyTextLinks();
    await expect(helper.welcomeText).toBeVisible();
    console.log("Welcome UserName! verified");
  });

  //click on the "progress bar" link and interact with the progress bar
  test("Progress Bar", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.progressBarLinks();
    const startValue = await helper.getProgressValue();
    if (Number(startValue) > 0) await page.reload();
    await helper.startProgress();
    await helper.stopAtTargetValue(75);
    const finalValue = await helper.getProgressValue();
    console.log("Progress Bar Value:", finalValue + "%");
    expect(Number(finalValue)).toBeGreaterThanOrEqual(75);
  });

  //click on the "visibility" link and interact with the buttons
  test("Visibility", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.VisibilityLinks();
    await helper.clickHide();
    const status = await helper.getVisibilityStatus();
    Object.entries(status).forEach(([key, value]) => {
      console.log(`${key} button is ${value ? "visible" : "not visible"}`);
    });
  });

  // click on the "sample app" link and interact with the form
  test("Sample App", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.sampleApp();
    await helper.fillSampleAppUserName("testuser");
    await helper.fillSampleAppPassword("pwd");
    await helper.sampleAppLoginButtons();
    await expect(helper.welcomeText).toBeVisible();
    console.log(helper.welcomeTextVerified + " is verified");
  });

  // Click on the "Mouse Over" link and interact with the button
  test("Mouse Over", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.mouseOvers();
    await helper.clickMes();
    await helper.expectTheLinkAboveClicked1();
    await helper.clickMes();
    await helper.expectTheLinkAboveClicked2();
    console.log(helper.theLinkAboveClicked2.textContent() + " is verified");
  });

  // Click on the "Non-Breaking Space" link and interact with the button
  test("Non-Breaking Space", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.nonBreakingSpaceLinks();
    await helper.myButtons();
    await helper.expectMyButtonToBeVisible();
    console.log("My Button clicked");
  });

  // Click on the "Overlapped Element" link and interact with the button
  test("Overlapped Element", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.overlappedElementLinks();
    await helper.fillIdTextbox("test");
    await helper.fillNameTextbox("text");
    console.log("Overlapped Element verified");
  });

  // Click on the "Alerts" link and interact with the alert
  test("Alerts", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.alertsLinks();
    await helper.handleAlert("accept");
    await helper.handleConfirm("accept");
    await helper.handlePrompt("Test Input", "accept");
  });

  // Click File Upload link and interact with the file upload input
  test("File Upload", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.fileUploadLinks();
    await helper.uploadFile(path.resolve("TestData/testFile.txt"));
    await helper.expectFileToBeVisible("testFile.txt");
    await helper.clearFileInput();
    await helper.expectFileToBeVisible("testFile.txt");
    console.log("File Upload verified");
  });

  //Click on the "Animation Button" link and interact with the button
  test("Animated Button", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.animatedButtonLinks();
    await helper.startAnimationButtons();
    await helper.expectMovingTargetButtonToBeVisible();
    await helper.movingTargetButtons();
    console.log("Animated Button verified");
  });

  // Click on the "Disabled Input" link and interact with the button
  test("Disabled Input", async ({ page }) => {
    const helper = new ControlsPage(page);
    await helper.disabledInputLinks();
    await helper.fillEditField("test");
    await helper.clickEnableButton();
    await helper.expectEditFieldToBeDisabled();
    await helper.expectEditFieldToBeEnabled();
    console.log("Disabled Input verified");
  });

  //Click on the "Auto Wait" link and interact with the button
  const DELAYS = [3, 5, 10];
  const ELEMENTS = ["button", "input", "textarea", "select", "label"];
  const CHECK_TYPES = ["Visible", "Enabled", "Editable", "Size", "OnTop"];

  test.describe("Auto Wait", () => {
    test.setTimeout(120000);
    for (const type of ELEMENTS) {
      for (const check of CHECK_TYPES) {
        if (type === "label" && (check === "Enabled" || check === "Editable"))
          continue;
        if ((type === "button" || type === "select") && check === "Editable")
          continue;

        test(`Verify ${type} remains ${check} after restore`, async ({
          page,
        }) => {
          const helper = new ControlsPage(page);
          await helper.autoWaitLinks();
          await helper.onElementType(type);
          const target =
            type === "label" ? helper.targetLabel : helper.targetInput;
          for (const delay of DELAYS) {
            // 1. ACTION
            switch (check) {
              case "Visible":
                await helper.uncheckVisibleCheckbox();
                break;
              case "Enabled":
                await helper.uncheckEnabledCheckbox();
                break;
              case "Editable":
                await helper.uncheckEditableCheckbox();
                break;
              case "Size":
                await helper.uncheckNonZeroSize();
                break;
              case "OnTop":
                await helper.uncheckOnTop();
                break;
            }

            await helper.applyDelay(delay);

            // 2. NEGATIVE ASSERTION
            switch (check) {
              case "Visible":
              case "Size":
                await expect(target).not.toBeVisible();
                break;
              case "Enabled":
                await expect(target).toBeDisabled();
                break;
              case "Editable":
                await expect(target).not.toBeEditable();
                break;
            }

            // 3. SMART WAIT (Inside helper)
            await helper.waitForRestore();

            // 4. POSITIVE ASSERTION
            switch (check) {
              case "Visible":
              case "Size":
                await expect(target).toBeVisible();
                break;
              case "OnTop":
                await expect(target).toBeVisible();
                // FIX 2: Force Playwright to verify the element isn't covered by an overlay
                await target.hover({ trial: true });
                break;
              case "Enabled":
                await expect(target).toBeEnabled();
                break;
              case "Editable":
                await expect(target).toBeEditable();
                break;
            }
          }
          console.log(`Passed: ${type} ${check} suite`);
        });
      }
    }
  });
  // Click on the "Frame" link and interact with the button
  test("Frames", async ({ page }) => {
    const helper = new ControlsPage(page);
    // 1. Handle potential navigation failure
    try {
      await helper.frameLinks();
    } catch (error) {
      throw new Error(
        `Failed to navigate to the Frames page: ${error.message}`,
      );
    }

    const buttons = ["Edit", "Submit", "Click", "Primary"];
    const failedButtons = [];
    for (const btn of buttons) {
      await test.step(`Verify '${btn}' button across frames`, async () => {
        try {
          // --- Frame 1 Actions ---
          if (btn === "Edit") {
            await helper.iframeEditButtons();
          } else if (btn === "Submit") {
            await helper.submitButtons1();
          } else if (btn === "Click") {
            await helper.clickMeButtons1();
          } else if (btn === "Primary") {
            await helper.primaryButtons1();
          }
          await helper.expectButtonPressedText(btn);

          // --- Frame 2 Actions ---
          if (btn === "Edit") {
            await helper.iframeEditButtons2();
          } else if (btn === "Submit") {
            await helper.submitButtons2();
          } else if (btn === "Click") {
            await helper.clickMeButtons2();
          } else if (btn === "Primary") {
            await helper.primaryButtons2();
          }
          await helper.expectButtonPressedText2(btn);
        } catch (error) {
          console.error(
            `\n[ERROR] Frame verification failed for button: '${btn}'`,
          );
          console.error(error.message);
          failedButtons.push(btn);
        }
      });
    }

    // 4. Final verification state
    if (failedButtons.length > 0) {
      throw new Error(
        `Frames test finished with errors. Failed buttons: ${failedButtons.join(", ")}`,
      );
    } else {
      console.log("Frames verified successfully");
    }
  });
});
