import kaboom from "kaboom";

// initialize context
const k = kaboom({})

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
  add([
    text("main Game"),
    pos(12),
  ])

  
})

k.go('start')

