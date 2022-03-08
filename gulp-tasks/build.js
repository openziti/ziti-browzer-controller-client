/*
Copyright Netfoundry, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const {series, src, dest} = require('gulp');
const del = require('del');
const fse = require('fs-extra');
const upath = require('upath');
const execa = require('execa');
const globby = require('globby');


async function cleanSequence() {
  // Delete generated files from the the TypeScript transpile.
  if (await fse.pathExists(upath.join('.', 'src', 'index.ts'))) {
    await del([
      `./dist/*.+(js|mjs|d.ts)`,
      // Don't delete files in node_modules.
      '!**/node_modules/**/*',
    ]);
  }

  // Delete tsc artifacts (if present).
  await del(upath.join('.', 'tsconfig.tsbuildinfo'));
}

/**
 * All src code in this module is auto-generated, except for the main index.ts
 * file. We take steps here to copy it into the area where all typescript will
 * be transpiled.
 */
async function copyIndexJs() {
  return src('./src/index.ts')
    .pipe(dest('./dist/index'));
}

/**
 * Transpiles all files listed in the root tsconfig.json's 'include' section
 * into .js and .d.ts files. Creates stub .mjs files that re-export the contents
 * of the .js files.
 */
 async function transpile_typescript() {
  await execa('tsc', ['--build', 'tsconfig.json'], {preferLocal: true});

  const jsFiles = await globby(`dist/*.js`, {
    ignore: ['**/build/**'],
  });

  for (const jsFile of jsFiles) {
    const {dir, name} = upath.parse(jsFile);
    const mjsFile = upath.join(dir, `${name}.mjs`);
    const mjsSource = `export * from './${name}.js';`;
    await fse.outputFile(mjsFile, mjsSource);
  }
}

/**
 * Transpiles all files listed in the root tsconfig-index.json's 'include' section
 * into .js and .d.ts files. Creates stub .mjs files that re-export the contents
 * of the .js files.
 */
 async function transpile_index_typescript() {
  await execa('tsc', ['--build', 'tsconfig-index.json'], {preferLocal: true});

  const jsFiles = await globby(`dist/index/*.js`, {
    ignore: ['**/build/**'],
  });

  for (const jsFile of jsFiles) {
    const {dir, name} = upath.parse(jsFile);
    const mjsFile = upath.join(dir, `${name}.mjs`);
    const mjsSource = `export * from './${name}.js';`;
    await fse.outputFile(mjsFile, mjsSource);
  }
}



module.exports = {
  build: series(
    cleanSequence,
    copyIndexJs,
    transpile_typescript,
    transpile_index_typescript,
  ),
  clean: cleanSequence,
};
