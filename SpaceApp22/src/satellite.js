import k from "./kaboom";
import { Quiz, correctQuiz } from "./quiz";
import Book from "./book";
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
} from "./items";

let totalScore = 20;
// start the game
export function Game() {
  
  if (correctQuiz) {
    totalScore += 20;
    // correctQuiz = false;
  } else {
    totalScore -= 20;
  }
  
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
  loadSprite("book", book);

  k.scene("game", () => {
    //   layers(["bg", "obj", "ui"], "obj");
    
    const score = add([
      text(`Score: ${totalScore}`, {
        size: 25,
      }),
      pos(10, 10),
      { value: totalScore },
    
    ]);

    const playerAlerts = add([
      text("Use arrow keys to move", {
        size: 20,
      }),
      color(30, 0, 255),
      pos(10, 70),
    ]);

    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
    };

    const satellite = add([
      sprite("satellite"),
      pos(300, 200),
      scale(0.1),
      solid(),
      area(),
      origin("center"),
      "satellite",
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

      const book = add([
        sprite("book"),
        pos(1270, 10),
        solid(),
        area(),
        scale(0.1),
        "book",
        area({ cursor: "pointer" }),
      ]);

    book.onClick(() => {
        k.go("book");
      });

    earth.onUpdate(() => {
      earth.angle += 2 * dt();

      if (score.value >= 30) {
        const ufo = add([
          sprite("ufo"),
          pos(400, 300),
          scale(0.5),
          solid(),
          area(),
          "ufo",
          text("Want to talk? Please press the space bar", {
            size: 25,
          }),
        ]);
        onKeyPress("space", () => k.go("quiz"));
      }
    });

    //   Moon movement
    let Xvel = 2;
    let Yvel = 1;
    moon.onUpdate(() => {
      moon.move(Xvel, Yvel);
    });

    onKeyDown("right", () => {
      satellite.move(SPEED, 0);
      score.value += 1;
      score.text = "Score:" + score.value;
      sendObject();
      // camPos(satellite.pos)
    });
    onKeyDown("left", () => {
      satellite.move(-SPEED, 0);
      score.value -= 1;
      score.text = "Score:" + score.value;
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
      alertMessage("COLLISSION !!!");

      SPEED -= SPEED * 0.01;
      score.value -= 1;
      score.text = "Score:" + score.value;
    });

    satellite.onCollide("earth", (earth) => {});

    //alert messages
    const alertMessage = (text) => {
      playerAlerts.text = "WARNING: " + text;
      playerAlerts.color = rgb(255, 0, 0);
      setTimeout(() => {
        clearAlertMessage();
      }, 1500);
    };

    const clearAlertMessage = () => {
      playerAlerts.text = "Let's get back on track...";
      playerAlerts.color = rgb(0, 255, 150);
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

    addLevel(map, levelConfigs);
  });

  k.go("game");
}
  Quiz();
  Book();


export default Game;
