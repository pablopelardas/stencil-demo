import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'yl-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      dir: 'docs',
      strict: true,
    }
  ],
  testing:{
    browserExecutablePath: '/usr/bin/chromium-browser'
  }
};
