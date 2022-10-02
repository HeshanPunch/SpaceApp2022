import k from './kaboom';
import { map , gameConfigs, asteroidLarge, asteroid, satellite, moonhttps, earth, ufo, totalScore} from './items';

// start the game
export const Game = () => {
  const NORMAL_SPEED = 70;
  const FAST_SPEED = 90;
  let SPEED = NORMAL_SPEED;

  loadSprite("asteroid", asteroid);
  loadSprite("satellite", satellite);
  loadSprite("asteroid-large", asteroidLarge);
  loadSprite("moon", moonhttps);
  loadSprite("earth", earth);
  loadSprite("ufo", ufo);

  k.scene("game", () => {
    //   layers(["bg", "obj", "ui"], "obj");

    const score = add([
      text(`Score: ${totalScore}`, {
        size: 25,
      }),
      pos(10, 10),
      { value: totalScore },
    ]);

    const playerSat = add([
      sprite("satellite"),
      pos(300, 200),
      scale(0.1),
      solid(),
      area(),
    ]);

    const earth = add([
      sprite("earth"),
      pos(1200, 300),
      scale(0.35),
      solid(),
      area(),
      rotate(1),
      origin("center"),
      "earth",
    ]);

    const moon = add([
      sprite("moon"),
      pos(900, 400),
      solid(),
      area(),
      scale(0.035),
      "moon",
    ]);

    onKeyDown("right", () => {
      playerSat.move(SPEED, 0);
      score.value += 1;
      score.text = "Score:" + score.value;
      // camPos(playerSat.pos)
    });
    onKeyDown("left", () => {
      playerSat.move(-SPEED, 0);
      score.value -= 1;
      score.text = "Score:" + score.value;
    });
    onKeyDown("up", () => {
      playerSat.move(0, -SPEED);
    });
    onKeyDown("down", () => {
      playerSat.move(0, SPEED);
    });


    playerSat.onCollide("asteroid", () => {
      SPEED -= SPEED * 0.01;
      score.value -= 1;
      score.text = "Score:" + score.value;
    });

    //   Earth rotation + Alien
    earth.onUpdate(() => {
      earth.angle += 2 * dt();

      if (score.value >= 10) {
        const ufo = add([
          sprite("ufo"),
          pos(500, 100),
          scale(0.25),
          solid(),
          area(),
          "ufo",
        ]);
        //GOTO --> quiz?
        k.go("placeholderquiz")
      }
    });

    //   Moon movement
    let Xvel = 2;
    let Yvel = 1;
    moon.onUpdate(() => {
      moon.move(Xvel, Yvel);
    });

    //Player Alerts - error messages, hints
    const playerAlerts = add([
      text("Use WASD keys to move", {
        size: 20,
      }),
      color(30, 0, 255),
      pos(10, 45),
      { value: 0 },
    ]);

    addLevel(map, gameConfigs);
  });

  k.scene("placeholderquiz", () => {
    /*
    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
    };*/

    const ufo = add([
      sprite("ufo"),
      pos(600, 300),
      scale(0.5),
      solid(),
      area(),
      "ufo",
    ]);

    const alienDialog = add([
      text("Hello Human", {
        size: 25,
      }),
      pos(100, 100),
      { value: 0 },
    ]);

    addLevel(map, gameConfigs);
    
  });
  k.go("game");
}


export default Game;
