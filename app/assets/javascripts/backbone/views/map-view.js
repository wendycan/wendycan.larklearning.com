/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.MapView = app.BaseView.extend({
    el: $('#todoapp'),

    socket_events: {
       "locate message" : "addLocateMessage"
    },

    render: function () {
      document.title = '地图';
      $('#todoapp').html(_.template($('#t-map').html()));
      this.delegateSocketEvents(this.socket_events);
      this.initMap();
    },
    initMap: function () {

    },

    addLocateMessage: function (msg) {
      var data = $.parseJSON(msg);
      var date = new Date(data.time);
      data.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      if (data.username == app.username) {
        $("#message-list").prepend(_.template($('#t-my-message').html())(data));
      } else {
        $("#message-list").prepend(_.template($('#t-message').html())(data));
      }
    }
  });
})(jQuery);
