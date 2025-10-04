export default {
    testMatch: [
        "**/tests/**/*.(test|spec).js",
    ],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
        "!src/model/index.ts"
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    testEnvironment: "node"
};
