/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Todo Item View
	// --------------

	// The DOM element for a todo item...
	app.TodoView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			'change select': 'updateGroup',
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'destroyTodo',
			'keypress .edit': 'updateOnEnter',
			'keydown .edit': 'revertOnEscape',
			'blur .edit': 'close'
		},

		// The TodoView listens for changes to its model, re-rendering. Since
		// there's a one-to-one correspondence between a **Todo** and a
		// **TodoView** in this app, we set a direct reference on the model for
		// convenience.
		initialize: function (option) {
			this.auth_token = option.auth_token;
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the titles of the todo item.
		render: function () {
			if (this.model.changed.id !== undefined) {
				return;
			}
			if (this.model.get('completed') !== true) {
				this.model.set('completed', false);
			}
			this.$el.html(this.template(this.model.toJSON()));
			var _this = this;
			var start_date = new Date(this.model.get('start_at'));
			var end_date = new Date(this.model.get('end_at'));
			var start_input = $(this.$el.find('.time-pickers input')[0]).datetimepicker({
				datepicker: false,
				format:'H:i',
				value: start_date.getHours() + ':' +start_date.getMinutes(),
				onChangeDateTime: function(dp,$input){
					start_date.setHours($input.val().split(':')[0]);
					start_date.setMinutes($input.val().split(':')[1]);
					_this.model.set({start_at: start_date.toISOString()});
					_this.model.save({auth_token: this.auth_token});
				}
			});
			var end_input = $(this.$el.find('.time-pickers input')[1]).datetimepicker({
				datepicker: false,
				format:'H:i',
				value: end_date.getHours() + ':' +end_date.getMinutes(),
				onChangeDateTime: function(dp,$input){
					end_date.setHours($input.val().split(':')[0]);
					end_date.setMinutes($input.val().split(':')[1]);
					_this.model.set({end_at: end_date.toISOString()});
					_this.model.save({auth_token: this.auth_token});
				}
			});
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {
			return this.model.get('completed') ?
				app.TodoFilter === 'active' :
				app.TodoFilter === 'completed';
		},

		// Toggle the `"completed"` state of the model.
		toggleCompleted: function () {
			this.model.toggle(this.auth_token);
		},
		updateGroup: function (e) {
			var $this = $(e.currentTarget);
			this.model.set('group', $this.val());
			this.model.save({auth_token: this.auth_token});
		},
		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function () {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			// We don't want to handle blur events from an item that is no
			// longer being edited. Relying on the CSS class here has the
			// benefit of us not having to maintain state in the DOM and the
			// JavaScript logic.
			if (!this.$el.hasClass('editing')) {
				return;
			}

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });

				if (value !== trimmedValue) {
					// Model values changes consisting of whitespaces only are
					// not causing change to be triggered Therefore we've to
					// compare untrimmed version with a trimmed one to check
					// whether anything changed
					// And if yes, we've to trigger change event ourselves
					this.model.trigger('change');
				}
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
				this.close();
			}
		},

		// If you're pressing `escape` we revert your change by simply leaving
		// the `editing` state.
		revertOnEscape: function (e) {
			if (e.which === ESC_KEY) {
				this.$el.removeClass('editing');
				// Also reset the hidden input back to the original value.
				this.$input.val(this.model.get('title'));
			}
		},
		destroyTodo: function () {
			if(confirm('确定删除这条 todo ?')){
				this.clear();
			}
		},
		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy({headers: {'Auth-Token' : this.auth_token}});
		}
	});
})(jQuery);
