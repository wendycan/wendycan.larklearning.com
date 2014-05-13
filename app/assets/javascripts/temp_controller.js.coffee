tempApp = angular.module('tempApp',[])

tempApp.controller 'TempCtrl', ['$scope', '$http', ($scope, $http)->
  # functin and variable define
  url = "#{Temp.ApiPrefix}/#{Temp.DotideDb}/datastreams/temp/datapoints"
  config =
    method: "GET"
    url: url
    headers:
      "Authorization": "Bearer #{Temp.ReadToken}"
  $scope.points = []
  $scope.graph = {}

  $(document).foundation ->
    tooltips:
      disable_for_touch: true

  $scope.filterDate = (clickevent)->
    start = $('#datetimestart').val()
    end = $('#datetimeend').val()
    fetchTempData(new Date(start), new Date(end), ->
      $scope.graph.series[0].data = $scope.points
      $scope.graph.render()
    )

  $scope.exportData = (clickevent)->
    data = []
    for point in $scope.points
      do(point)->
        tmp = {}
        tmp.t = moment(point.x * 1000).utc()
        tmp.v = point.y
        data.push tmp
    blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"})
    saveAs(blob,"data.json")

  initGraph = ->
    $scope.graph = new Rickshaw.Graph {
      element: document.querySelector('#temp-graph'),
      renderer: 'line',
      interpolation: 'linear',
      series: [{
        color: "#ff0059",
        name: '温度',
        data: $scope.points
        }]
    }
    axes = new Rickshaw.Graph.Axis.Time( {
      # timeUnit: days,
      graph: $scope.graph
     } )
    y_axis = new Rickshaw.Graph.Axis.Y( {
      graph: $scope.graph,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      ticksTreatment: 'glow'
    } )
    hoverDetail = new Rickshaw.Graph.HoverDetail( {
      graph: $scope.graph
    } )
    legend = new Rickshaw.Graph.Legend( {
      element: document.querySelector('#legend'),
      graph: $scope.graph
    } )
    $scope.graph.render()

  initTemp = =>
    now = new Date()
    end = "#{now.getFullYear()}/#{now.getMonth() + 1}/#{now.getDate()} #{now.getHours()}:#{now.getMinutes()}"
    start = "#{now.getFullYear()}/#{now.getMonth() + 1}/#{now.getDate() - 1} #{now.getHours()}:#{now.getMinutes()}"
    $('#datetimestart').datetimepicker({
      lang: 'ch',
      value: start
      })
    $('#datetimeend').datetimepicker({
      lang: 'ch',
      value: end
      })
    fetchTempData(new Date(start), new Date(end), =>
      initGraph()
    )

  fetchTempData = (start, end, onSuccess = false)->
    endIso = end.toISOString()
    startIso = start.toISOString()
    config.params =
      start: startIso
      end: endIso
      order: 'asc'
    $http(config).success (data)->
      $scope.data = data
      $scope.points = []
      for point in $scope.data.datapoints
        do(point) ->
          tmp = {}
          date = new Date(point.t)
          tmp.x = Date.parse(date)/1000
          tmp.y = point.v
          $scope.points.push tmp
      if !!onSuccess
        onSuccess()

  renderGraph = ()->
    $scope.graph.series[0].data = $scope.points
    $scope.graph.render()

  # function call
  initTemp()

  setInterval ->
    $http(config).success (data)->
      $scope.data = data
      $scope.points = []
      for point in $scope.data.datapoints
        do(point) ->
          tmp = {}
          date = new Date(point.t)
          tmp.x = Date.parse(date)/1000
          tmp.y = point.v
          $scope.points.push tmp
      $scope.graph.series[0].data = $scope.points
      $scope.graph.render()
  , 3000
]
