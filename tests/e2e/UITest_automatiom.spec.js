import { test, expect } from "@playwright/test";
import { UIActionsPage } from "../helper/UIActionsPage.js";
import { InteractiveElementsPage } from "../helper/InteractiveElementsPage.js";
import { ControlsPage } from "../helper/ControlsPage.js";
import path from "path";

test.describe("UI Test Automation", () => {
  test.beforeEach(async ({ page }) => {
    // const url = process.env.url;
    const url = "http://uitestingplayground.com/";
    console.log("page Redirect Url : ", url);
    await page.goto(url);
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

    await test.step("Navigate to File Upload page", async () => {
      await helper.fileUploadLinks();
    });
    const filePath = path.resolve("TestData/testFile.txt");
    await test.step("Wait for file input and upload file", async () => {
      const fileInput = helper.fileInput;
      await expect(fileInput).toBeEnabled();
      await fileInput.setInputFiles(filePath);
    });

    await test.step("Verify uploaded file is visible", async () => {
      await helper.expectFileToBeVisible("testFile.txt");
    });

    await test.step("Clear uploaded file", async () => {
      await helper.clearFileInput();
    });

    await test.step("Verify file is removed", async () => {
      await expect(helper.fileInput).toHaveValue("");
    });
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

    const isValidCombination = (type, check) => {
      if (type === "label" && ["Enabled", "Editable"].includes(check))
        return false;
      if (["button", "select"].includes(type) && check === "Editable")
        return false;
      return true;
    };

    const actionsMap = {
      Visible: (h) => h.uncheckVisibleCheckbox(),
      Enabled: (h) => h.uncheckEnabledCheckbox(),
      Editable: (h) => h.uncheckEditableCheckbox(),
      Size: (h) => h.uncheckNonZeroSize(),
      OnTop: (h) => h.uncheckOnTop(),
    };

    const negativeAssertions = {
      Visible: async (el) => await expect(el).not.toBeVisible(),
      Size: async (el) => await expect(el).not.toBeVisible(),
      Enabled: async (el) => await expect(el).toBeDisabled(),
      Editable: async (el) => await expect(el).not.toBeEditable(),
      OnTop: async () => {},
    };

    const positiveAssertions = {
      Visible: async (el) => await expect(el).toBeVisible(),
      Size: async (el) => await expect(el).toBeVisible(),
      Enabled: async (el) => await expect(el).toBeEnabled(),
      Editable: async (el) => await expect(el).toBeEditable(),
      OnTop: async (el) => {
        await expect(el).toBeVisible();
        await el.hover({ trial: true });
      },
    };

    for (const type of ELEMENTS) {
      for (const check of CHECK_TYPES) {
        if (!isValidCombination(type, check)) continue;

        test(`Verify ${type} remains ${check} after restore`, async ({
          page,
        }) => {
          const helper = new ControlsPage(page);

          await test.step("Navigate & select element", async () => {
            await helper.autoWaitLinks();
            await helper.onElementType(type);
          });

          const target =
            type === "label" ? helper.targetLabel : helper.targetInput;

          for (const delay of DELAYS) {
            await test.step(`Validate ${check} with ${delay}s delay`, async () => {
              await actionsMap[check](helper);
              await helper.applyDelay(delay);
              await negativeAssertions[check](target);
              await helper.waitForRestore();
              await positiveAssertions[check](target);
            });
          }
        });
      }
    }
  });

  // Click on the "Frame" link and interact with the button
  test("Frames", async ({ page }) => {
    const helper = new ControlsPage(page);

    await test.step("Navigate to Frames page", async () => {
      await helper.frameLinks();
    });

    const buttonActions = {
      Edit: {
        frame1: () => helper.iframeEditButtons(),
        frame2: () => helper.iframeEditButtons2(),
      },
      Submit: {
        frame1: () => helper.submitButtons1(),
        frame2: () => helper.submitButtons2(),
      },
      Click: {
        frame1: () => helper.clickMeButtons1(),
        frame2: () => helper.clickMeButtons2(),
      },
      Primary: {
        frame1: () => helper.primaryButtons1(),
        frame2: () => helper.primaryButtons2(),
      },
    };

    const failedButtons = [];

    for (const [btn, actions] of Object.entries(buttonActions)) {
      await test.step(`Verify '${btn}' button across frames`, async () => {
        try {
          await actions.frame1();
          await helper.expectButtonPressedText(btn);

          await actions.frame2();
          await helper.expectButtonPressedText2(btn);
        } catch (error) {
          failedButtons.push(`${btn} → ${error.message}`);
        }
      });
    }

    if (failedButtons.length) {
      throw new Error(`Frames test failed:\n${failedButtons.join("\n")}`);
    }
  });
});
