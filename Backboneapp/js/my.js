/////////////////////////
//////    Model    //////
/////////////////////////

//var Item = Backbone.Model.extend({}); // Also works as the model is loaded from a JSON file
var Item = Backbone.Model.extend({
    "position": 0,
    "title": "",
    "content": "",
    toString: function () {
        return "{" + this.position + ", '" + this.title + "', '" + this.content + "'}";
    }
});

var ItemCollection = Backbone.Collection.extend({
    model: Item
    //comparator: function (item) {
    //    return item.get("position");
    //}
});


////////////////////////
//////    View    //////
////////////////////////

var MenuView = Backbone.View.extend({
    //el: $('#backbone-menu'),
    //tmpl: menuBackboneViewCollectionTemplate,
    render: function () {
        var compiledTemplate = _.template(menuBackboneViewCollectionTemplate, {data: this.collection.models});
        //this.$el.html(compiledTemplate);
        $('#backbone-menu').html(compiledTemplate);
        return this;
    }
});

var ContentView = Backbone.View.extend({
    //el: $('#backbone-content'),
    //tmpl: contentBackboneViewTemplate,
    render: function () {
        //var compiledTemplate = _.template(contentBackboneViewTemplate, {data: this.model});
        var compiledTemplate = _.template(contentBackboneViewTemplate, this.model);
        $('#backbone-content').html(compiledTemplate);
        return this;
    }
});
