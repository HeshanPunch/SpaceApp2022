import kaboom from "kaboom";

const k = kaboom({})

loadSprite('wall', "https://kaboomjs.com/sprites/grass.png")

const addButton = (txt, p, f) => {

  const btn = add([
    text(txt),
    pos(p),
    area({ cursor: "pointer", }),
    scale(1),
    origin("center"),
  ])

  btn.onClick(f)

  btn.onUpdate(() => {
    if (btn.isHovering()) {
      const t = time() * 10
      btn.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4),
      )
      btn.scale = vec2(1.2)
    } else {
      btn.scale = vec2(1)
      btn.color = rgb()
    }
  })
}

scene("start", () => {
  addButton("Start", vec2(k.width() * 0.5, k.height() * 0.5), () => k.go('inputName'));
})

scene("inputName", () => {
  addButton("Username", vec2(k.width() * 0.5, k.height() * 0.5), () => k.go('mainGame'));
})

scene('mainGame', () => {

  const WALL = [
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
    '===============================',
  ]

  const level = addLevel(WALL, {
    width: 64,
    height: 64,
    "=": () => [
      sprite("wall"),
      area(),
      solid(),
    ],
  })
})

k.go('start')

