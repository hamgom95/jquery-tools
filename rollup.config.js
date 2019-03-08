const pkg = require('./package.json');

const commonjs = require('rollup-plugin-commonjs');
const {terser} = require("rollup-plugin-terser");

const globalName = "JqueryTools";

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

const outputs = (packageName) => [
    {
        banner,
        file: `dist/${packageName}.umd.js`,
        format: 'umd',
        name: globalName,
        exports: 'named',
    },
    {
        banner,
        file: `dist/${packageName}.common.js`,
        format: 'cjs',
        exports: 'named',
    },
    {
        banner,
        file: `dist/${packageName}.esm.js`,
        format: 'esm',
        exports: 'named',
    },
    {
        banner,
        file: `dist/${packageName}.iife.js`,
        name: globalName,
        format: 'iife',
        exports: 'named',
    },
];

module.exports = [
    {
        input: 'src/index.js',
        output: outputs("jquery-tools"),
        plugins: [
            commonjs(),
        ]
    },
    {
        input: 'src/index.js',
        output: outputs("jquery-tools.min"),
        plugins: [
            commonjs(),
            terser(),
        ]
    }
];
