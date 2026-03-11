// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  // Run browsers one after another
  workers: 1,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  reporter: "html",

  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  use: {
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },

    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },
  ],
});
