import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";


let pluginOptions = [
  resolve({
    browser: true
  }),
  commonjs(),
];

export default [{
  input: './dist/index/index.js',
  output: [
    { file: "dist/index/main.js",     format: "umd", name: 'ziti-browzer-edge-client' },
    { file: "dist/index/main.min.js", format: "cjs", name: 'ziti-browzer-edge-client', plugins: [terser()] },
    { file: "dist/index/main.esm.js", format: "esm", name: 'ziti-browzer-edge-client' },
  ],
  treeshake: true,
  plugins: pluginOptions,
}];