/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.LongTermView = Backbone.View.extend({

    template: _.template($('#t-long-term').html()),

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

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.model, 'destroy', this.remove);
      // this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    // Re-render the titles of the todo item.
    render: function () {
      return this;
    },
  });
})(jQuery);
