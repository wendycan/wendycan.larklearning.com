$(document).ready ->
  window.projects = []
  fetchPageProjects = (url)->
    $.ajax
      type: 'GET'
      url: url
      success: (data)->
        for i in data
          projects.push(data[i])

  $.ajax
     type: 'GET'
     url: 'http://api.github.com/users/wendycan/starred'
     success: (data, textStatus, xhr)=>
      count = xhr.getResponseHeader('Link').split('=')[3].charAt(0)
      for i in [1..count]
        url = "http://api.github.com/users/wendycan/starred?page=#{i}"
        fetchPageProjects(url)



