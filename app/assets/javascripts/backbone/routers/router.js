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
			'long_term' : 'setLongTerm'
		},

		initialize: function () {
			this.account = new app.Account();
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.todos.trigger('filter');
		},

		setTodos: function () {
			var todos_view = new app.TodosView(this);
		},

		setHistory: function () {
			var history_view = new app.HistoryView(this);
		},

		setLongTerm: function () {
			var long_term_view = new app.LongTermView(this);
		}
	});

	app.TodoRouter = TodoRouter;
})();
