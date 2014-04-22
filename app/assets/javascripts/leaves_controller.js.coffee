leafControllers = angular.module('leafControllers', [])

leafControllers.controller 'leafListCtrl', ['$scope', '$http', ($scope, $http)->
  $http.get('/v1/leaves').success (data)->
    $scope.leaves = data

  $scope.orderProp = 'create_at'
]
