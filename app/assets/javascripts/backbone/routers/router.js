/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'': 'setTodos',
			'order/*filter': 'setFilter',
			'todos' : 'setTodos',
			'history' : 'setHistory',
			'long_term' : 'setLongTerm',
		},

		initialize: function () {

		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.todos.trigger('filter');
		},

		setTodos: function () {
			var todos_view = new app.AppView();
			todos_view.render();
		},

		setHistory: function () {
			var history_view = new app.HistoryView();
			history_view.render();
		},

		setLongTerm: function () {
			var long_term_view = new app.LongTermView();
			long_term_view.render();
		}
	});

	app.TodoRouter = TodoRouter;
})();
