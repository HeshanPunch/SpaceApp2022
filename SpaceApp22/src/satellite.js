import k from "./kaboom";
import { Quiz, correctQuiz } from "./quiz";
import {
  map,
  gameConfigs,
  asteroidLarge,
  asteroid,
  satellite,
  moonhttps,
  earth,
  ufo,
  meteor,
  spacestation,
  spaceship,
} from "./items";

let totalScore = 0;
// start the game
export const Game = () => {
  if (correctQuiz) {
    totalScore += 100;
    // correctQuiz = false;
  }

  const NORMAL_SPEED = 70;
  const MIN_SPEED = 25;
  let SPEED = NORMAL_SPEED;

  loadSprite("asteroid", asteroid);
  loadSprite("satellite", satellite);
  loadSprite("asteroid-large", asteroidLarge);
  loadSprite("moon", moonhttps);
  loadSprite("earth", earth);
  loadSprite("ufo", ufo);
  loadSprite("spaceship", spaceship);
  loadSprite("meteor", meteor);
  loadSprite("spacestation", spacestation);

  k.scene("game", () => {
    //   layers(["bg", "obj", "ui"], "obj");
    const satellite = add([
      sprite("satellite"),
      pos(300, 200),
      scale(0.1),
      solid(),
      area(),
      origin("center"),
      "satellite",
    ]);
    /* const score = add([
      text("Score: 0", {
        size: 25,
      }),
      pos(satellite.pos),
      { value: 0 },
    ]);
    const playerAlerts = add([
      text("Use arrow keys to move", {
        size: 20,
      }),
      color(30, 0, 255),
      pos(satellite.pos),
      { value: 0 },
    ]); */

    satellite.onUpdate(() => {
      camPos(satellite.pos);
      camScale(3);
      debug.log("totalScore : " + totalScore);
    });

    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
      // "0": () => [sprite("earth"), area(), solid(), scale(0.4), "earth"],
      // "(": () => [sprite("moon"), area(), solid(), scale(0.05), "moon"],
    };

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

    earth.onUpdate(() => {
      earth.angle += 2 * dt();

      /* if (score.value >= 10) {
        const ufo = add([
          sprite("ufo"),
          pos(400, 200),
          scale(0.15),
          solid(),
          area(),
          "ufo",
        ]);
        //GOTO --> quiz?
        // k.go("placeholderquiz")
      } */
    });

    //   Moon movement
    let Xvel = 2;
    let Yvel = 1;
    moon.onUpdate(() => {
      moon.move(Xvel, Yvel);
    });

    onKeyDown("right", () => {
      satellite.move(SPEED, 0);

      sendObject();
      // camPos(satellite.pos)
    });
    onKeyDown("left", () => {
      satellite.move(-SPEED, 0);

      sendObject();
    });
    onKeyDown("up", () => {
      satellite.move(0, -SPEED);
      sendObject();
    });
    onKeyDown("down", () => {
      satellite.move(0, SPEED);
      sendObject();
    });

    satellite.onCollide("asteroid", () => {
      setTimeout(() => {
        totalScore--;
      }, 500);
      if (SPEED > MIN_SPEED) {
        SPEED -= SPEED * 0.01;
      }

      playerMessage("!!!", true);
    });

    //back to earth
    satellite.onCollide("earth", (earth) => {});

    const playerMessage = (text, alert) => {
      let textColour = rgb(255, 255, 255);
      if (alert) {
        textColour = rgb(200, 0, 0);
      }

      drawText({
        text: text,
        size: 8,
        font: "sink",
        width: 120,
        pos: satellite.pos,
        color: textColour,
      });
    };

    const sendObject = () => {
      const objectOdds = Math.random();

      if (objectOdds > 0.995) {
        sendSpaceship();
      }
      if (objectOdds > 0.98) {
        sendMeteor();
      }
    };

    let spaceshipspawned = false;
    const sendSpaceship = () => {
      if (!spaceshipspawned) {
        const spaceship = add([
          sprite("spaceship"),
          pos(1150, 300),
          scale(0.05),
          rotate(-65),
          "spaceship",
        ]);

        let Xvel = -5;
        let Yvel = -5;
        spaceship.onUpdate(() => {
          spaceship.move(Xvel, Yvel);
        });
      }
      spaceshipspawned = true;
    };

    const sendMeteor = () => {
      let x = Math.random();
      const meteor = add([
        sprite("meteor"),
        pos(500 + 1000 * x, 0),
        scale(0.025),
        solid(),
        area(),
        "meteor",
      ]);

      let Xvel = -45;
      let Yvel = 55;
      meteor.onUpdate(() => {
        meteor.move(Xvel, Yvel);
      });
      meteor.onCollide("asteroid", (asteroid) => {
        destroy(meteor);
      });
      meteor.onCollide("ufo", (ufo) => {
        destroy(meteor);
      });

      meteor.onCollide("earth", (earth) => {
        destroy(meteor);
        setTimeout(() => {
          totalScore--;
        }, 500);
      });

      meteor.onCollide("satellite", (satellite) => {
        playerMessage("!!!", true);

        destroy(meteor);
      });
    };

    addLevel(map, levelConfigs);
  });

  k.scene("placeholder", () => {
    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
    };

    const ufo = add([
      sprite("ufo"),
      pos(600, 300),
      scale(0.3),
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

    addLevel(map, levelConfigs);
  });

  k.go("game");
};

export default Game;
