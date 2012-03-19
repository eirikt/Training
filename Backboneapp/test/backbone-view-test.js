function setUp() {
    /*:DOC +=
     <script type="text/template" id="content-backbone-view-template">
     <div id="<%= attributes.position %>" class="content">
     <%= attributes.content %>
     </div>
     </script>*/

    /*:DOC +=
     <div id="content">
     <div id="backbone-menu"></div>
     <div id="backbone-content">Hello World</div>
     </div>*/

    this.tabs = window.document.getElementById("tabs");
}


TestCase("BackboneViewTest", {
    setUp: function () {
        setUp.call(this);
    },


    "test.1: Rendering of ContentView": function () {
        var Itemm = Backbone.Model.extend({
            "position": 0,
            "title": "",
            "content": ""
        });

        var data = new Itemm();
        data.set({position: 18});
        data.set({content: "My content"});

        var defaultView = new ContentView({ model: data});
        assertObject(defaultView);
        assertInstanceOf(ContentView, defaultView);

        defaultView.render();

        assertEquals("\n     <div id=\"18\" class=\"content\">\n     My content\n     </div>\n     ", $('#backbone-content').html());
    },


    "test.2: Rendering of ContentView with Item model": function () {
        new ContentView({ model: new Item({position: 18, content: "My content"})}).render();
        assertEquals("\n     <div id=\"18\" class=\"content\">\n     My content\n     </div>\n     ", $('#backbone-content').html());
    }
});
