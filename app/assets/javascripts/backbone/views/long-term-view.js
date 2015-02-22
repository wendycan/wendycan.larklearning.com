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
      // 'keydown .edit': 'revertOnEscape',
      // 'blur .edit': 'close'
    },

    // Re-render the titles of the todo item.
    render: function () {
      $('#todoapp').html(_.template($('#t-long-term').html()));
      return this;
    },
  });
})(jQuery);
