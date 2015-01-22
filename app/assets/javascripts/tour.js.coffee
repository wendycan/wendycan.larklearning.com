$(document).ready ->
  stage = ''

  animate = ->
    requestAnimFrame( animate )
    renderer.render(stage)

  onAssetsLoaded = ->
    # frames = []
    loaderGraphic = new PIXI.DisplayObjectContainer()
    loaderMoon = PIXI.Sprite.fromFrame("moon.png")
    loaderGraphic.addChild(loaderMoon)
    loaderMoon.position.x = 300
    loaderMoon.position.y = 300
    stage.addChild(loaderGraphic)
    # frames.push(PIXI.Texture.fromFrame("moon.png"))

    # movie = new PIXI.MovieClip(frames)

    # movie.position.x = 300
    # movie.position.y = 300

    # movie.anchor.x = movie.anchor.y =  0.5
    # movie.play()
    # movie.animationSpeed = 0.5
    # stage.addChild(movie)

    # // start animating
    requestAnimFrame(animate)

  viewWidth = 1024
  viewHeight = 840

  stage = new PIXI.Stage(0x0d011a)
  pondFloorTexture = PIXI.Texture.fromImage($("#manifest ul li.space_bg").text())
  pondFloorSprite = new PIXI.Sprite(pondFloorTexture)
  stage.addChild(pondFloorSprite)

  renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight)
  renderer.view.className = "rendererView"

  document.body.appendChild(renderer.view)

  loader = new PIXI.AssetLoader(["/WorldAssets.json"])
  loader.onComplete = onAssetsLoaded
  loader.load()

  # requestAnimFrame( animate )

  # texture = PIXI.Texture.fromImage($("#manifest ul li.bunny").text())


  # stage.addChild(bunny)
