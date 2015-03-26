/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.OthersView = app.BaseView.extend({
    el: $('#todoapp'),

    events: {
      'submit #chart-form' : 'handleSubmit',
      'click #audio-setting' : 'handleSettingBtn'
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
      this.audio_login = new Audio($('#audio-login img').attr('src'));
      this.audio_new_message = new Audio($('#audio-new-message img').attr('src'));
      this.favicon = new Favico({
        animation: 'popFade'
      });
      this.message_count = 0;
      window.onhashchange = function () {
        app.socket.emit('leave page');
        window.onhashchange = null;
      };
      var _this = this;
      $(document).on('show', function() {
        _this.favicon.reset();
      });
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
      data.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      if (data.username == app.username) {
        $("#message-list").prepend(_.template($('#t-chart-my-message').html())(data));
      } else {
        if(document.visibilityState == 'visible'){
          this.favicon.reset();
        } else {
          this.favicon.badge(++this.message_count);
        }
        if ($('#audio-setting').hasClass('fa-volume-up')) {
          this.audio_new_message.play();
        }
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
      if (app.username != name && $('#audio-setting').hasClass('fa-volume-up')) {
        this.audio_login.play();
      }
      this.updateJoiners();

      $("#message-list").prepend(_.template($('#t-alert-success').html())({msg: name + '   加入'}));
    },

    addLeaveMessage: function (msg) {
      if (!msg) {return;};
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
    },

    handleSettingBtn: function (e) {
      if ($('#audio-setting').hasClass('fa-volume-off')) {
        $('#audio-setting').removeClass('fa-volume-off').addClass('fa-volume-up');
      } else {
        $('#audio-setting').removeClass('fa-volume-up').addClass('fa-volume-off');
      }
    }
  });
})(jQuery);
