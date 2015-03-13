/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.LongTermView = app.BaseView.extend({

    template: _.template($('#t-long-term').html()),

    el: $('#todoapp'),

    render: function () {
      $('#todoapp').html(_.template($('#t-long-term').html()));
      $('#long-term-save').on('click', this, this.updateLongTerm);
      $('#long-term-edit-btn').on('click', this, this.showEditor);
      $('#long-term-area').css('left', - $('#long-term-area').width()/2);
      $('#long-term-edit-area').hide();
      this.editor = ace.edit('long-term-edit');
      var _this = this;
      var MarkdownMode = require("ace/mode/markdown").Mode;
      this.editor.setTheme("ace/theme/ambiance");
      this.editor.getSession().setMode(new MarkdownMode());
      var text;
      if ( !this.account.get('long_term') || this.account.get('long_term').length < 1) {
        text = "在这里添加您的长期目标。\n\n* 支持 markdown 格式\n* 点击保存，即可保存到云端。";
      } else {
        text = this.account.get('long_term');
      }
      this.editor.getSession().setValue(text);
      this.editor.setFontSize(15);
      var converter = new Showdown.converter();
      var html = converter.makeHtml(this.editor.getSession().getValue());
      $('#long-term-result').html(html);

      this.editor.on('change', function (e) {
        html = converter.makeHtml(_this.editor.getSession().getValue());
        $('#long-term-result').html(html);
      });

      return this;
    },

    showEditor: function () {
      $(this).hide();
      $('#long-term-edit-area').show();
      $('#long-term-area').animate({
        left: 0,
      }, 600);
    },

    updateLongTerm: function (e) {
      var _this = e.data;
      var value = _this.editor.getSession().getValue();
      $.ajax({
        url: '/api/v1/todos/long_term',
        type: 'PUT',
        data: {
          long_term: value,
          auth_token: _this.account.get('auth_token')
        },
        success: function (data) {
          _this.alertMsg('success', '保存成功');
          var msg = {
            title: '长期目标',
            username: app.username,
            time: (new Date()).toString(),
            status: '更新任务',
            type: 'status'
          };
          app.socket.emit('todo changed', JSON.stringify(msg));
          $('#long-term-area').animate({
            left: - $('#long-term-area').width()/2,
          }, 450);
          setTimeout(function () {
            $('#long-term-edit-area').hide();
            $('#long-term-edit-btn').show();
          }, 450);
        },
        error: function (e) {
          _this.alertMsg('error', '保存失败，请重试');
        }
      });
    }
  });
})(jQuery);
