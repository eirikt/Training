TestCase("BackboneModelTest", {

    "test.1: Simple Backbone models": function () {
        var defaultItem = new Item();
        assertInstanceOf(Item, defaultItem);
        assertObject(defaultItem);
        assertEquals(defaultItem.position, 0);
        assertEquals(defaultItem.title, "");
        assertEquals(defaultItem.content, "");

        var item = {position: 13, title: "Yo!", content: "Yo Man!"}; // Not a Backbone view
        assertNotInstanceOf(Item, item);
        assertObject(item);
        assertEquals(item.position, 13);
        assertEquals(item.title, "Yo!");
        assertEquals(item.content, "Yo Man!");

        var item2 = new Item();
        assertInstanceOf(Item, item2);
        item2.position = 18;
        item2.content = "My content";
        assertObject(item2);
        assertEquals(item2.position, 18);
        assertEquals(item2.title, "");
    },


    "test.2: Simple Backbone.js models in Underscore.js templates": function () {
        var div = $("<div></div>");

        var tmpl = "<script type='text/template' id='content-backbone-view-template'><div id='<%= attributes.position %>' class='content'><%= attributes.content %></div></script>";

        var data = {
            attributes: {
                position: 13,
                title: "Yo!",
                content: "Yo Man!"
            }
        };

        var resolvedTemplate = _.template(tmpl, data);

        div.html(resolvedTemplate);

        assertEquals(
            "<script id=\"content-backbone-view-template\" type=\"text/template\"><div id='13' class='content'>Yo Man!</div></script>",
            div.html()
        );
    },


    "test.3: Simple Backbone.js models in Underscore.js templates": function () {
        var div = $("<div></div>");

        var tmpl = "<script type='text/template' id='content-backbone-view-template'><div id='<%= position %>' class='content'><%= content %></div></script>";

        var data = new Item();
        data.position = 18;
        data.content = "My content";

        var resolvedTemplate = _.template(tmpl, data);

        div.html(resolvedTemplate);

        assertEquals(
            "<script id=\"content-backbone-view-template\" type=\"text/template\"><div id='18' class='content'>My content</div></script>",
            div.html()
        );
    },


    "test.4: Simple Backbone.js models in Underscore.js templates": function () {
        var div = $("<div></div>");

        var tmpl = "<script type='text/template' id='content-backbone-view-template'><div id='<%= attributes.position %>' class='content'><%= attributes.content %></div></script>";

        var MyItem = Backbone.Model.extend({
            "position": 0,
            "title": "",
            "content": ""
        });
        var data = new MyItem();
        data.attributes.position = 18;
        data.attributes.content = "My content";

        var resolvedTemplate = _.template(tmpl, data);

        div.html(resolvedTemplate);

        assertEquals(
            "<script id=\"content-backbone-view-template\" type=\"text/template\"><div id='18' class='content'>My content</div></script>",
            div.html()
        );
    },


    "test.5: Simple Backbone.js models in Underscore.js templates": function () {
        var div = $("<div></div>");

        var tmpl = "<script type='text/template' id='content-backbone-view-template'><div id='<%= attributes.position %>' class='content'><%= attributes.content %></div></script>";

        var MyItem = Backbone.Model.extend({
            "position": 0,
            "title": "",
            "content": ""
        });
        var data = new MyItem();
        data.set({position: 18});
        data.set({content: "My content"});

        div.html(_.template(tmpl, data));

        assertEquals(
            "<script id=\"content-backbone-view-template\" type=\"text/template\"><div id='18' class='content'>My content</div></script>",
            div.html()
        );
    }
});
