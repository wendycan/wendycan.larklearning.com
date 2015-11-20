class Capture
  constructor: ->
    @$user_canvas = $('canvas.user')[0]
    @$video = $('video')[0]
    @interval_id = null
    @init()

  init: ->
    $('.submit-btn').on 'click', =>
      window.open(@$user_canvas.toDataURL(), "canavsImage", "left=0,top=0,width=" + @$user_canvas.width + ",height=" + @$user_canvas.height + ",toolbar=0,resizable=0")
    @startVideo()
    @drawCanvas()

  initContent: ->

  drawCanvas: ->
    if !@canvasSupport()
      return
    @drawScreen()
    @$video.play()
    @interval_id = setInterval(@drawScreen, 100)

  drawScreen: =>
    context = @$user_canvas.getContext('2d')
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, @$user_canvas.width, @$user_canvas.height)
    context.strokeStyle = '#000000'
    context.strokeRect(5, 5, @$user_canvas.width - 10, @$user_canvas.height - 10)
    context.drawImage(@$video, 10, 10)

  canvasSupport: ->
    Modernizr.canvas

  startVideo: ->
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia {
      video: true,
      audio: true
    }, @mediaSuccess, @mediaFail

  mediaSuccess: (userMedia)=>
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL
    @$video.src = window.URL.createObjectURL(userMedia)

  mediaFail: ->
    alert 'Sorry'

  userMediaSupported: ->
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);

$(document).ready ->
  if $('.capture').length > 0
    new Capture()
