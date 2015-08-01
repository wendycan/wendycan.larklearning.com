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
    @analyser.fftSize = 128
    @data = new Uint8Array(@analyser.frequencyBinCount)

  loadAudio: (src)->
    request = new XMLHttpRequest()
    request.open('GET', src, true)
    request.responseType = 'arraybuffer'

    request.onload = =>
      audioData = request.response
      @audioContext.decodeAudioData audioData, (buffer)=>  # audioData: binary
        @buildSourceNode(buffer)
        @buildAnalyseNode()
        setInterval @draw, 1000
        # requestAnimationFrame(@draw)

    request.send()

  buildSourceNode: (buffer)->
    @audioBufferSourceNode.buffer = buffer
    @audioBufferSourceNode.loop = true
    @audioBufferSourceNode.start(0)

  buildAnalyseNode: ->
    @audioBufferSourceNode.connect(@analyser)
    # destination: 音频要最终输出的目标,最后一个节点应该再连接到 audioContext.destination 才能听到声音。
    @analyser.connect(@audioContext.destination)
    window.analyser = @analyser

  draw: =>
    @analyser.getByteFrequencyData(@data)
    console.log(@data)
