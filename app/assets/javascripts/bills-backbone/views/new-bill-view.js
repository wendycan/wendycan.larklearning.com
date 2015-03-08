/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.NewBillView = app.BaseView.extend({

    template: _.template($('#t-new-bill').html()),


    // Re-render the titles of the todo item.
    render: function () {
      $('#billsapp').html(_.template($('#t-new-bill').html()));
      return this;
    }

  });
})(jQuery);
