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
    @selected = []
    @success_message = '机智若你，无人堪比！'
    @finished = false
    $('.puzzling').hide()

  init: ->
    @createVideo()
    @startVideo()
    @drawCanvas()
    @bindEvents()

  bindEvents: ->
    $('.submit-btn').on 'click', @handleSubmitClick
    $('.restart-btn').on 'click', @handleRestartClick

    xPad = 1
    yPad = 1
    startXOffset = 1
    startYOffset = 1
    @$user_canvas.addEventListener 'mouseup', (event)=>
      mouseX
      mouseY
      x
      y
      if event.pageX || event.pageY
        x = event.pageX;
        y = event.pageY;
      else
        x = e.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft
        y = e.clientY + document.body.scrollTop +
          document.documentElement.scrollTop

      x -= $(@$user_canvas).offset().left
      y -= $(@$user_canvas).offset().top
      mouseX = x
      mouseY = y
      @selected = []
      for i in [0... @cols]
        for j in [0...@rows]
          board_x = i * @b_width
          board_y = j * @b_height

          boards = @r_boards.filter (b)->
            if b.pos_row is i and b.pos_col is j
              true
          board = boards[0]

          if (mouseY >= board_y) && (mouseY <= board_y + @b_height) && (mouseX >= board_x) && (mouseX <= board_x + @b_width)
            if board.selected
              board.selected = false
            else
              board.selected = true
          if board.selected
            @selected.push
              row: j,
              col: i
      if @selected.length is 2
        selected1 = @selected[0]
        selected2 = @selected[1]
        board1 = board2 = null
        for board, index in @r_boards
          if board.pos_col is selected1.col and board.pos_row is selected1.row
            board1 = {index: index, board: board}
          if board.pos_col is selected2.col and board.pos_row is selected2.row
            board2 = {index: index, board: board}
          board.selected = false

        temp_data = board1.board.imageData
        right_col = board1.board.right_col
        right_row = board1.board.right_row
        @r_boards[board1.index].imageData = board2.board.imageData
        @r_boards[board1.index].right_row = board2.board.right_row
        @r_boards[board1.index].right_col = board2.board.right_col
        @r_boards[board2.index].imageData = temp_data
        @r_boards[board2.index].right_col = right_col
        @r_boards[board2.index].right_row = right_row
        @finished = true
        for board in @r_boards
          if board.right_row isnt board.pos_row or board.right_col isnt board.pos_col
            @finished = false

      @updateCanvasFromBoards()
      @renderSelectedStatus()
      if @finished
        @renderResult()

  handleRestartClick: =>
    $('.puzzling').hide()
    $('.capturing').show()
    @drawCanvas()

  renderSelectedStatus: ->
    if @selected.length > 1
      return
    for item in @selected
      @context.strokeStyle = 'red'
      @context.strokeRect(item.col * @b_width, item.row * @b_height, @b_width, @b_height)

  renderResult: ->
    @context.font = "35px serif"
    metrics = @context.measureText @success_message
    textWidth = metrics.width
    xPosition = @$user_canvas.width/2 - textWidth/2
    yPosition = @$user_canvas.height/2
    @context.fillStyle = "rgba(0,0,0,.6)"
    @context.fillRect 0, 0, @$user_canvas.width, @$user_canvas.height
    @context.fillStyle = "#cd9947"
    @context.fillText @success_message, xPosition, yPosition

  handleSubmitClick: =>
    $('.capturing').hide()
    $('.puzzling').show()

    clearInterval(@interval_id)
    @buildBoardsData()
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
            if board.pos_row is temp_i and board.pos_col is temp_j
              found = true
              @boards.splice(index, 1)
              break
          break if found

        @r_boards.push
          pos_row: temp_i
          pos_col: temp_j
          right_row: i
          right_col: j
          selected: false
          imageData: @context.getImageData(j * @b_width, i * @b_height, @b_width, @b_height)
    @updateCanvasFromBoards()

  updateCanvasFromBoards: ->
    for board in @r_boards
      @context.strokeStyle = '#d5d5d5'
      @context.putImageData(board.imageData, board.pos_col * @b_width, board.pos_row * @b_height)
      @context.strokeRect(board.pos_col * @b_width, board.pos_row * @b_height, @b_width, @b_height)

  buildBoardsData: ->
    @boards = []
    for i in [0...@rows]
      for j in [0...@cols]
        @boards.push
          pos_row: i
          pos_col: j
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
    @finished = false
    @selected = []
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
