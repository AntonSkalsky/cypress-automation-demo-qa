const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '355937',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
