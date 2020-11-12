// tslint:disable-next-line:no-var-requires
const Hook = require("require-in-the-middle");

const TraceParentHeader = "traceparent";

export const patch = () => {
    Hook(["aws-sdk"], (moduleExports: any, name: string) => {
        const unsignableHeaders = moduleExports.Signers.V4.prototype.unsignableHeaders;
        if (!unsignableHeaders.includes(TraceParentHeader)) {
            unsignableHeaders.push(TraceParentHeader);
        }

        return moduleExports;
    });
};
