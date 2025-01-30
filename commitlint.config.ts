module.exports = {
    extends: ['@commitlint/cli', '@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test', 'docs', 'style', 'chore', 'revert']],
        'subject-case': [2, 'always', 'sentence-case']
    }
};
