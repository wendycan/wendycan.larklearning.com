/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			group: 'work',
			completed: false,
			created_at: '',
			start_at: '',
			end_at: ''
		},
		urlRoot: '/api/v1/todos',

		// Toggle the `completed` state of this todo item.
		toggle: function (auth_token) {
			this.save({
				auth_token: auth_token,
				completed: !this.get('completed')
			});
		}
	});
})();
