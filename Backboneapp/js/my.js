$(document).ready(function () {

    //////    Model    //////
    var Item = Backbone.Model.extend({
        "position": 0,
        "title": "",
        "content": ""
    });
    //var Item = Backbone.Model.extend({}); // Also works as the model is loaded from a JSON file

    var ItemCollection = Backbone.Collection.extend({
        model: Item
        //comparator: function (item) {
        //    return item.get("position");
        //}
    });


    //////    View    //////
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

    var MenuView = Backbone.View.extend({
        el: $('#backbone-menu'),
        tmpl: $('#menu-backbone-view-collection-template'),
        render: renderCollectionView
    });

    var ContentView = Backbone.View.extend({
        el: $('#backbone-content'),
        tmpl: $('#content-backbone-view-template'),
        render: renderView
    });


    //////    Router (Controller)    //////
    var NavigationRouter = Backbone.Router.extend({
        _data: null,
        _items: null,

        routes: {
            "info/:id": "showInfo",
            "*actions": "defaultRoute"
        },

        initialize: function () {
            var that = this;
            $.ajax({
                type: "GET",
                url: "app_data.json",
                dataType: 'json',
                data: {},
                cache: true,
                async: false,
                global: true,
                success: function (data) {
                    that._data = data;
                    that._items = new ItemCollection(data);
                    new MenuView({ model: that._items }).render();
                }
            });
            return this;
        },

        defaultRoute: function (actions) {
            this.showInfo(1);
        },

        showInfo: function (id) {
            $(".active").removeClass("active");
            $("#" + id).addClass("active");
            new ContentView({ model: this._items.at(id - 1) }).render();
        }
    });

    // Execute Backbone.js router (MVC structure)
    new NavigationRouter();
    Backbone.history.start();
});
