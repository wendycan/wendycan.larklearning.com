LeafControllers = angular.module('LeafControllers', [])

LeafControllers.controller 'LeafListCtrl', ['$scope', '$http', ($scope, $http)->
  $http.get('/v1/leaves').success (data)->
    $scope.leaves = data

  $scope.orderProp = 'create_at'
]

LeafControllers.controller 'LeafDetailCtrl', ($scope, $routeParams)->
  $scope.leafId = $routeParams.leafId
