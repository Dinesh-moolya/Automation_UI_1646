// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  workers: 1,
  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: 2,

  reporter: "html",

  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  use: {
    // Run headless in Docker
    headless: true,

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
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
