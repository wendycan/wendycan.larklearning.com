/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.OthersView = app.BaseView.extend({

    template: _.template($('#t-others').html()),

    render: function () {
      $('#todoapp').html(_.template($('#t-others').html()));
      console.log('handleMessage');
      this.handleMessage();
    },

    handleMessage: function () {
      var _this = this;
      app.socket.on('new todo message', function (msg) {
        console.log(msg);
        _this.addNewMessage(msg);
      })
    },

    addNewMessage: function (msg) {
      $("#message-list").append(_.template($('#t-message').html())({msg: msg}))
    }
  });
})(jQuery);
