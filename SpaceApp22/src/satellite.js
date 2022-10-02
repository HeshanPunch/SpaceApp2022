//import kaboom from "kaboom";
import k from './kaboom';
// start the game
/*
kaboom({
  font: "sinko",
  background: [11, 16, 38],
  fullscreen: true,
  canvas: document.querySelector("gamecanvas"),
  // width: 1280,
  // height: 800,
  scale: 1,
});*/



// player.onCollide("coin", () => {
//   score.value += 1;
//   score.text = "Score:" + score.value;
// });

/* loadSprite(
  "star",
  "https://www.pngfind.com/pngs/m/115-1154244_asteroid-pixel-art-red-button-hd-png-download.png"
); */
export const Game = () => {
  loadSprite("asteroid", "https://i.imgur.com/B1NSdRO.png");
  loadSprite("satellite", "https://art.pixilart.com/4c141c7f72cb059.png");
  loadSprite("asteroid-large", "https://i.imgur.com/qIHdjDQ.png");
  loadSprite("moon", "https://i.imgur.com/nXhRU9V.png");
  loadSprite("earth", "https://i.imgur.com/Qjmlokl.png");
  loadSprite("ufo", "https://i.imgur.com/2rEcvS6.png");
  const NORMAL_SPEED = 70;
  const FAST_SPEED = 90;
  let SPEED = NORMAL_SPEED;

  k.scene("game", () => {
    //   layers(["bg", "obj", "ui"], "obj");

    const score = add([
      text("Score: 0", {
        size: 25,
      }),
      pos(10, 10),
      { value: 0 },
    ]);

    const map = [
      "                   *                   *                           *      ",
      "           *                                                              ",
      "                                                                          ",
      " *                                                                        ",
      "                             *                                            ",
      "                                                                    *     ",
      "                                                                          ",
      " *                                                                        ",
      "                                       *                                  ",
      "                                                      *                   ",
      "                                                                          ",
      "                                                                          ",
      "                                                             (             ",
      "                                                                          ",
      "                                                                  0        ",
      "         *                     *                                          ",
      "                                                                          ",
      "                                                                          ",
      "                                                                          ",
      "               *                                                          ",
      "                                          *                               ",
      "                                                                          ",
      "                                                                          ",
      "                                                                          ",
      "                                                                          ",
      "                                                                          ",
      "                                                                          ",
      "                                                                          ",
      "      *                         *                           *             ",
      "                                                                          ",
      "                                                *                         ",
      "                                                                          ",
      " *                                                                        ",
      "                                                                         ",
    ];

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

    /* for (let i = 0; i < 3; i++) {
      const x = rand(0, width());
      const y = rand(0, height());
   
      add([sprite("asteroid-large"), pos(x, y), area(), "asteroid-large"]);
    } */

    playerSat.onCollide("asteroid", () => {
      SPEED -= SPEED * 0.01;
      score.value -= 1;
      score.text = "Score:" + score.value;
    });

    //   Earth rotation + Alien 
    earth.onUpdate(() => {
      earth.angle += 3 * dt();


      if (score.value >= 10) {
        const ufo = add([
          sprite("ufo"),
          pos(500, 100),
          scale(0.25),
          solid(),
          area(),
          "ufo",
        ]);
      }
    });

    //   Moon movement
    let Xvel = 2;
    let Yvel = 1;
    moon.onUpdate(() => {
      moon.move(Xvel, Yvel);
    });


    //   Alien interaction

    addLevel(map, levelConfigs);
  });
  
  k.go("game");
}

export default Game;
