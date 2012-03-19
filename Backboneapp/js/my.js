//////    Model    //////
var Item = Backbone.Model.extend({
    "position": 0,
    "title": "",
    "content": "",
    toString: function () {
        return "{" + this.position + ", '" + this.title + "', '" + this.content + "'}";
    }
});
//var Item = Backbone.Model.extend({}); // Also works as the model is loaded from a JSON file

var ItemCollection = Backbone.Collection.extend({
    model: Item
    //comparator: function (item) {
    //    return item.get("position");
    //}
});


//////    View    //////
/*
 var renderCollectionView = function () {
 var compiledTemplate = _.template(this.tmpl.html(), {data: this.model.models});
 this.$el.html(compiledTemplate);
 return this;
 };

 var renderView = function () {
 var compiledTemplate = _.template(this.tmpl.html(), this.model);
 this.$el.html(compiledTemplate);
 return this;
 };
 */

var MenuView = Backbone.View.extend({
    el: $('#backbone-menu'),
    //tmpl: $('#menu-backbone-view-collection-template'),
    //render: renderCollectionView
    render: function () {
        var compiledTemplate = _.template($('#menu-backbone-view-collection-template').html(), {data: this.model.models});
        this.$el.html(compiledTemplate);
        return this;
    }
});

var ContentView = Backbone.View.extend({
    //el: $('#backbone-content'),
    //tmpl: $('#content-backbone-view-template'),
    //render: renderView
    render: function () {
        console.log("template:" + $('#content-backbone-view-template').html());
        console.log("model:" + this.model);
        //console.log("model:" +this.model.position);
        var compiledTemplate = _.template($('#content-backbone-view-template').html(), this.model);
        console.log("compiledTemplate: " + compiledTemplate);
        $('#backbone-content').html(compiledTemplate);
        console.log($('#backbone-content').html());
        return this;
    }
});
