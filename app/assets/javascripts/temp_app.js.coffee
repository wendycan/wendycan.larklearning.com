phoneApp = angular.module 'leavesApp', [
  'ngRoute',
  'leafControllers'
]

phoneApp.config ['$routeProvider',
  ($routeProvider)->
    $routeProvider.when('/leaves', {
      templateUrl: 'phone-list.html',
      controller: 'PhoneListCtrl'
      }).when('/phones/:phoneId', {
        templateUrl: 'phone-detail.html'
        controller: 'PhoneDetailCtrl'
        }).otherwise({
          redirectTo: '/phones'
          })
  ]
