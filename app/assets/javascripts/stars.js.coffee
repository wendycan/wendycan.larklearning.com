$(document).ready ->
  projects = []
  fetchPageProjects = (url, callback)->
    $.ajax
      type: 'GET'
      url: url
      success: (data)->
        for d in data
          projects.push d
        callback(true)

  $.ajax
    type: 'GET'
    url: 'http://api.github.com/users/wendycan/starred'
    success: (data, textStatus, xhr)=>
      count = xhr.getResponseHeader('Link').split('=')[3].charAt(0)
      urls = []
      for i in [1..count]
        urls.push "http://api.github.com/users/wendycan/starred?page=#{i}"
      async.filter urls, fetchPageProjects, (results)->
        console.log projects



