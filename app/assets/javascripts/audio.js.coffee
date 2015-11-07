$(document).ready ->
  $(document).foundation();
  src_list = []

  $('#audio-assets').find('img').each (index, item)->
    src_list.push item.src
  audio_context = new (window.AudioContext || window.webkitAudioContext)
  fancy_music = new FancyMusic audio_context,
    src_list[0],
    {
      loaded: ->
        $('#wave-graph').addClass('has-bottom-border')
        $('.audio .loading').hide()
    }

  $('#select-music').on 'change', ->
    $('#wave-graph').removeClass('has-bottom-border')
    $('.audio .loading').show()
    effect_name = $('#select-effect').val()
    fancy_music = new FancyMusic audio_context,
      src_list[$(this).val()],
      {
        effectName: effect_name
        loaded: ->
          $('#wave-graph').addClass('has-bottom-border')
          $('.audio .loading').hide()
      }

  $('#select-effect').on 'change', ->
    fancy_music.setEffect $(this).val()

  $(document).on 'open.graphmodal.reveal', '[data-reveal]', ->
    fancy_music.start()

  $(document).on 'closed.graphmodal.reveal', '[data-reveal]', ->
    fancy_music.stop()

  # analyser.getByteTimeDomainData(dataArray)

class FancyMusic
  constructor: (audioContext, src, config)->
    @initValue(audioContext)
    @loadAudio(src, config && config.loaded)

  initValue: (audioContext)->
    $('#wave-graph').empty()
    @audioContext = audioContext
    @audioBufferSourceNode = undefined
    @analyser = @audioContext.createAnalyser()
    @analyser.fftSize = 1024
    @buffer = undefined
    @data = new Uint8Array(@analyser.frequencyBinCount)
    @isReady = false
    @frameId = undefined
    @effect_name = 'wave'
    # @interval_id = undefined

  setEffect: (name)->
    @effect_name = name

  loadAudio: (src, callback)->
    request = new XMLHttpRequest()
    request.open('GET', src, true)
    request.responseType = 'arraybuffer'

    request.onload = =>
      audioData = request.response
      @audioContext.decodeAudioData audioData, (buffer)=>  # audioData: binary
        @buffer = buffer
        @isReady = true
        callback()
        # @interval_id = setInterval @draw, 1000

    request.send()

  start: =>
    $('#wave-graph').empty()
    if @isReady
      this.buildNodes()
      @graph = new Rickshaw.Graph
        element: document.querySelector("#wave-graph")
        series: [{
          color: '#008CBA'
          data: [{x:0,y:0}]
        }]
      switch @effect_name
        when 'wave' then @draw()
        when 'points' then @drawPoints()
        when 'circle' then @drawCircle()
        when 'nature' then @drawNature()
      @audioBufferSourceNode.start(0)
    else
      setTimeout(@start, 100)

  stop: ->
    cancelAnimationFrame(@frameId)
    @audioBufferSourceNode.stop()

  buildNodes: =>
    @audioBufferSourceNode = @audioContext.createBufferSource()
    @audioBufferSourceNode.buffer = @buffer
    @audioBufferSourceNode.loop = true
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

  drawPoints: ->
    console.log('points')

  drawCircle: ->
    console.log('nature')

  drawNature: ->
    console.log('nature')
