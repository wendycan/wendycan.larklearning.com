tempApp = angular.module('tempApp',[])

tempApp.controller 'TempCtrl', ($scope, $http)->
  url = "#{Temp.ApiPrefix}/#{Temp.DotideDb}/datastreams/temp/datapoints"
  config =
    method: "GET"
    url: url
    headers:
      "Authorization": "Bearer #{Temp.ReadToken}"

  $http(config).success (data)->
    console.log data
    $scope.data = data
    $scope.points = []
    tmp = {}
    for point in $scope.data.datapoints
      do(point) ->
        tmp.x = point.t
        tmp.y = point.v
        $scope.points.push tmp

    graph = new Rickshaw.Graph {
      element: document.querySelector('#temp-graph'),
      renderer: 'line',
      series: $scope.points
    }
    x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } )
    y_axis = new Rickshaw.Graph.Axis.Y( {
      graph: graph,
      orientation: 'left',
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: document.getElementById('y_axis')
    } )
