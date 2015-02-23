/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.LongTermView = app.BaseView.extend({

    render: function () {
      $('#todoapp').html(_.template($('#t-long-term').html()));
      $('#long-term-save').on('click', this, this.updateLongTerm);
      this.editor = ace.edit('long-term-edit');
      var _this = this;
      var MarkdownMode = require("ace/mode/markdown").Mode;
      this.editor.setTheme("ace/theme/ambiance");
      this.editor.getSession().setMode(new MarkdownMode());
      var text;
      if ( !this.account.get('long_term') || this.account.get('long_term').length > 1) {
        text = this.account.get('long_term');
      } else {
        text = "在这里添加您的长期目标。\n\n* 支持 markdown 格式\n* 点击保存，即可保存到云端。";
      }
      this.editor.getSession().setValue(text);

      var converter = new Showdown.converter();
      var html = converter.makeHtml(this.editor.getSession().getValue());
      $('#long-term-result').html(html);

      this.editor.on('change', function (e) {
        html = converter.makeHtml(_this.editor.getSession().getValue());
        $('#long-term-result').html(html);
      });

      return this;
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
        }
      });
    }
  });
})(jQuery);
