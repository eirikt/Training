(function () {

    /* add an html body content from url to the body of current document
     *
     * Possible extensions:
     * + support for HTML fragments - non-full documents
     * + error handling and explanation
     */
    /*
     function loadTestBody(url) {
     var req, body, body_content;
     req = new XMLHttpRequest();
     req.open('GET', url, false);
     // synchronous
     req.send(null);
     // body element with children
     body_content = req.responseText.match(/<body[\s\S]*<\/body>/);
     body = document.documentElement.getElementsByTagName('body')[0];
     // body tag itself is ignored, only its children will be inserted
     body.innerHTML = body_content;
     }
     */

    // All test cases can share this setUp
    function setUp() {
        /*:DOC +=
         <ol id="tabs">
         <li><a href="#news">News</a></li>
         <li><a href="#sports">Sports</a></li>
         <li><a href="#economy">Economy</a></li>
         </ol>*/

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

    TestCase("CreateDomElementTest", {
        setUp: function () {
            setUp.call(this);
            //this.controller = tabController.create(this.tabs);
            this.links = this.tabs.getElementsByTagName("a");
            this.lis = this.tabs.getElementsByTagName("li");
        },

        "test DOM elements": function () {
            assertObject(this.tabs);

            this.template = window.document.getElementById("content-backbone-view-template");
            assertObject(this.template);

            this.contentDiv = window.document.getElementById("backbone-content");
            assertObject(this.contentDiv);
            assertEquals("Hello World", this.contentDiv.textContent);

            assertObject(this.links);
            assertObject(this.lis);
        }
    });

    /*
     TestCase("myTasksTest", {
     setUp: function () {
     loadTestBody("http://localhost/js2/");
     },

     "test mark task as done": function () {
     assertObject(this.body.getElementById('content'));
     }
     });
     */
}());
