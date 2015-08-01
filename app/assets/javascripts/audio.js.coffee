$(document).ready ->
  urlList = []
  audios = []
  context = new (window.AudioContext || window.webkitAudioContext)()
  $('#audio-assets').find('audio').each (index, item)->
    urlList.push item.src
  audio = new Audio()
  sound = ''
  audio.addEventListener 'canplay', ->
    sound = context.createMediaElementSource(audio)
    sound.connect(context.destination)  # destination: 音频要最终输出的目标,所有节点中的最后一个节点应该再连接到audioContext.destination才能听到声音。
  audio.src = urlList[0]

  # audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  # analyser = context.createAnalyser()
  # analyser.fftSize = 1024
  # bufferLength = analyser.frequencyBinCount
  # dataArray = new Uint8Array(bufferLength)
  # analyser.getByteTimeDomainData(dataArray)
  # window.ana = analyser
  window.context = context

  # draw = ->
  #   drawVisual = requestAnimationFrame(draw)
  #   analyser.getByteTimeDomainData(dataArray)

  # draw()
