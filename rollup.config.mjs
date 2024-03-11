// rollup.config.js
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';

import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      /* {
				file: 'dist/bundle.min.js',
				format: 'iife',
				name: 'version',
				plugins: [terser()]
			} */
    ],
    plugins: [
      // babel({
      //   babelrc: false,
      //   plugins: [['import', { libraryName: 'antd', style: true }]],
      // }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      // postcss(),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    // external: [/\.(css|less|scss)$/],
  },
];
