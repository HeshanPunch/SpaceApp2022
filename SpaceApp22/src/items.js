const asteroid = "https://i.imgur.com/B1NSdRO.png"
const satellite = "https://art.pixilart.com/4c141c7f72cb059.png"
const asteroidLarge = "https://i.imgur.com/qIHdjDQ.png"
const moonhttps = "https://i.imgur.com/nXhRU9V.png"
const earth = "https://i.imgur.com/Qjmlokl.png"
const ufo = "https://i.imgur.com/2rEcvS6.png"

let totalScore = 2;

const greetingConfigs = {
  width: 10,
  height: 10,
  "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
  // "0": () => [sprite("earth"), area(), solid(), scale(0.4), "earth"],
  // "(": () => [sprite("moon"), area(), solid(), scale(0.05), "moon"],
};

const gameConfigs = {
  width: 20,
  height: 20,
  "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
  // "0": () => [sprite("earth"), area(), solid(), scale(0.4), "earth"],
  // "(": () => [sprite("moon"), area(), solid(), scale(0.05), "moon"],
};
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

export { greetingConfigs, gameConfigs, map, asteroidLarge, asteroid, satellite, moonhttps, earth, ufo, totalScore};