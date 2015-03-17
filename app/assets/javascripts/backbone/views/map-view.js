/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.MapView = app.BaseView.extend({
    el: $('#todoapp'),

    socket_events: {
      "chart message" : "addLocation"
    },

    render: function () {
      document.title = '地图';
      $('#todoapp').html(_.template($('#t-map').html()));
      this.delegateSocketEvents(this.socket_events);
      this.initMap();
    },

    initMap: function () {
      this.map = L.map('map').setView([38, 105], 4);

      L.tileLayer('http://{s}.tiles.mapbox.com/v3/dotide.hg6ngn4g/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },

    addLocation: function (msg) {
      var _this = this;
      var data = $.parseJSON(msg);
      var date = new Date(data.time);
      data.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=ArxtOqfbIdWt6btGuNaGeGTG&ip=202.198.16.3&coor=bd09ll',
        type: 'GET',
        dataType: 'jsonp',
        success: function (data) {
          var marker = _this.buildMarker([data.content.point.y, data.content.point.x]);
          marker.addTo(_this.map);
        }
      })
    },

    buildMarker: function (latlng) {
      var iconUrl = $('#circle img').attr('src')
      var marker = L.marker(latlng, {icon: L.icon({iconUrl: iconUrl, iconSize: [35, 35]})});
      return marker;
    }
  });
})(jQuery);
