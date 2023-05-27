/* eslint-disable no-console */
import * as esbuild from 'esbuild';
import fs from 'fs';
import minimist from 'minimist';

const tampermonkeyHeader = (packageVersion) =>
  `
// ==UserScript==
// @name         pornpen.ai better tags
// @namespace    pornpen.ai
// @version      ${packageVersion}
// @description  better make screen :)
// @author       b0rknut
// @match        https://pornpen.ai/*
// @match        https://pornpen.art/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pornpen.ai
// @grant        unsafeWindow
// ==/UserScript==

`.trimStart();

const prependHeader = () => {
  const packageVersion = JSON.parse(fs.readFileSync('./package.json')).version;
  const data = fs.readFileSync('./build/out.js');
  const fd = fs.openSync('./build/out.js', 'w+');
  const insert = Buffer.from(tampermonkeyHeader(packageVersion));
  fs.writeSync(fd, insert, 0, insert.length, 0);
  fs.writeSync(fd, data, 0, data.length, insert.length);
  fs.close(fd, (err) => {
    if (err) throw err;
  });
};

const plugins = [
  {
    name: 'prepend-header',
    setup(build) {
      build.onEnd((result) => {
        prependHeader();
        console.log(`[${new Date().toLocaleTimeString()}]`, result);
      });
    },
  },
];

const context = await esbuild.context({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './build/out.js',
  plugins,
});

const watch = minimist(process.argv.slice(2)).watch;
if (watch) {
  await context.watch();
} else {
  await context.build();
}
