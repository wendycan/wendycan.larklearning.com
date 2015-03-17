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
      this.map = L.map('map').setView([38, 105], 4);
      // add an OpenStreetMap tile layer
      var myIcon = L.icon({
        iconUrl: $('#map-marker img').attr('src'),
        iconSize: [50, 50]
      });

      L.marker([43.89833761, 125.31364243], {icon: myIcon}).addTo(this.map);
      L.tileLayer('http://{s}.tiles.mapbox.com/v3/dotide.hg6ngn4g/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
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
