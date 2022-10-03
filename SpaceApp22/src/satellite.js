import k from "./kaboom";
import Book from "./book";
import { Quiz, correctQuiz } from "./quiz";
import {
  map,
  asteroidLarge,
  asteroid,
  satellite,
  moonhttps,
  earth,
  ufo,
  meteor,
  spacestation,
  spaceship,
  book,
  alien1,
  alien2,
  alien3,
  alien4,
  alien5,
} from "./items";

let totalScore = 20;
// start the game
export const Game = () => {
  if (correctQuiz) {
    totalScore += 20;
  } else {
    totalScore -= 20;
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
  loadSprite("book", book);
  loadSprite("alien1", alien1);
  loadSprite("alien2", alien2);
  loadSprite("alien3", alien3);
  loadSprite("alien4", alien4);
  loadSprite("alien5", alien5);

  k.scene("game", () => {
    const satellite = add([
      sprite("satellite"),
      pos(300, 200),
      scale(0.1),
      solid(),
      area(),
      origin("center"),
      "satellite",
    ]);

    const score = add([
      text(`Score: ${totalScore}`, {
        size: 25,
      }),
      pos(10, 10),
      fixed(),
      { value: totalScore },
    ]);

    const playerAlerts = add([
      text("Use arrow keys to move", {
        size: 20,
      }),
      color(30, 0, 255),
      pos(10, 40),
      fixed(),
    ]);

    const book = add([
      sprite("book"),
      pos(1270, 10),
      solid(),
      area(),
      fixed(),
      scale(0.1),
      "book",
      area({ cursor: "pointer" }),
    ]);

    book.onClick(() => {
      k.go("book");
    });

    satellite.onUpdate(() => {
      camPos(satellite.pos);
      camScale(3);
      debug.log("totalScore : " + totalScore);
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

    const quiz1 = add ([
      sprite("alien1"),
      pos(500, 400),
      solid(),
      area(),
      scale(0.035),
      "alien1",
    ])

    satellite.onCollide("alien1", () => {
      setTimeout(() => {
        k.go("quiz");
      }, 500);
    });

    
    const quiz2 = add ([
      sprite("alien2"),
      pos(700, 100),
      solid(),
      area(),
      scale(0.035),
      "alien2",
    ])

    satellite.onCollide("alien2", () => {
      setTimeout(() => {
        k.go("quiz");
      }, 500);
    });
    
    const quiz3 = add ([
      sprite("alien3"),
      pos(800, 300),
      solid(),
      area(),
      scale(0.035),
      "alien3",
    ])

    satellite.onCollide("alien3", () => {
      setTimeout(() => {
        k.go("quiz");
      }, 500);
    });
    
    const quiz4 = add ([
      sprite("alien4"),
      pos(900, 400),
      solid(),
      area(),
      scale(0.035),
      "alien4",
    ])

    satellite.onCollide("alien4", () => {
      setTimeout(() => {
        k.go("quiz");
      }, 500);
    });
    
    const quiz5 = add ([
      sprite("alien5"),
      pos(1000, 200),
      solid(),
      area(),
      scale(0.035),
      "alien5",
    ])

    satellite.onCollide("alien5", () => {
      setTimeout(() => {
        k.go("quiz");
      }, 500);
    });

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

    addLevel(map, levelConfigs);
  });

  k.go("game");
};
Book();
Quiz();

export default Game;
