$(document).ready ->
  urlList = []
  audios = []
  $('#audio-assets').find('audio').each (index, item)->
    urlList.push item.src
  for url in urlList
    audio = new Audio(url)
    audios.push audio
  audios[0].play()
