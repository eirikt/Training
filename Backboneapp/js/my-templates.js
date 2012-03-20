//////    Underscore.js templates    //////
var menuBackboneViewCollectionTemplate =
    "<% _.each(data, function(item) { %>" +
        "<div id='<%= item.attributes.position %>' class='menu-item'>" +
        "<a href='#info/<%= item.attributes.position %>' class='title'><%= item.attributes.title %></a>" +
        "</div>" +
        "<% }); %>";

var contentBackboneViewTemplate =
    "<div id='<%= attributes.position %>' class='content'>" +
        "<%= attributes.content %>" +
        "</div>";
