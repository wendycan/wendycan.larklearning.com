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

      $('#chart-form').on('submit', function (e) {
        e.preventDefault();

        var text = $(this).find('input').val();
        if (text.length > 0) {
          var data = {
            text: $(this).find('input').val(),
            username: app.username,
            time: (new Date()).toString()
          };
          app.socket.emit('add chart', JSON.stringify(data));
          $(this).find('input').val('');
        }
      })
    },

    handleMessage: function () {
      var _this = this;
      app.socket.on('todo message', function (msg) {
        _this.addTodoMessage(msg);

      });
      app.socket.on('chart message', function (msg) {
        _this.addChartMessage(msg);
      })
    },

    addTodoMessage: function (msg) {
      var data = $.parseJSON(msg);
      $("#message-list").prepend(_.template($('#t-message').html())(data))
    },

    addChartMessage: function (msg) {
      var data = $.parseJSON(msg);
      if (data.username == app.username) {
        $("#message-list").prepend(_.template($('#t-chart-my-message').html())(data));
      } else {
        $("#message-list").prepend(_.template($('#t-chart-message').html())(data));
      }
    }
  });
})(jQuery);
