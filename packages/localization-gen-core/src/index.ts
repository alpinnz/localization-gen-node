export { loadConfig } from "./config/load-config.js";
export { compileProject } from "./compiler/compile-project.js";
export { normalizeProject } from "./normalizer/normalize-project.js";
export { validateProject } from "./validator/validate-project.js";
export { runInit } from "./cli/init.js";
export { runGenerate } from "./cli/generate.js";
export { runValidate } from "./cli/validate.js";
export { runClean } from "./cli/clean.js";
export { runCoverage } from "./cli/coverage.js";
export { interpolate, resolveString, resolveContext, resolveGender, resolvePlural, resolveStructuredContext, resolveStructuredGender, resolveStructuredPlural, parseStructuredVariants } from "./runtime/index.js";
export * from "./types/public-api.js";

