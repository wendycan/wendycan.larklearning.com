/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  app.HistoryView = app.BaseView.extend({

    render: function () {
      this.listenTo(app.records, 'reset', this.renderRecords);
      $('#todoapp').html(_.template($('#t-history').html()));
      var _this = this;
      app.records.fetch({
        reset: true,
        data: {
          paging: true
        },
        success: function (records) {
          _this.renderRecords();
          _this.renerPaginator();
        }
      });
      return this;
    },

    renerPaginator: function () {
      var paginator = new Paginator({
        collection: app.records
      });
      $("#paginator").append(paginator.render().$el);
    },

    renderRecords: function () {
      $('#records').html('');
      app.records.each(this.renderRecord, this);
    },

    renderRecord: function (record) {
      $('#records').append(_.template($('#t-record').html())(record.toJSON()));
    }
  });
})(jQuery);
