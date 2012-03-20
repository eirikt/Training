BackboneViewTest = TestCase("BackboneViewTest");

BackboneViewTest.prototype.setUp = function () {
    /*:DOC +=
     <div id="backbone-content">Hello World</div>
     */
};

BackboneViewTest.prototype.test1 = function () {
    jstestdriver.console.log("Rendering of 'ContentView with Underscore.js templates");
    var MyItem = Backbone.Model.extend({
        "position": 0,
        "title": "",
        "content": ""
    });

    var data = new MyItem();
    data.set({position: 18});
    data.set({content: "My content"});

    var defaultView = new ContentView({ model: data});
    assertObject(defaultView);
    assertInstanceOf(ContentView, defaultView);

    defaultView.render();

    assertEquals("<div id=\"18\" class=\"content\">My content</div>", $('#backbone-content').html());
};

BackboneViewTest.prototype.test2 = function () {
    jstestdriver.console.log("Rendering of 'ContentView' with Underscore.js templates and with Item model");
    new ContentView({ model: new Item({position: 18, content: "My content"})}).render();
    assertEquals("<div id=\"18\" class=\"content\">My content</div>", $('#backbone-content').html());
};

BackboneViewTest.prototype.tearDown = function () {
};
