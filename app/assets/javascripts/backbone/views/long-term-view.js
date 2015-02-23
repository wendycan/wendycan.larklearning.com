/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.LongTermView = app.BaseView.extend({

    // The DOM events specific to an item.
    events: {
      'change select': 'updateGroup',
      // 'click .toggle': 'toggleCompleted',
      // 'dblclick label': 'edit',
      // 'click .destroy': 'clear',
      // 'keypress .edit': 'updateOnEnter',
      // 'keypress #long-term-edit': 'updateHtml',
      // 'blur .edit': 'close'
    },

    // Re-render the titles of the todo item.
    render: function () {
      $('#todoapp').html(_.template($('#t-long-term').html()));
      var editor = ace.edit('long-term-edit');
      var _this = this;
      var MarkdownMode = require("ace/mode/markdown").Mode;
      editor.setTheme("ace/theme/ambiance");
      editor.getSession().setMode(new MarkdownMode());
      editor.getSession().setValue(this.account.get('long_term'));

      var converter = new Showdown.converter();
      var html = converter.makeHtml(editor.getSession().getValue());
      $('#long-term-result').html(html);

      editor.on('change', function (e) {
        html = converter.makeHtml(editor.getSession().getValue());
        $('#long-term-result').html(html);
        _this.updateLongTerm(editor.getSession().getValue());
      });

      return this;
    },
    updateLongTerm: function (value) {
      $.ajax({
        url: '/api/v1/todos/long_term',
        type: 'PUT',
        data: {
          long_term: value,
          auth_token: this.account.get('auth_token')
        },
        success: function (data) {
          console.log(data);
        }
      });
    }
  });
})(jQuery);
