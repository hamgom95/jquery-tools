const {test} = require("./index");

const tape = require("tape");
const {JSDOM} = require("jsdom");

// setup dom
function setup() {
    const dom = new JSDOM(/*html*/`
    <!doctype html>
    <html>
    <body>
        <div id="root"></div>
    </body>
    </html>`, { pretendToBeVisual: true });

    // Needed before requiring jquery
    global.document = dom.window.document;
    global.window = dom.window;

    return require("jquery");
}

tape.test("jquery-tools", t => test(setup(), t));