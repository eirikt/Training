$(document).ready(function () {

    // Load the content placeholders
    $("#content").load("content.partial.html", function (response, status, xhr) {
        if (status === "error") {
            var msg = "Sorry, but there was an error: ";
            $("#content").css("color", "red").html(msg + xhr.status + " " + xhr.statusText);
            return;
        }

        /////////////////////////////////////////
        //////    Routers (Controllers)    //////
        /////////////////////////////////////////

        var NavigationRouter = Backbone.Router.extend({
            _data : null,
            _items : null,
            _cache : new PolyfilledLocalStorage(),

            routes : {
                "info/:id" : "showInfo",
                "*actions" : "defaultRoute"
            },

            initialize : function () {
                var that = this;
                $.ajax({
                    type : "GET",
                    url : "app-data.json",
                    dataType : 'json',
                    data : {},
                    cache : true,
                    async : false,
                    global : true,
                    success : function (data) {
                        that._data = data;
                        that._items = new ItemCollection(data);
                        new MenuView({ collection : that._items }).render();
                    }
                });
                return this;
            },

            defaultRoute : function () {
                if (!this._cache.getItem('my_menu_id')) {
                    this._cache.setItem('my_menu_id', 1);
                }
                this.showInfo(this._cache.getItem('my_menu_id'));
            },

            showInfo : function (id) {
                $(".active").removeClass("active");
                $("#" + id).addClass("active");
                new ContentView({ model : this._items.at(id - 1) }).render();

                this._cache.setItem('my_menu_id', id);
            }
        });

        // Execute Backbone.js router (MVC structure)
        new NavigationRouter();
        Backbone.history.start();
    });
});
