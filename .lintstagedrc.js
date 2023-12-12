const path = require('path');

const buildEslintCommand = (filenames) =>
  `eslint --no-cache --ignore-pattern '!./.eslintignore' --no-ignore --ext ts,tsx ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} --max-warnings 0`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
