tempApp = angular.module('tempApp',[])

tempApp.controller 'TempCtrl', ($scope, $http)->
  url = "#{Temp.ApiPrefix}/#{Temp.DotideDb}/datastreams"
  config =
    method: "GET"
    url: url
    headers:
      "Authorization": "Bearer #{Temp.ReadToken}"

  $http(config).success (data)->
    console.log data
    $scope.data = data
