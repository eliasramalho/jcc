const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "9ar79k",
  e2e: {
    baseUrl: 'https://supercliente-qa.rihappy.com.br',
    baseUrl2: 'https://supercliente-qa.pbkids.com.br',
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080, 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
