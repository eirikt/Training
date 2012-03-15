$(document).ready(function () {

    var Item = Backbone.Model.extend({});

    var ItemCollection = Backbone.Collection.extend({
        model: Item,
        comparator: function (item) {
            return item.get("position");
        }
    });


    var MenuView = Backbone.View.extend({
        render: function () {
            $('#backbone-menu').html(_.template($('#item-template').html(), this.model));
        }
    });

    var ContentView = Backbone.View.extend({
        render: function () {
            $('#backbone-content').html(_.template($('#content-template').html(), this.model));
        }
    });


    var NavigationRouter = Backbone.Router.extend({
        _data: null,
        _items: null,
        _view: null,

        routes: {
            "info/:id": "showInfo",
            "*actions": "defaultRoute"
        },

        initialize: function (options) {
            var _this = this;
            $.ajax({
                type: "GET",
                url: "app_data.json",
                dataType: 'json',
                data: {},
                cache: true,
                async: false,
                global: true,
                success: function (data) {
                    _this._data = data;
                    _this._items = new ItemCollection(data);
                    _this._view = new MenuView({ model: _this._items });
                    _this._view.render();
                    //Backbone.history.loadUrl();
                }
            });
            return this;
        },

        defaultRoute: function (actions) {
            this.showInfo(1);
        },

        showInfo: function (id) {
            var view = new ContentView({ model: this._items.at(id - 1) });
            $(".active").removeClass("active");
            $("#item" + id).addClass("active");
            view.render();
        }
    });

    /*var navigationRouter =*/ new NavigationRouter;

    Backbone.history.start();
});
