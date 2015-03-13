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
			'others' : 'setOthers'
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
			this.clearAlert();
			if (app.todos_view) {
				app.todos_view.undelegateEvents();
			}
			app.todos_view = new app.TodosView(this);
			$('.todos .top-bar li').removeClass('active');
			$('.todos .top-bar li.todos').addClass('active');
		},

		setHistory: function () {
			this.clearAlert();
			if(app.history_view) {
				app.history_view.undelegateEvents();
			}
			app.history_view = new app.HistoryView(this);
			$('.todos .top-bar li').removeClass('active');
			$('.todos .top-bar li.history').addClass('active');
		},

		setLongTerm: function () {
			this.clearAlert();
			if(app.long_term_view) {
				app.long_term_view.undelegateEvents();
			}
			app.long_term_view = new app.LongTermView(this);
			$('.todos .top-bar li').removeClass('active');
			$('.todos .top-bar li.long-term').addClass('active');
		},

		setOthers: function () {
			this.clearAlert();
			if(app.others_view) {
				app.others_view.undelegateEvents();
				app.others_view.undelegateSocketEvents();
			}
			app.others_view = new app.OthersView(this);
			$('.todos .top-bar li').removeClass('active');
			$('.todos .top-bar li.others').addClass('active');
		},

		clearAlert: function () {
			$('.alert-container').html('');
		}
	});

	app.TodoRouter = TodoRouter;
})();
