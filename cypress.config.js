const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  projectId: '355937',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config); 
      return config;
    },
  },
  env: {
      allure: true // ⬅️ Увімкнення плагіна через env
    }
});
