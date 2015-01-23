$(document).ready ->
  stage = ''
  loaderGraphic = ''
  star_count = 100
  stars = []
  width = $(window).outerWidth()
  height = $(window).outerHeight()

  animate = ->
    for i in [0...star_count]
      stars[i].sprite.position.y = stars[i].y
      stars[i].y = stars[i].y - 0.1
      if stars[i].y < 20
        stars[i].y += height
    renderer.render(stage)
    requestAnimFrame( animate )

  onResize = ->
    ratio = width / height
    loaderGraphic.position.x = width/2
    loaderGraphic.position.y = height/2

  drawStars = ->
    starTexture = new PIXI.Texture.fromImage("spacedust.png")
    for i in [0...star_count]
      starSprite = new PIXI.Sprite(starTexture)
      starSprite.position.x = Math.random() * width
      starSprite.position.y = Math.random() * height
      starSprite.anchor.x = 0.5
      starSprite.anchor.y = 0.5
      starSprite.scale.x = starSprite.scale.y = Math.random() * 0.5
      stars.push {sprite: starSprite, x: starSprite.position.x, y: starSprite.position.y}
      stage.addChild starSprite

  onAssetsLoaded = ->
    # frames = []
    loaderGraphic = new PIXI.DisplayObjectContainer()
    loaderGraphic.position.x = 0
    loaderGraphic.position.y = 0
    # spacedust.png
    loaderMoon = PIXI.Sprite.fromFrame("moon.png")
    loaderMoon.scale.x = 0.8
    loaderMoon.scale.y = 0.8
    loaderMoon.position.x = ($(window).outerWidth() - 540*0.8)/2
    loaderMoon.position.y = ($(window).outerHeight() - 540*0.8)/2
    loaderGraphic.addChild(loaderMoon)
    stage.addChild(loaderGraphic)
    drawStars()
    requestAnimFrame(animate)

    # loaderMoon.anchor.x = 0.5
    # loaderMoon.anchor.y = 0.5

    # onResize()
    # frames.push(PIXI.Texture.fromFrame("moon.png"))

    # movie = new PIXI.MovieClip(frames)

    # movie.position.x = 300
    # movie.position.y = 300

    # movie.anchor.x = movie.anchor.y =  0.5
    # movie.play()
    # movie.animationSpeed = 0.5
    # stage.addChild(movie)

    # // start animating

  # viewWidth = 1024
  # viewHeight = 800
  width = $(window).outerWidth()
  height = $(window).outerHeight()
  stage = new PIXI.Stage(0x000000)
  # pondFloorTexture = PIXI.Texture.fromImage($("#manifest ul li.space_bg").text())
  # pondFloorSprite = new PIXI.Sprite(pondFloorTexture)
  # stage.addChild(pondFloorSprite)

  renderer = PIXI.autoDetectRenderer(width, height)
  # renderer.view.className = "rendererView"

  document.body.appendChild(renderer.view)

  loader = new PIXI.AssetLoader(["/WorldAssets.json"])
  loader.onComplete = onAssetsLoaded
  loader.load()

  # requestAnimFrame( animate )

  # texture = PIXI.Texture.fromImage($("#manifest ul li.bunny").text())


  # stage.addChild(bunny)
