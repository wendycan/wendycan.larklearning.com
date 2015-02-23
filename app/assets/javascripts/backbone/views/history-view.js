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
          $('.loading').remove();
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
      var data = record.toJSON();
      data.distance = (new Date(data.end_at)) - (new Date(data.start_at));
      data.distance = data.distance > 0 ? data.distance : 0;
      data.distance = (data.distance/3600000).toFixed(2) + '小时';
      data.created_at = this.handleDate(data.created_at);
      data.start_at = this.handleDate(data.start_at);
      data.end_at = this.handleDate(data.end_at);
      $('#records').append(_.template($('#t-record').html())(data));
    }
  });
})(jQuery);
