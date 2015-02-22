var ENTER_KEY = 13;
var ESC_KEY = 27;

var app = app || {};

(function ($) {
  'use strict';

  app.BaseView = Backbone.View.extend({
    initialize: function (router, opts) {
      var _this = this;
      if (opts === null) {
        opts = {};
      }
      this.router = router;
      this.account = router.account;
      if (this.account.get('unsync')) {
        this.account.fetch_account({
          success: function (data) {
            _this.render();
          },
          error: function () {
            window.location.href = '/users/sign_in';
          }
        });
      } else {
        _this.render();
      }
    },

    alertMsg: function (type, msg) {
      $('.alert-container').html(_.template($("#t-alert-#{type}").html())({msg: msg}));
    },

    clearMsg: function () {
      $('.alert-container').empty();
    },

    navBack: function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.history.back();
    }
  });
})(jQuery);


