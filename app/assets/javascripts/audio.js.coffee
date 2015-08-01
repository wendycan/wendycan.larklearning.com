$(document).ready ->
  src_list = []
  $('#audio-assets').find('audio').each (index, item)->
    src_list.push item.src
  fancy_music = new FancyMusic(src_list[0])
  # analyser.getByteTimeDomainData(dataArray)

class FancyMusic
  constructor: (src)->
    @initValue()
    @loadAudio(src)

  initValue: ->
    @audioContext = new (window.AudioContext || window.webkitAudioContext)()
    @audioBufferSourceNode = @audioContext.createBufferSource()
    @analyser = @audioContext.createAnalyser()
    @analyser.fftSize = 1024
    @data = new Uint8Array(@analyser.frequencyBinCount)
    @graph = new Rickshaw.Graph
      element: document.querySelector("#wave")
      series: [{
        color: 'steelblue'
        data: [{x:0,y:0}]
      }]
    # @interval_id = undefined

  loadAudio: (src)->
    request = new XMLHttpRequest()
    request.open('GET', src, true)
    request.responseType = 'arraybuffer'

    request.onload = =>
      audioData = request.response
      @audioContext.decodeAudioData audioData, (buffer)=>  # audioData: binary
        @buildSourceNode(buffer)
        window.buffer = buffer
        @buildAnalyseNode()
        # @interval_id = setInterval @draw, 1000
        requestAnimationFrame(@draw)

    request.send()

  buildSourceNode: (buffer)->
    @audioBufferSourceNode.buffer = buffer
    # @audioBufferSourceNode.loop = true
    @audioBufferSourceNode.start(0)

  buildAnalyseNode: ->
    @audioBufferSourceNode.connect(@analyser)
    # destination: 音频要最终输出的目标,最后一个节点应该再连接到 audioContext.destination 才能听到声音。
    @analyser.connect(@audioContext.destination)
    window.analyser = @analyser

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
    requestAnimationFrame(@draw)
    # console.log(@data)
