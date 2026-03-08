module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [2, "always", ["feat", "fix", "refactor", "docs", "chore", "test", "style"]],
        "header-max-length": [2, "always", 100],
        "subject-full-stop": [2, "never", "."],
        "subject-case": [2, "always", "lower-case"],
    },
};
