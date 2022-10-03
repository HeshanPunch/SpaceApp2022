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
  alien1,
  alien2,
  alien3,
  alien4,
  alien5,
} from "./items";

let totalScore = 10;
// start the game
export function Game() {
  if (correctQuiz) {
    totalScore += 100;
    // correctQuiz = false;
  }
  debug.log("totalScore : " + totalScore);
  const NORMAL_SPEED = 70;
  const FAST_SPEED = 90;
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

  loadSprite("alien1", alien1);
  loadSprite("alien2", alien2);
  loadSprite("alien3", alien3);
  loadSprite("alien4", alien4);
  loadSprite("alien5", alien5);


k.scene("game", () => {
  //   layers(["bg", "obj", "ui"], "obj");

  const score = add([
    text("Score: 0", {
      size: 25,
    }),
    pos(10, 10),
    { value: 0 },
  ]);

    const playerAlerts = add([
      text("Use arrow keys to move", {
        size: 20,
      }),
      color(30, 0, 255),
      pos(10, 40),
      fixed(),
    ]);

    satellite.onUpdate(() => {
      camPos(satellite.pos);
      camScale(3);
    });

    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
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
    });

    const quiz1 = add([
      sprite("alien1"),
      pos(500, 400),
      solid(),
      area(),
      scale(0.035),
      "alien1",
      rotate(0),
    ]);

    quiz1.onUpdate(() => {
      // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
      quiz1.angle += 20 * dt()
      quiz2.angle += 20 * dt();
      quiz3.angle += 20 * dt();
      quiz4.angle += 20 * dt();
      quiz5.angle += 20 * dt();
    });

    satellite.onCollide("alien1", () => {
      setTimeout(() => {
        k.go("quiz1");
      }, 500);
    });

    const quiz2 = add([
      sprite("alien2"),
      pos(700, 100),
      solid(),
      area(),
      scale(0.035),
      "alien2",
      rotate(0),
    ]);

    satellite.onCollide("alien2", () => {
      setTimeout(() => {
        k.go("quiz2");
      }, 500);
    });

    const quiz3 = add([
      sprite("alien3"),
      pos(800, 300),
      solid(),
      area(),
      scale(0.035),
      "alien3",
      rotate(0),
    ]);

    satellite.onCollide("alien3", () => {
      setTimeout(() => {
        k.go("quiz3");
      }, 500);
    });

    const quiz4 = add([
      sprite("alien4"),
      pos(900, 400),
      solid(),
      area(),
      scale(0.035),
      "alien4",
      rotate(0),
    ]);

    satellite.onCollide("alien4", () => {
      setTimeout(() => {
        k.go("quiz4");
      }, 500);
    });

    const quiz5 = add([
      sprite("alien5"),
      pos(1000, 200),
      solid(),
      area(),
      scale(0.035),
      "alien5",
      rotate(0),
    ]);

    satellite.onCollide("alien5", () => {
      setTimeout(() => {
        k.go("quiz5");
      }, 500);
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
    if (objectOdds > 0.95) {
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
    });

    meteor.onCollide("satellite", (satellite) => {
      alertMessage("hit recorded!");
      score.value -= 20;
      score.text = "Score:" + score.value;
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

    addLevel(map, gameConfigs);
    
  });
  k.go("game");
}

Quiz();

export default Game;