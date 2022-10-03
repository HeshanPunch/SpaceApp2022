import k from './kaboom';
import { map , gameConfigs, asteroidLarge, asteroid, satellite, moonhttps, earth, ufo} from './items';

loadSprite("asteroid", asteroid);
loadSprite("satellite", satellite);
loadSprite("asteroid-large", asteroidLarge);
loadSprite("moon", moonhttps);
loadSprite("earth", earth);
loadSprite("ufo", ufo);

k.scene("last", () => {
  const earth = add([
    sprite("earth"),
    pos(1200, 300),
    scale(1),
    solid(),
    area(),
    rotate(1),
    origin("center"),
    "earth",
  ]);

  const satellite = add([
    sprite("satellite"),
    pos(200, 200),   // pos() component gives it position, also enables movement 
    origin("center")
  ]);

  satellite.onUpdate(() => {
    // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
    satellite.angle += 100 * dt()
  })

  addLevel(map, gameConfigs);
})

k.go('last');