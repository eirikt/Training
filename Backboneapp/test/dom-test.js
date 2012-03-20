(function () {

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
}());
