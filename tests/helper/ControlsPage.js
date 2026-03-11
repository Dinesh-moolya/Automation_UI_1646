import { expect } from "@playwright/test";

export class ControlsPage {
  constructor(page) {
    this.page = page;
    this.disabledInputLink = page.getByRole("link", { name: "Disabled Input" });
    this.editField = page.getByRole("textbox", { name: "Edit Field" });
    this.enableButton = page.getByRole("button", {
      name: "Enable Edit Field with 5",
    });
    this.autoWaitLink = page.getByRole("link", { name: "Auto Wait" });
    this.elementType = async (button) => {
      await page
        .getByLabel("Choose an element type:")
        .selectOption(`${button}`);
    };
    this.visibleCheckbox = page.getByRole("checkbox", { name: "Visible" });
    this.enabledCheckbox = page.getByRole("checkbox", { name: "Enabled" });
    this.editableCheckbox = page.getByRole("checkbox", { name: "Editable" });
    this.nonZeroSize = page.getByRole("checkbox", { name: "Non Zero Size" });
    this.onTop = page.getByRole("checkbox", { name: "On Top" });

    this.apply3sButton = page.getByRole("button", { name: "Apply 3s" });
    this.apply5sButton = page.getByRole("button", { name: "Apply 5s" });
    this.apply10sButton = page.getByRole("button", { name: "Apply 10s" });

    this.targetButton = page.getByRole("button", { name: "Button" });
    this.targetInput = page.locator("#target");
    this.targetLabel = page.getByText("This is a Label");
    this.frameLink = page.getByRole("link", { name: "Frame" });
    this.outerFrame = page.locator('iframe[name="frame-outer"]').contentFrame();
    this.innerFrame = this.outerFrame
      .locator('iframe[name="frame-inner"]')
      .contentFrame();
    // Frame 1 Buttons
    this.iframeEdit1 = this.outerFrame.getByRole("button", { name: "Edit" });
    this.submitButton1 = this.outerFrame.getByRole("button", {
      name: "Submit",
    });
    this.clickMeButton1 = this.outerFrame.getByRole("button", {
      name: "Click me",
    });
    this.primaryButton1 = this.outerFrame.getByRole("button", {
      name: "Primary",
    });
    // Frame 2 Buttons
    this.iframeEdit2 = this.innerFrame.getByRole("button", { name: "Edit" });
    this.submitButton2 = this.innerFrame.getByRole("button", {
      name: "Submit",
    });
    this.clickMeButton2 = this.innerFrame.getByRole("button", {
      name: "Click me",
    });
    this.primaryButton2 = this.innerFrame.getByRole("button", {
      name: "Primary",
    });
    // Dynamic Text Locators
    this.buttonPressedText = (button) =>
      this.outerFrame.getByText(`Button pressed: ${button}`);

    this.buttonPressedText2 = (button) =>
      this.innerFrame.getByText(`Button pressed: ${button}`);
  }
  async disabledInputLink() {
    await this.disabledInputLink.click();
  }
  async fillEditField(value) {
    await this.editField.fill(value);
  }
  async clickEnableButton() {
    await this.enableButton.click();
  }
  async expectEditFieldToBeDisabled() {
    await expect(this.editField).toBeDisabled();
  }
  async expectEditFieldToBeEnabled() {
    await expect(this.editField).toBeEnabled({ timeout: 6000 });
  }
  async clickAutoWaitLink() {
    await this.autoWaitLink.click();
  }

  async clickOnElementType(button) {
    await this.elementType(button);
  }

  async uncheckVisibleCheckbox() {
    await this.visibleCheckbox.uncheck();
  }

  async uncheckEnabledCheckbox() {
    await this.enabledCheckbox.uncheck();
  }

  async uncheckEditableCheckbox() {
    await this.editableCheckbox.uncheck();
  }

  async uncheckNonZeroSize() {
    await this.nonZeroSize.uncheck();
  }

  async uncheckOnTop() {
    await this.onTop.uncheck();
  }

  async applyDelay(seconds) {
    switch (seconds) {
      case 3:
        await this.apply3sButton.click();
        break;
      case 5:
        await this.apply5sButton.click();
        break;
      case 10:
        await this.apply10sButton.click();
        break;
    }
  }

  async clickFrameLink() {
    await this.frameLink.click();
  }

  async clickIframeEditButton() {
    await this.iframeEdit1.click();
  }
  async clickSubmitButton1() {
    await this.submitButton1.click();
  }
  async clickClickMeButton1() {
    await this.clickMeButton1.click();
  }
  async clickPrimaryButton1() {
    await this.primaryButton1.click();
  }
  async clickIframeEditButton2() {
    await this.iframeEdit2.click();
  }
  async clickSubmitButton2() {
    await this.submitButton2.click();
  }
  async clickClickMeButton2() {
    await this.clickMeButton2.click();
  }
  async clickPrimaryButton2() {
    await this.primaryButton2.click();
  }
  async expectButtonPressedText(button) {
    await expect(this.buttonPressedText(button)).toBeVisible();
  }
  async expectButtonPressedText2(button) {
    await expect(this.buttonPressedText2(button)).toBeVisible();
  }
  async waitForRestore() {
    const status = this.page.locator("#opstatus");
    await expect(async () => {
      const text = await (await status.textContent())?.trim();
      expect(text).toMatch(/state restored/i);
    }).toPass({
      timeout: 15000,
      intervals: [1000],
    });
  }
}
