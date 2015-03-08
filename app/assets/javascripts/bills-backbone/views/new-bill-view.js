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
      $('#new-bill-btn').click(this.createBill);
      return this;
    },

    createBill: function () {
      var form = $('#new-bill');
      var data = {
        title: form.find('#title').val(),
        people: form.find('#people').val(),
        way: form.find('#way').val(),
        group: form.find('#group').val(),
        bank: form.find('#bank').val(),
        money: form.find('#money').val()
      };
      console.log(data);
    }

  });
})(jQuery);
