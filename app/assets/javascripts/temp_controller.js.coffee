tempApp = angular.module('tempApp',[])

tempApp.controller 'TempCtrl', ($scope, $http)->
  url = "#{Temp.ApiPrefix}/#{Temp.DotideDb}/datastreams/temp/datapoints?order=asc"
  config =
    method: "GET"
    url: url
    headers:
      "Authorization": "Bearer #{Temp.ReadToken}"

  $scope.points = []
  graph = {}
  $http(config).success (data)->
    $scope.data = data
    for point in $scope.data.datapoints
      do(point) ->
        tmp = {}
        tmp.x = Date.parse(point.t)
        tmp.y = point.v
        $scope.points.push tmp
    graph = new Rickshaw.Graph {
      element: document.querySelector('#temp-graph'),
      renderer: 'line',
      interpolation: 'linear',
      series: [{
        color: "#ff0059",
        name: '温度',
        data: $scope.points
      }]
      # series: new Rickshaw.Series.FixedDuration([{
      #   name: 'temp', color: 'gold'
      #   }], undefined, {
      #     timeInterval: 3,
      #     maxDataPoints: 100,
      #     timeBase: new Date().getTime() / 1000
      #   })
    }
    x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } )
    y_axis = new Rickshaw.Graph.Axis.Y( {
      graph: graph,
      orientation: 'left',
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      element: document.getElementById('y_axis'),
    } )

    hoverDetail = new Rickshaw.Graph.HoverDetail( {
      graph: graph
    } )
    graph.render()

  setInterval ->
    $http(config).success (data)->
      $scope.data = data
      $scope.points = []
      for point in $scope.data.datapoints
        do(point) ->
          tmp = {}
          tmp.x = Date.parse(point.t)
          tmp.y = point.v
          $scope.points.push tmp
      graph.series[0].data = $scope.points
      graph.render()
  , 3000
