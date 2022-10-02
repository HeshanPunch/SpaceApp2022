import k from './kaboom'
import game from './satellite';

const addButton = (txt, p, f) => {

  const btn = add([
    text(txt, {
      size: 25
    }),
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

k.scene("start", () => {
  addButton("Start", vec2(k.width() * 0.5, k.height() * 0.5), () => k.go('inputName'));
})


k.scene("inputName", () => {
  addButton("Username", vec2(k.width() * 0.5, k.height() * 0.5), () => k.go('game'));
})

game();


/*
k.scene('mainGame', () => {

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
*/
k.go('start')


