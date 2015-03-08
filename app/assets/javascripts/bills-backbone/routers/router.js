/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var BillsRouter = Backbone.Router.extend({
		routes: {
			'': 'newBill',
			'bills' : 'setBills'
		},

		initialize: function () {
			this.account = new app.Account();
		},

		newBill: function () {
			var new_bill_view = new app.NewBillView(this);
		},

		setBills: function () {
			var bills_view = new app.BillsView(this);
			// $('.todos .top-bar li').removeClass('active');
			// $('.todos .top-bar li.todos').addClass('active');
		}
	});

	app.BillsRouter = BillsRouter;
})();
