import k from './kaboom';
// start the game
export const Game = () => {
  const NORMAL_SPEED = 70;
  const FAST_SPEED = 90;
  let SPEED = NORMAL_SPEED;

  loadSprite("asteroid", "https://i.imgur.com/B1NSdRO.png");
  loadSprite("satellite", "https://art.pixilart.com/4c141c7f72cb059.png");
  loadSprite("asteroid-large", "https://i.imgur.com/qIHdjDQ.png");
  loadSprite("moon", "https://i.imgur.com/nXhRU9V.png");
  loadSprite("earth", "https://i.imgur.com/Qjmlokl.png");
  loadSprite("ufo", "https://i.imgur.com/2rEcvS6.png");

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
    "                                                  ()                                                  ",
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

    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
      // "0": () => [sprite("earth"), area(), solid(), scale(0.4), "earth"],
      // "(": () => [sprite("moon"), area(), solid(), scale(0.05), "moon"],
    };

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



    addLevel(map, levelConfigs);
  });

  k.scene("placeholderquiz", () => {
    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
    };

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

    addLevel(map, levelConfigs);
  });

  k.go("game");
}

export default Game;
