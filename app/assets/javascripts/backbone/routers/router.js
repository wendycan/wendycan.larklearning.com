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
			$('.todos .top-bar li a').removeClass('current');
			$('.todos .top-bar li a.todos').addClass('current');
		},

		setHistory: function () {
			var history_view = new app.HistoryView(this);
			$('.todos .top-bar li a').removeClass('current');
			$('.todos .top-bar li a.history').addClass('current');
		},

		setLongTerm: function () {
			var long_term_view = new app.LongTermView(this);
			$('.todos .top-bar li a').removeClass('current');
			$('.todos .top-bar li a.long-term').addClass('current');
		}
	});

	app.TodoRouter = TodoRouter;
})();
