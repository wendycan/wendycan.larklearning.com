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
      editor.setTheme("ace/theme/ambiance");
      var MarkdownMode = require("ace/mode/markdown").Mode;
      editor.getSession().setMode(new MarkdownMode());
      var converter = new Showdown.converter();
      editor.on('change', function (e) {
        var html = converter.makeHtml(editor.getSession().getValue());
        $('#long-term-result').html(html);
      });
      return this;
    },

  });
})(jQuery);
