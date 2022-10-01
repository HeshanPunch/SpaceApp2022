import kaboom from "kaboom";
// loadRoot('https://i.imgur.com/');
kaboom();
/*
async function init() {
  kaboom();
  let bgimg = await loadSprite('space-bg', 'https://i.imgur.com/QNraJmz.gif');
  
  let background = add ([
    sprite("space-bg"),
    pos(width() / 2, height() / 2 ),
    origin("center"),
    scale(1),
    fixed()

  ]);

  background.sacleTo(Math.max(
    width() / bgImage.tex.width,
    height() / bgImage.tex.height
  ));
}

init();


 initial setup from yugy
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

