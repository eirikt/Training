/////////////////////////////////////////
//////   Underscore.js templates   //////
/////////////////////////////////////////

var menuBackboneViewCollectionTemplate =
    "<% _.each(data, function(item) { %>" +
    "<div id='<%= item.attributes.position %>' class='menu-item'>" +
    "<a href='#info/<%= item.attributes.position %>' class='title'><%= item.attributes.title %></a>" +
    "</div>" +
    "<% }); %>" +
    "<div id='browserInfoMenu' class='menu-item'>" +
    "<a href='#browserInfo' class='title'>Browser info</a>" +
    "</div>";

var contentBackboneViewTemplate =
    "<div id='<%= attributes.position %>' class='content'>" +
    "<%= attributes.content %>" +
    "</div>";

var browserInfoBackboneViewCollectionTemplate =
    "<div id='browserInfoContent' class='content'>" +
    "<% _.each(data, function(item) { %>" +
    "<p><%= item.attributes.title %>: <b><%= item.attributes.content%></b></p>" +
    "<% }); %>" +
    "</div>";
