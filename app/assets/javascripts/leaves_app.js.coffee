phoneApp = angular.module 'leafApp', [
  'ngRoute',
  'leafControllers'
]

phoneApp.config ['$routeProvider',
  ($routeProvider)->
    $routeProvider.when('/leaves', {
      templateUrl: 'leaves-list.html',
      controller: 'LeafListCtrl'
      }).when('/:leafId', {
        templateUrl: 'leaf-detail.html'
        controller: 'LeafDetailCtrl'
        }).otherwise({
          redirectTo: '/leaves'
          })
  ]
