import kaboom from "kaboom";

// start the game

kaboom({
  font: "sinko",
  background: [11, 16, 38],
  fullscreen: true,
  scale: 1,
});

const NORMAL_SPEED = 100;
const FAST_SPEED = 200;
let SPEED = NORMAL_SPEED;

loadSprite("star", "https://i.imgur.com/xmgu2JZ.gif");
loadSprite("satellite", "https://art.pixilart.com/4c141c7f72cb059.png");
/* loadSprite(
  "star",
  "https://www.pngfind.com/pngs/m/115-1154244_asteroid-pixel-art-red-button-hd-png-download.png"
); */

scene("game", () => {
  //   layers(["bg", "obj", "ui"], "obj");

  const map = [
    "                   *                   *                           *      ",
    "           *               *         *                        *             ",
    "             *                      *   *                  *                ",
    " *                                              *                *          ",
    "                      *       *                         *                   ",
    "                      *                                 *             *     ",
    "                   *                            *                *          ",
    " *                                              *                     *     ",
    "         *                             *                           *        ",
    "                                                      *           *   *     ",
    "       *                                                                    ",
    "             *                         *                      *             ",
    "                      *          *                    *            *        ",
    " *            *                                  *                      *   ",
    "                      *                *                 *               *  ",
    "         *                     *        *                               *   ",
    " *                                              *                    *  *   ",
    "                      *                             *             *         ",
    "                             *                              *               ",
    " *             *                                   *                       *",
    "                          *               *                      *         * ",
    "             *                         *                      *             ",
    " *                                              *               *           ",
    "               *                *                                 *     *   ",
    "             *                         *                              *     ",
    " *                            *                  *                    *     ",
    " *                               *               *                  *       ",
    "                      *                             *             *         ",
    "      *                         *       *                     *             ",
    " *                        *                         *                 *     ",
    "             *                                  *               *           ",
    "                                   *                     *                  ",
    " *                              *                *             *            ",
    "                     *                      *                    *         ",
  ];

  const levelConfigs = {
    width: 20,
    height: 20,
    "*": () => [sprite("star"), area(), solid(), scale(0.1)],
  };

  const playerSat = add([sprite("satellite"), pos(300, 200), scale(0.1)]);
  onKeyDown("right", () => {
    playerSat.move(NORMAL_SPEED, 0);
  });
  onKeyDown("left", () => {
    playerSat.move(-NORMAL_SPEED, 0);
  });
  onKeyDown("up", () => {
    playerSat.move(0, -NORMAL_SPEED);
  });
  onKeyDown("down", () => {
    playerSat.move(0, NORMAL_SPEED);
  });

  addLevel(map, levelConfigs);
});

go("game");
