var ENTER_KEY = 13;
var ESC_KEY = 27;

var app = app || {};
app.api_sync = function (method, model, options) {
  var params = {
    headers: {
      'Auth-Token': app.auth_token
    }
  };
  Backbone.sync(method, model, _.extend(params, options));
};

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
            console.log(data);
            app.auth_token = data.auth_token;
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
      $('.alert-container').html(_.template($("#t-alert-" + type).html())({msg: msg}));
      $('.close-alert').on('click', this.clearAlert);
    },

    clearAlert: function (e) {
      $(this).parent('.alert-box').remove();
    },

    clearMsg: function () {
      $('.alert-container').empty();
    },

    navBack: function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.history.back();
    },

    handleDate: function (date) {
      var d = new Date(date);
      var d_s = d.getHours() + ':' +d.getMinutes() + ' ' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ';
      return d_s;
    }
  });
})(jQuery);


