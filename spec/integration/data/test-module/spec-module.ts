// tslint:disable-next-line:no-var-requires
const AWS = require("aws-sdk");

export const getUnsignableHeaders = () => {
    return AWS.Signers.V4.prototype.unsignableHeaders;
};
