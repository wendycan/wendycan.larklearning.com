/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.HistoryView = app.BaseView.extend({

    // The DOM events specific to an item.
    events: {
      'change select': 'updateGroup'
    },

    // Re-render the titles of the todo item.
    render: function () {
      $('#todoapp').html(_.template($('#t-history').html()));
      return this;
    },
  });
})(jQuery);
