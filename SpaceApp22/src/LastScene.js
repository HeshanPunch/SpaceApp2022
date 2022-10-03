import k from './kaboom';
import { map, gameConfigs, satellite, earth, asteroid } from './items';


loadSprite("satellite", satellite);
loadSprite("earth", earth);
loadSprite("asteroid", asteroid);

const SPEED = 100;

k.scene("last", () => {
  const earth = add([
    sprite("earth"),
    scale(2),
    pos(1000, 300),
    area({ width: 5, height: 5, offset: vec2(0, 6)}),
    origin("center"),
  ]);

  const satellite = add([
    sprite("satellite"),
    area(),
    scale(0.8),
    outline(4),
    pos(0, 300),
    origin("center"),
    move(RIGHT, SPEED),
  ])

  loop(10, () => {
    wait(8, () => {
      destroy(satellite)
      rotatingOnEarth();  
      wait(6, () => {
        k.go('gameOver')
      })
    });
  })

  function rotatingOnEarth () {
    const satellite = add([
      sprite("satellite"),
      rotate(0),
      pos(1000, 300),
      follow(earth, vec2(-4, 9)),
    ])
  
    satellite.onUpdate(() => {
      // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
      satellite.angle += 50 * dt()
    })
  }

  addLevel(map, gameConfigs);
})


k.scene("gameOver", () => {
  add([
    text("Game over", {
      size: 50
    }), 
    pos(center()), 
    origin("center")
  ]);
});

k.go('last');


