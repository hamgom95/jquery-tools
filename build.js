const pkg = require("./package.json");

const process = require('process');
const {rollup} = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const {terser} = require("rollup-plugin-terser");

const packageName = "jquery-tools";
const globalName = "JqueryTools";
const buildDir = "dist";

const now = new Date();
const banner = `/*!
 * @hamgom95/jquery-tools v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) ${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

async function buildTest() {
    const bundle = await rollup({
        input: 'test/index.js',
        plugins: [
            commonjs(),
        ],
    });

    bundle.write({
        file: `${buildDir}/test.esm.js`,
        format: 'esm',
    });
}

async function build() {

    for (const min of [true, false]) {
        const config = {
            input: 'index.js',
            plugins: [
                commonjs(),
            ]
        };
        if (min) config.plugins.push(terser());

        const bundle = await rollup(config);
        
        for (const format of ["amd", "cjs", "esm", "iife", "umd"]) {
            // Generate bundle + sourcemap
            bundle.write({
                file: `${buildDir}/${packageName}.${format}${min && ".min" || ""}.js`,
                format,
                name: globalName,
                sourcemap: true,
                name: globalName,
                exports: 'named',
            });
        }
    }
}

if (process.argv[2] === "test") {
    buildTest();
} else {
    build();
}