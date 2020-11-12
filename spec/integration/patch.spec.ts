import { patch } from "../../lib/index";

const TraceParentHeader = "traceparent";

describe("otel-aws-sdk-retry-patch", () => {
    it("should patch the aws-sdk module", () => {
        patch();

        const AWS = require("aws-sdk");

        expect(AWS.Signers.V4.prototype.unsignableHeaders).toContain(TraceParentHeader);

        const { getUnsignableHeaders } = require("./data/test-module/spec-module");

        expect(getUnsignableHeaders()).toContain(TraceParentHeader);
    });

    it("should add the traceparent header only once", () => {
        patch();
        patch();

        const AWS = require("aws-sdk");

        const actual = AWS.Signers.V4.prototype.unsignableHeaders.filter((header: string) => header === TraceParentHeader);
        expect(actual).toHaveSize(1);
    });
});
