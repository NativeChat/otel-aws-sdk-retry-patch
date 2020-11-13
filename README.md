# otel-aws-sdk-retry-patch
NodeJS module which adds the traceparent header to the unsignable headers in the aws-sdk.

<br />

> **IMPORTANT**: The `patch` function must be called before the aws-sdk is required.

<br />

## Why do we need this module?
The `@opentelemtry/plugin-https` breaks the automatic retry of aws requests -> https://stackoverflow.com/questions/64693442/wrong-aws-request-signature-caused-by-opentelemetry-https-plugin

This module is a temporary workaround for the issue described in StackOverflow until there is a better solution.

<br />

## How does it work?
This module adds `traceparent` to `AWS.Signers.V4.prototype.unsignableHeaders`.

<br />

## How to use the module?
```TypeScript
import { patch } from "otel-aws-sdk-retry-patch";

patch();

// Verify that unsignableHeaders contains the traceparent header.
console.log(require("aws-sdk").Signers.V4.prototype.unsignableHeaders);
```
