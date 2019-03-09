const {test} = require("./index");

const tape = require("tape");
const $ = require("jquery");

tape.test("jquery-tools", t => test($, t));