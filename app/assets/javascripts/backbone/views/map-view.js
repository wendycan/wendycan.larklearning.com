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
      this.markerCluster = new L.MarkerClusterGroup();
      L.tileLayer('http://{s}.tiles.mapbox.com/v4/wendycan.lg0aokoa/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid2VuZHljYW4iLCJhIjoiUmoxT09JTSJ9.Jz6Mfm-_ZLj9EkCtJ5Asog#6/33.605/104.656', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },

    parseAddress: function (address, callback) {
      $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=ArxtOqfbIdWt6btGuNaGeGTG&ip=' + address + '&coor=bd09ll',
        type: 'GET',
        dataType: 'jsonp',
        success: function (data) {
          console.log(address);
          console.log(data);
          if (data.status == 0) {
            callback(data);
          }
        }
      });
    },

    addLocation: function (msg) {
      var _this = this;
      var data = $.parseJSON(msg);
      var date = new Date(data.time);
      data.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

      var array = [202, 111, 46, 3];

      for (var i = 100; i >= 0; i--) {
        array[1] = Math.floor(Math.random() * 300);
        var ip = array.join('.');

        this.parseAddress(ip, function (data) {
          var marker = _this.buildMarker([data.content.point.y, data.content.point.x]);
          _this.markerCluster.addLayer(marker);
          _this.map.addLayer(_this.markerCluster);
        });
      };

      // this.parseAddress(data.ip, function (data) {
      //   var marker = _this.buildMarker([data.content.point.y, data.content.point.x]);
      //   _this.markerCluster.addLayer(marker);
      //   _this.map.addLayer(_this.markerCluster);
      // });
    },

    buildMarker: function (latlng) {
      var iconUrl = $('#circle img').attr('src')
      var marker = L.marker(latlng, {icon: L.icon({iconUrl: iconUrl, iconSize: [20, 20]})});
      return marker;
    }
  });
})(jQuery);
