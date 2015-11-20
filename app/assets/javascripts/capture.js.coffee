class Capture
  constructor: ->
    @$user_canvas = $('canvas')[0]
    @$video = null
    @interval_id = null
    @init()

  init: ->
    @createVideo()
    @startVideo()
    @drawCanvas()
    @bindEvents()

  bindEvents: ->
    $('.submit-btn').on 'click', =>
      window.open(@$user_canvas.toDataURL(), "canavsImage", "left=0,top=0,width=" + @$user_canvas.width + ",height=" + @$user_canvas.height + ",toolbar=0,resizable=0")

  initContent: ->

  createVideo: ->
    @$video = document.createElement("video")
    videoDiv = document.createElement('div')
    document.body.appendChild(videoDiv)
    videoDiv.appendChild(@$video)
    videoDiv.setAttribute("style", "display:none;")

  drawCanvas: ->
    if !@canvasSupport()
      return
    @drawScreen()
    @$video.play()
    @interval_id = setInterval(@drawScreen, 100)

  drawScreen: =>
    context = @$user_canvas.getContext('2d')
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, @$user_canvas.width, @$user_canvas.height)
    context.strokeStyle = '#d5d5d5'
    context.strokeRect(0, 0, @$user_canvas.width, @$user_canvas.height)
    context.drawImage(@$video, 0, 0, @$user_canvas.width, @$user_canvas.height)

  canvasSupport: ->
    Modernizr.canvas

  startVideo: ->
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia {
      video: true,
      audio: false
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
