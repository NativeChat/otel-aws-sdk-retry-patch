import runner from "./runner";

runner("spec/support/integration.json", (jasmine) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;
    process.env.SUPPRESS_NO_CONFIG_WARNING = "true";
});
