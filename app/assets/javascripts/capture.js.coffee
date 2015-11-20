class Capture
  constructor: ->
    @$user_canvas = $('canvas')[0]
    @$video = null
    @interval_id = null
    @init()
    @boards = []
    @cols = 2
    @rows = 2
    @b_width = Math.floor(@$user_canvas.width/@cols)
    @b_height = Math.floor(@$user_canvas.height/@rows)
    @context = @$user_canvas.getContext('2d')

  init: ->
    @createVideo()
    @startVideo()
    @drawCanvas()
    @bindEvents()

  bindEvents: ->
    $('.submit-btn').on 'click', @handleClick

  handleClick: =>
    clearInterval(@interval_id)
    @buildBoards()
    @randomBoards()
    # window.open(@$user_canvas.toDataURL(), "canavsImage", "left=0,top=0,width=" + @$user_canvas.width + ",height=" + @$user_canvas.height + ",toolbar=0,resizable=0")

  randomBoards: ->
    @r_boards = []

    for i in [0...@rows]
      for j in [0...@cols]
        found = false
        temp_i = 0
        temp_j = 0
        loop
          temp_i = Math.floor(Math.random()*@rows)
          temp_j = Math.floor(Math.random()*@cols)
          for board, index in @boards
            if board.finalRow is temp_i and board.finalCol is temp_j
              found = true
              @boards.splice(index, 1)
              break
          break if found

        @r_boards.push
          finalRow: temp_i
          finalCol: temp_j
          selected: false

    for board in @r_boards
      board.imageData = @context.getImageData(board.finalCol*@b_width, board.finalRow*@b_height, @b_width, @b_height)

    for board in @r_boards
      @context.putImageData(board.imageData, 0, 0)


  buildBoards: ->
    @boards = []
    for i in [0...@rows]
      for j in [0...@cols]
        @boards.push
          finalRow: i
          finalCol: j
          selected: false


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
