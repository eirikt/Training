(function () {

    var div;

    function setUp() {
        div = jQuery("<div></div>");
    }


    TestCase("UnderscoreTemplateTest", {

        setUp: setUp,


        "test.1: Simple 'inlined/resolved' Underscore.js template": function () {
            assertEquals("Hello World", _.template("Hello <%= name %>", {name: 'World'}));
        },


        "test.2: Simple 'compiled' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>");
            assertEquals("Hello World", compiledTemplate({name: 'World'}));
            assertEquals("Hello Mars", compiledTemplate({name: 'Mars'}));
            assertEquals("Hello Mars", compiledTemplate({name: 'Mars'}));
        },


        "test.3: 'Resolved' Underscore.js templates are not functions, but strings": function () {
            var resolvedTemplate = _.template("Hello <%= name %>", {name: 'World'});
            assertEquals("Hello World", resolvedTemplate);
            assertException(function () {
                resolvedTemplate();
            }, "TypeError");
        },


        "test.4: 'Resolved' Underscore.js templates cannot be reused as a 'compiled' template": function () {
            var resolvedTemplate = _.template("Hello <%= name %>", {name: 'World'});
            assertException(function () {
                resolvedTemplate({name: 'John Smith'})
            }, "TypeError");
        },


        "test.5: Setting a 'resolved' Underscore.js template into an HTML element": function () {
            var div = jQuery("<div></div>");

            var tmpl = "Hello <%= name %>";
            var data = {name: 'World'};
            var resolvedTemplate = _.template(tmpl, data);

            div.html(resolvedTemplate);
            assertEquals("Hello World", div.html());
        },


        "test.extra.1: JavaScript type coercion (from Crockford book)": function () {
            assertTrue('' == 0);
            assertTrue(0 == '');
            assertTrue('0' == 0);
            assertTrue(0 == '0');

            assertFalse(false == 'false');
            assertTrue(false == '0');

            assertFalse(false == undefined);
            assertFalse(false == null);
            assertTrue(null == undefined);

            assertTrue('\t\r\n ' == 0);
        },


        "test.extra.2: JavaScript type coercion in if check": function () {

            /* Does not compile
             if () {
             fail();
             }
             */

            if (null) {
                fail();
            }

            if (undefined) {
                fail();
            }

            if ('') {
                fail();
            }

            assertException(function () {
                if ('  ') {
                    throw {name: 'True'};
                }
            }, 'True');

            assertException(function () {
                if ('\t\r\n ') {
                    throw {name: 'True'};
                }
            }, 'True');
        },


        "test.6: No 'data' parameter gives a 'compiled' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>");

            div.html(compiledTemplate({name: 'Moe'}));
            assertEquals("Hello Moe", div.html());

            div.html(compiledTemplate({name: 'John Smith'}));
            assertEquals("Hello John Smith", div.html());
        },


        "test.7: null as 'data' parameter gives a 'compiled' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>", null);

            div.html(compiledTemplate({name: 'Moe'}));
            assertEquals("Hello Moe", div.html());

            div.html(compiledTemplate({name: 'John Smith'}));
            assertEquals("Hello John Smith", div.html());
        },


        "test.8: undefined as 'data' parameter gives a 'compiled' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>", undefined);

            div.html(compiledTemplate({name: 'Moe'}));
            assertEquals("Hello Moe", div.html());

            div.html(compiledTemplate({name: 'John Smith'}));
            assertEquals("Hello John Smith", div.html());
        },


        "test.9: Empty string as 'data' parameter gives a 'compiled' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>", "");

            div.html(compiledTemplate({name: 'Moe'}));
            assertEquals("Hello Moe", div.html());

            div.html(compiledTemplate({name: 'John Smith'}));
            assertEquals("Hello John Smith", div.html());
        },


        "test.10: Blank string as 'data' parameter gives a 'resolved' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>", "   ");

            // Chrome 17 gives "Hello runner" ...haha
            //assertEquals("Hello ", compiledTemplate);
            if (!(compiledTemplate === "Hello " || compiledTemplate === "Hello runner")) {
                fail();
            }

            assertException(function () {
                compiledTemplate({name: 'John Smith'})
            }, "TypeError");
        },


        "test.11: Whitespace-only strings as 'data' parameter gives a 'resolved' Underscore.js template": function () {
            var compiledTemplate = _.template("Hello <%= name %>", "  /t/r/n ");

            // Chrome 17 gives "Hello runner" ...haha
            //assertEquals("Hello ", compiledTemplate);
            if (!(compiledTemplate === "Hello " || compiledTemplate === "Hello runner")) {
                fail();
            }

            assertException(function () {
                compiledTemplate({name: 'John Smith'})
            }, "TypeError");
        }
    });
}());
