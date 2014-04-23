LeafApp = angular.module 'LeafApp', [
  'ngRoute',
  'LeafControllers'
]

LeafApp.config ['$routeProvider',
  ($routeProvider)->
    $routeProvider.when('/all', {
      templateUrl: '/templates/leaves_list.html',
      controller: 'LeafListCtrl'
      }).when('/:leafId', {
        templateUrl: '/templates/leaf_detail.html'
        controller: 'LeafDetailCtrl'
        }).otherwise({
          redirectTo: '/all'
          })
  ]
