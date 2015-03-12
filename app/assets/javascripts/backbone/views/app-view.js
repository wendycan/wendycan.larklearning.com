/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.TodosView = app.BaseView.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#todoapp',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'change #new-todo-group': 'updateTodoGroup',
			'keypress #new-todo': 'createOnEnter',
			'click #toggle-all': 'toggleAllComplete'
		},

		render: function () {
			$('#todoapp').html(_.template($('#t-todos').html()));
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-todo');
			this.$option = this.$('#header select');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');
			this.$list = $('#todo-list');

			this.listenTo(app.todos, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.listenTo(app.todos, 'change:completed', this.filterOne);
			this.listenTo(app.todos, 'filter', this.filterAll);
			this.listenTo(app.todos, 'all', this.renderTodos);

			app.todos.fetch({
				reset: true,
				success: function () {
					$('.loading').remove();
				}
			});
		},
		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		renderTodos: function () {
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if (app.todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		updateTodoGroup: function (e) {
			var $this = $(e.currentTarget);
			$this.siblings('.group').text($this.val());
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (todo) {
			var view = new app.TodoView({ model: todo});
			this.$list.prepend(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			this.$list.html('');
			app.todos.each(this.addOne, this);
		},

		filterOne: function (todo) {
			todo.trigger('visible');
		},

		filterAll: function () {
			app.todos.each(this.filterOne, this);
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function () {
			return {
				title: this.$input.val().trim(),
				order: app.todos.nextOrder(),
				group: $('#header select').val(),
				start_at: new Date(),
				end_at: new Date(),
				completed: false
			};
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {
			if (e.which === ENTER_KEY && this.$input.val().trim()) {
				console.log(this.newAttributes());
				var msg = {
					title: this.newAttributes().title,
					username: app.username,
					time: (new Date()).toString(),
					status: '添加任务',
					type: 'status'
				};
				app.todos.create(this.newAttributes(), {
					success: function () {
						app.socket.emit('todo changed', JSON.stringify(msg));
					}
				});
				this.$input.val('');
			}
		},

		toggleAllComplete: function () {
			var completed = this.allCheckbox.checked;

			app.todos.each(function (todo) {
				var msg = {
					title: 'all',
					username: app.username,
					time: (new Date()).toString(),
					status: '完成任务',
					type: 'status'
				};
				todo.save({
					completed: completed
				}, {
					success: function () {
						app.socket.emit('todo changed', JSON.stringify(msg))
					}
				});
			});
		}
	});
})(jQuery);
