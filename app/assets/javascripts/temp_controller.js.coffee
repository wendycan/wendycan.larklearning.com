tempApp = angular.module('tempApp',[])

tempApp.controller 'TempCtrl', ['$scope', '$http', ($scope, $http)->
  # functin and variable define
  url = "http://localhost:3000/data.json"
  config =
    method: "GET"
    url: url
    headers:
      "Authorization": "Bearer #{Temp.ReadToken}"
  $scope.points = []
  $scope.graph = {}
  interalId = {}
  $('#data-stop').css 'display', 'none'
  $(document).foundation ->
    tooltips:
      disable_for_touch: true

  $scope.filterDate = (clickevent)->
    start = $('#datetimestart').val()
    end = $('#datetimeend').val()
    $('#loader').show()
    clearInterval(interalId)
    console.log 'hi'
    $('#data-sync').css 'display', 'none'
    $('#data-stop').css 'display', 'inline-block'
    fetchTempData(new Date(start), new Date(end), ->
      $scope.graph.series[0].data = $scope.points
      $scope.graph.render()
      $('#loader').hide()
    )
  $scope.startSync = (clickevent)->
    $('#data-sync').css 'display', 'inline-block'
    $('#data-stop').css 'display', 'none'
    setRefresh()

  $scope.exportData = (clickevent)->
    data = []
    $scope.starttime = $('#datetimestart').val()
    $scope.endtime = $('#datetimeend').val()
    for point in $scope.points
      do(point)->
        tmp = {}
        tmp.t = moment(point.x * 1000).utc()
        tmp.v = point.y
        data.push tmp
    blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"})
    saveAs(blob,"data.json")

  setRefresh = ->
    interalId = setInterval ->
      result = initTimePicker()
      console.log result.end
      fetchTempData(new Date(result.start), new Date(result.end), =>
        $scope.graph.series[0].data = $scope.points
        $scope.graph.render()
      )
    , 3000

  initGraph = ->
    if $scope.points.length > 0
      data = $scope.points
    else
      data = [{x:0, y:0}]
    console.log $scope.points
    console.log data
    $scope.graph = new Rickshaw.Graph {
      element: document.querySelector('#temp-graph'),
      renderer: 'line',
      interpolation: 'linear',
      series: [{
        color: "#ff0059",
        name: '心电',
        data: data
        }]
    }
    time = new Rickshaw.Fixtures.Time()
    seconds = time.unit('seconds')
    axes = new Rickshaw.Graph.Axis.Time( {
      timeUnit: seconds,
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
    result = initTimePicker()

    fetchTempData(new Date(result.start), new Date(result.end), =>
      initGraph()
      # setRefresh()
    )

  initTimePicker = ->
    now = new Date()
    console.log now
    end = "#{now.getFullYear()}/#{now.getMonth() + 1}/#{now.getDate()} #{now.getHours()}:#{now.getMinutes()}:#{now.getSeconds()}"
    start = "#{now.getFullYear()}/#{now.getMonth() + 1}/#{now.getDate()} #{now.getHours()}:#{now.getMinutes()}:#{now.getSeconds() - 5}"
    $('#datetimestart').datetimepicker({
      lang: 'ch',
      value: start
      })
    $('#datetimeend').datetimepicker({
      lang: 'ch',
      value: end
      })
    $scope.starttime = $('#datetimestart').val()
    $scope.endtime = $('#datetimeend').val()
    {start: start,end: end}

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
]
