/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var Records = Backbone.PageableCollection.extend({
    // Reference to this collection's model.
    model: app.Todo,

    url: '/api/v1/todos',

    sync: function (method, model, options) {
      var params = {
        headers: {
          'Auth-Token': app.auth_token
        }
      };
      Backbone.sync(method, model, _.extend(params, options));
    },

    state: {
      pageSize: 5
    },

    queryParams: {
      paging: true
    },

    parseState: function (resp, queryParams, state, options) {
      return {totalRecords: resp.total_count};
    },
    parseRecords: function (resp, options) {
      return resp.todos;
    },
  });

  // Create our global collection of **Todos**.
  app.records = new Records();
})();
