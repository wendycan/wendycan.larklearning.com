/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `completed` attributes.
  app.Account = Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
      email: '',
      auth_token: '',
      unsync: true
    },

    fetch_account: function (opts) {
      var success = opts.success;
      var _this = this;
      $.ajax({
        url: '/bills/index',
        dataType: 'json',
        success: function (data, status, xhr) {
          data.unsync = false;
          _this.set(data);
          if (success) {
            success(data, status, xhr);
          }
        }
      });
    }
  });
})();
