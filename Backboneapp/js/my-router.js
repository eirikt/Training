$(document).ready(function () {

    /////////////////////////////////////////
    //////    Routers (Controllers)    //////
    /////////////////////////////////////////

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
                    new MenuView({ collection: that._items }).render();
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
