const tap = require("tap");

const {JSDOM} = require("jsdom");
const {register} = require("./index");

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

    global.$ = require("jquery");

    // register jquery plugin
    register(global.$);
}


tap.test("jquery-tools", t => {
    setup();

    t.test("$.fn.toggleText()", t2 => {
        $("#root").toggleText("a", "b");
        t2.equal($("#root").text(), "a", "should be first val as default");
        $("#root").toggleText("a", "b");
        t2.equal($("#root").text(), "b", "should now be toggled to second value");
        $("#root").toggleText("a", "b");
        t2.equal($("#root").text(), "a", "should now be back to first value");
        t2.end();
    });

    t.test("$.fn.onN()", t2 => {
        t2.plan(3, "should call click handler 3 times");
        let count = 0;
        $("#root").onN("click", (event) => {
            t2.equal(++count, event.counter, "should count correctly");
        });

        for (let i=0; i<3; i++) $("#root").trigger("click");
    });

    t.test("$.fn.onPromise()", t2 => {
        t2.plan(1);
        $("#root").onPromise("mouseover").then(() => t2.pass());
        $("#root").trigger("mouseover");
    });

    t.test("$.fn.onAlternate()", t2 => {
        t2.plan(1);
        const res = [];
        $("#root").onAlternate("mouseout", () => {
            res.push(1);
            if (res.length===3) t2.deepEqual(res, [1,2,1]);
        }, () => res.push(2));
        for (let i=0; i<3; i++) $("#root").trigger("mouseout");
    });

    t.end();
});