const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const createTransformer = require('tailwind-group-variant');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      join(
        __dirname,
        '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
      ),
      ...createGlobPatternsForDependencies(__dirname),
    ],
    transform: createTransformer(),
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
