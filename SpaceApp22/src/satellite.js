import k from "./kaboom";
// start the game
export const Game = () => {
  const NORMAL_SPEED = 50;
  const FAST_SPEED = 90;
  let SPEED = NORMAL_SPEED;

  loadSprite("asteroid", "https://i.imgur.com/B1NSdRO.png");
  loadSprite("satellite", "https://art.pixilart.com/4c141c7f72cb059.png");
  loadSprite("asteroid-large", "https://i.imgur.com/qIHdjDQ.png");
  loadSprite("moon", "https://i.imgur.com/nXhRU9V.png");
  loadSprite("earth", "https://i.imgur.com/Qjmlokl.png");
  loadSprite("ufo", "https://i.imgur.com/2rEcvS6.png");
  loadSprite("spaceship", "https://i.imgur.com/Sp220hN.png");
  loadSprite("meteor", "https://i.imgur.com/RkH05Dh.png");
  loadSprite("spacestation", "https://i.imgur.com/TIMxSI6.png");

  const map = [
    "                                                            *                   *                           *      ",
    "                                                *                                                              ",
    "                                                                                                               ",
    "                                                                                                                 ",
    "                             *                                                                                 ",
    "                                                                                                        *     ",
    "                                                                                                           ",
    " *                                                                                                       ",
    "                                       *                                                                  ",
    "                                                                                    *                   ",
    "                                                                                                      ",
    "                                                                                                        ",
    "                                                                                                       ",
    "                                                                                                      ",
    "                                                                                                    ",
    "         *                      *                                                                   ",
    "                                                                                                    ",
    "                                                                                                    ",
    "                                                                                                    ",
    "               *                                                                                    ",
    "                                          *                                                           ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                             *                         ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                                                      ",
    "                                                                                                      ",
    "      *                         *                                                       *             ",
    "                                                                                                      ",
    "                                                                            *                         ",
    "                                                                                                      ",
    " *                                                                                                    ",
    "                                                                                                     ",
  ];
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
      pos(10, 45),
      { value: 0 },
    ]);

    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
      // "0": () => [sprite("earth"), area(), solid(), scale(0.4), "earth"],
      // "(": () => [sprite("moon"), area(), solid(), scale(0.05), "moon"],
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

    earth.onUpdate(() => {
      earth.angle += 2 * dt();

      if (score.value >= 10) {
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

    satellite.onCollide("earth", (earth) => {
        
    });

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
};

export default Game;
