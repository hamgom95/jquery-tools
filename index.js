/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */

/**
 * Register plugins in jquery namespace.
 * @param {*} $ Jquery object
 * @returns Jquery object with assigned plugin
 */
function register($) {

    /**
     * Toggle between two text contents.
     * 
     * @function external:"jQuery.fn".toggleHtml
     */
    $.fn.toggleHtml = function (a, b) {
        this.html((idx, current) => ({ [a]: b, [b]: a }[current] || a));
        return this;
    };

    /**
     * Toggle between two css values.
     * 
     * @function external:"jQuery.fn".toggleCss
     */
    $.fn.toggleCss = function (prop, a, b) {
        this.css(prop, (idx, current) => ({ [a]: b, [b]: a }[current] || a));
        return this;
    };

    /**
     * Toggle between two text contents.
     * 
     * @function external:"jQuery.fn".toggleText
     */
    $.fn.toggleText = function (a, b) {
        this.text((idx, current) => ({ [a]: b, [b]: a }[current] || a));
        return this;
    };

    /**
     * jquery toggle whole attribute
     * 
     * @function external:"jQuery.fn".toggleAttr
     */
    $.fn.toggleAttr = function (attr, val) {
        const current = $(this).attr(attr);
        if (current) {
            $(this).removeAttr(attr);
        } else {
            $(this).attr(attr, val);
        }
        return this;
    };

    /**
     * jquery toggle just the attribute value
     * 
     * @function external:"jQuery.fn".toggleAttrVal
     */
    $.fn.toggleAttrVal = function (attr, a, b) {
        $(this).attr(attr, (idx, current) => ({ [a]: b, [b]: a }[current] || a));
        return this;
    };

    /**
     * Like `jQuery.fn.on` but add counter to event object in handler.
     * 
     * @function external:"jQuery.fn".onN
     */
    $.fn.onN = function (...args) {
        // handler is last argument
        const handler = args.pop();
        let counter = 0;
        this.on(...args, function (event, ...args) {
            event.counter = ++counter;
            return handler.call(this, event, ...args);
        });
        return this;
    };

    /**
     * Register alternating handlers for event.
     * @function external:"jQuery.fn".onAlternate
     */
    $.fn.onAlternate = function (eventName, ...alternatingCallbacks) {
        let i = 0;
        this.on(eventName, function (...args) {
            const currentCallback = alternatingCallbacks[i % alternatingCallbacks.length];
            i++;
            return currentCallback.call(this, ...args);
        });
        return this;
    }

    /**
     * Get promise waiting for event once
     * @function external:"jQuery.fn".onPromise
     */
    $.fn.onPromise = function (eventName, selector, data) {
        return new Promise((resolve, reject) => {
            this.one(eventName, selector, data, function (event) {
                resolve(event);
            });
        });
    };

    /**
     * Allow triggering multiple events with one method
     * @function external:"jQuery.fn".triggers
     */
    $.fn.triggers = function (...events) {
        for (const event of events) {
            this.trigger(event);
        }
        return this;
    };

    // convert string to array of char codes
    const strToCodes = str => str.split("").map(c => c.charCodeAt(0));

    /**
     * Trigger string chars as keydown events
     * @function external:"jQuery.fn".triggerString
     */
    $.fn.triggerString = function (str) {
        const events = strToCodes(str).map(c => $.Event("keydown", { keyCode: c }));
        this.triggers(...events);
        return this;
    };

    /**
     * Reduce all selected elements
     * @function external:"jQuery.fn".reduce
     */
    $.fn.reduce = function (init, accumulator) {
        this.each(function (index) {
            init = accumulator(init, this, index);
        });
        return init;
    }

    // get document for elem
    $.getDocument = function (elem) {
        if (elem instanceof Document) {
            return elem;
        } else if (elem instanceof Element) {
            return elem.ownerDocument;
        } else {
            return document;
        }
    }
    // get unique documents for set
    $.fn.getDocument = function (index) {
        if (index === undefined) {
            // get all matched elements
            let elements = this.get();

            // get unique window references for elements
            const documents = new Set(elements.map($.getDocument));

            return [...documents];
        } else {
            return $.getDocument(this.get(index));
        }
    }

    return $;
}

module.exports = { register };