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
                "browserInfo" : "showBrowserInfo",
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
            },

            showBrowserInfo : function () {
                $(".active").removeClass("active");
                $("#browserInfoMenu").addClass("active");

                var browserInfo =
                    [
                        {
                            // Returns the user-agent header sent by the browser to the server
                            "position" : 1,
                            "title" : "navigator.userAgent",
                            "content" : navigator.userAgent
                        },
                        {
                            // Returns the code name of the browser
                            "position" : 2,
                            "title" : "navigator.appCodeName",
                            "content" : navigator.appCodeName
                        },
                        {
                            // Returns the name of the browser
                            "position" : 3,
                            "title" : "navigator.appName",
                            "content" : navigator.appName
                        },
                        {
                            // Returns the version information of the browser
                            "position" : 4,
                            "title" : "navigator.appVersion",
                            "content" : navigator.appVersion
                        },
                        {
                            // Determines whether cookies are enabled in the browser
                            "position" : 5,
                            "title" : "navigator.cookieEnabled",
                            "content" : navigator.cookieEnabled
                        },
                        {
                            // Returns for which platform the browser is compiled
                            "position" : 6,
                            "title" : "navigator.platform",
                            "content" : navigator.platform
                        },
                        {
                            // Specifies whether or not the browser has Java enabled
                            "position" : 7,
                            "title" : "navigator.javaEnabled()",
                            "content" : navigator.javaEnabled()
                        },
                        {
                            // Specifies whether or not the browser has Java enabled
                            "position" : 8,
                            "title" : "navigator.onLine",
                            "content" : navigator.onLine
                        },
                        {
                            "position" : 100,
                            "title" : "Modernizr.sessionstorage",
                            "content" : Modernizr.sessionstorage
                        },
                        {
                            "position" : 101,
                            "title" : "Modernizr.localstorage",
                            "content" : Modernizr.localstorage
                        },
                        {
                            "position" : 102,
                            "title" : "Modernizr.indexeddb",
                            "content" : Modernizr.indexeddb
                        }
                    ];

                new BrowserInfoView({ collection : new ItemCollection(browserInfo) }).render();
            }
        });

        // Execute Backbone.js router (MVC structure)
        new NavigationRouter();
        Backbone.history.start();
    });
});
