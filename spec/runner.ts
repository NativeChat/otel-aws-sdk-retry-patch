// https://stackoverflow.com/questions/29011457/jasmine-jasmine-reporters-on-nodejs-missing-output

import Jasmine from "jasmine";
// @ts-ignore:TS7016
import { JUnitXmlReporter, TerminalReporter } from "jasmine-reporters";
import * as fs from "fs";
import * as path from "path";

const addReporters = (jasmineEnv: Jasmine, reportPrefix: string) => {
    const reportsPath = `${__dirname}/../reports`;
    if (!fs.existsSync(reportsPath)) {
        fs.mkdirSync(reportsPath);
    }

    const junitReporter = new JUnitXmlReporter({
        savePath: reportsPath,
        consolidateAll: true,
        captureStdout: true,
        filePrefix: `${reportPrefix}_report`,
    });

    jasmineEnv.addReporter(junitReporter);

    const terminalReporter = new TerminalReporter({
        color: true,
        verbosity: 3,
    });

    jasmineEnv.addReporter(terminalReporter);
};

export default (jasmineConfigFile: string, configure?: (j: typeof jasmine) => void) => {
    const jasmineEnv = new Jasmine({});
    jasmineEnv.loadConfigFile(jasmineConfigFile);
    const reportPrefix = path.basename(jasmineConfigFile, ".json");
    addReporters(jasmineEnv, reportPrefix);

    if (configure && typeof configure === "function") {
        configure(jasmine);
    }

    jasmineEnv.execute();
};
