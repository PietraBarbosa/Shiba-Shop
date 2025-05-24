import type { Config } from 'jest';

import jestConfig from './jest.config';

const jestE2EConfig: Config = {
  ...jestConfig,

  // Display
  displayName: {
    name: 'E2E TESTS',
    color: 'green',
  },

  // Regex
  testRegex: '.*\\.e2e-spec\\.ts$',
  testTimeout: 5000,

  silent: true,
};

export default jestE2EConfig;
