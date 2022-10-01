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
const k = kaboom({
  
})

k.scene('main', () => [
  k.add([
    k.text('Space Game Title', 32),
    k.pos(k.width() * 0.5, k.height() * 0.5),
    k.color(1,1,1,1),
    k.origin('center')
  ])
])

k.go('main')
*/

// Load custom bitmap font, specifying the width and height of each character in the image
// loadFont("unscii", "/fonts/unscii_8x8.png", 8, 8)

// List of built-in fonts ("o" at the end means the outlined version)
const builtinFonts = [
  "apl386o",
	"apl386",
	"sinko",
	"sink",
]

// Make a list of fonts that we cycle through
const fonts = [
	...builtinFonts,
	"unscii"
]

// Use this syntax and style option to style chunks of text, with CharTransformFunc.
add([
	text("[Space Escape].wavy", {
		width: width(),
		styles: {
			"green": {
        color: rgb(128, 128, 255),
			},
			"wavy": (idx, ch) => ({
				color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
				pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
			}),
		},
	}),
	pos(vec2(960, 400)),
	origin("center"),
	// scale(0.5),
])


function addButton(txt, p, f) {
  
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

addButton("Start", vec2(960, 540), () => debug.log("oh hi"))
// addButton("Quit", vec2(200, 200), () => debug.log("bye"))

// reset cursor to default at frame start for easier cursor management
onUpdate(() => cursor("default"))