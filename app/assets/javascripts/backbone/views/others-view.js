/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.OthersView = app.BaseView.extend({
    el: $('#todoapp'),

    events: {
      'submit #chart-form' : 'handleSubmit'
    },

    socket_events: {
       "todo message" : "addTodoMessage",
       "chart message" : "addChartMessage",
       "join message" : "addJoninMessage",
       "leave message" : "addLeaveMessage"
    },

    render: function () {
      document.title = '动态';
      $('#todoapp').html(_.template($('#t-others').html()));
      if (app.username) {
        app.socket.emit('join chat', app.username);
      }
      this.delegateSocketEvents(this.socket_events);

      window.onhashchange = function () {
        app.socket.emit('leave page');
        window.onhashchange = null;
      };
    },

    updateJoiners: function () {
      $('.alert-container').html(_.template($('#t-joiners').html())({users: app.joiners.join(',')}));
    },

    handleSubmit: function (e) {
      e.preventDefault();
      var $this = $(e.currentTarget);

      var text = $this.find('input').val();
      if (text.length > 0) {
        var data = {
          text: $this.find('input').val(),
          username: app.username,
          time: (new Date()).toString()
        };
        app.socket.emit('add chart', JSON.stringify(data));
        $this.find('input').val('');
      }
    },

    addTodoMessage: function (msg) {
      var data = $.parseJSON(msg);
      var date = new Date(data.time);
      data.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      if (data.username == app.username) {
        $("#message-list").prepend(_.template($('#t-my-message').html())(data));
      } else {
        $("#message-list").prepend(_.template($('#t-message').html())(data));
      }
    },

    addChartMessage: function (msg) {
      var data = $.parseJSON(msg);
      var date = new Date(data.time);
      document.title = '新消息';
      setTimeout(function () {
        document.title = '动态';
      }, 5000);
      data.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      if (data.username == app.username) {
        $("#message-list").prepend(_.template($('#t-chart-my-message').html())(data));
      } else {
        $("#message-list").prepend(_.template($('#t-chart-message').html())(data));
      }
    },

    addJoninMessage: function (data) {
      var data_o = $.parseJSON(data);
      var name = data_o.currentUser;
      if(name == app.username) {
        name = '我';
      }
      var index = data_o.users.indexOf(app.username);
      app.joiners = data_o.users;
      if (index >= 0) {
        app.joiners[index] = '我';
      }
      this.updateJoiners();

      $("#message-list").prepend(_.template($('#t-alert-success').html())({msg: name + '   加入'}));
    },

    addLeaveMessage: function (msg) {
      if (msg == app.username) {
        msg = '我';
      }
      if (app.joiners.indexOf(msg) >= 0) {
        var index = app.joiners.indexOf(msg);
        app.joiners.splice(index, 1);
        if (window.location.hash == '#others') {
          this.updateJoiners();
        }
      }
      var msg = msg + '离开';
      $("#message-list").prepend(_.template($('#t-alert-error').html())({msg: msg}));
    }
  });
})(jQuery);
