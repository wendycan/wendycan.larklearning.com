$(document).ready ->
  $(document).foundation();
  src_list = []
  effects = ['wave', 'points', 'circle', 'nature']

  $('#audio-assets').find('audio').each (index, item)->
    src_list.push item.src

  fancy_music = new FancyMusic(src_list[0])

  $('#select-music').on 'change', ->
    effect_name = effects[$('#select-effect').val()]
    fancy_music = new FancyMusic src_list[$(this).val()], {
      effectName: effect_name
    }

  $('#select-effect').on 'change', ->
    fancy_music.setEffect effects[$(this).val()]

  $(document).on 'open.graphmodal.reveal', '[data-reveal]', ->
    fancy_music.start()

  $(document).on 'closed.graphmodal.reveal', '[data-reveal]', ->
    fancy_music.stop()

  # analyser.getByteTimeDomainData(dataArray)

class FancyMusic
  constructor: (src, config)->
    @initValue()
    @loadAudio(src)

  initValue: ->
    $('#wave-graph').empty()
    @audioContext = new (window.AudioContext || window.webkitAudioContext)()
    @audioBufferSourceNode = undefined
    @analyser = @audioContext.createAnalyser()
    @analyser.fftSize = 1024
    @buffer = undefined
    @data = new Uint8Array(@analyser.frequencyBinCount)
    @isReady = false
    @frameId = undefined
    @effect_name = 'wave'
    @graph = new Rickshaw.Graph
      element: document.querySelector("#wave-graph")
      series: [{
        color: '#008CBA'
        data: [{x:0,y:0}]
      }]
    # @interval_id = undefined

  setEffect: (name)->
    @effect_name = name

  loadAudio: (src)->
    request = new XMLHttpRequest()
    request.open('GET', src, true)
    request.responseType = 'arraybuffer'

    request.onload = =>
      audioData = request.response
      @audioContext.decodeAudioData audioData, (buffer)=>  # audioData: binary
        @buffer = buffer
        @isReady = true
        # @interval_id = setInterval @draw, 1000

    request.send()

  start: =>
    if @isReady
      this.buildNodes()
      if @effect_name == 'wave'
        @draw()
      else
        @draw()
      @audioBufferSourceNode.start(0)
    else
      setTimeout(@start, 100)

  stop: ->
    cancelAnimationFrame(@frameId)
    @audioBufferSourceNode.stop()

  buildNodes: =>
    @audioBufferSourceNode = @audioContext.createBufferSource()
    @audioBufferSourceNode.buffer = @buffer
    # @audioBufferSourceNode.loop = true
    @buildAnalyseNode()

  buildAnalyseNode: ->
    @audioBufferSourceNode.connect(@analyser)
    # destination: 音频要最终输出的目标,最后一个节点应该再连接到 audioContext.destination 才能听到声音。
    @analyser.connect(@audioContext.destination)

  draw: =>
    @analyser.getByteFrequencyData(@data)
    data = []
    for v,i in @data
      tmp = {}
      tmp.x = i
      tmp.y = v
      data.push tmp
    @graph.series[0].data = data
    @graph.render()
    @frameId = requestAnimationFrame(@draw)
    # console.log(@data)
