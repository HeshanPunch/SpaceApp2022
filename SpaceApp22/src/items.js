const asteroid = "https://i.imgur.com/B1NSdRO.png";
const satellite = "https://art.pixilart.com/4c141c7f72cb059.png";
const asteroidLarge = "https://i.imgur.com/qIHdjDQ.png";
const moonhttps = "https://i.imgur.com/nXhRU9V.png";
const earth = "https://i.imgur.com/Qjmlokl.png";
const ufo = "https://i.imgur.com/2rEcvS6.png";
const alien1 = "https://i.imgur.com/sLZ2ZIf.png";
const alien2 = "https://i.imgur.com/MZ0sX75.png";
const alien3 = "https://i.imgur.com/elus95n.png";
const alien4 = "https://i.imgur.com/2J8OCMS.png";
const alien5 = "https://i.imgur.com/R6dDK4I.png";
const mercury = "https://i.imgur.com/RHPYZVd.png";
const rocket = "https://i.imgur.com/8rMVcKB.png";
const spaceship = "https://i.imgur.com/Sp220hN.png";
const meteor = "https://i.imgur.com/RkH05Dh.png";
const spacestation = "https://i.imgur.com/TIMxSI6.png";


loadSprite("mercury", mercury);
loadSprite("rocket", rocket);

const addButton = (txt, p, f) => {
  const btn = add([
    text(txt, {
      size: 25,
    }),
    pos(p),
    area({ cursor: "pointer" }),
    scale(1),
    origin("center"),
  ]);

  btn.onClick(f);

  btn.onUpdate(() => {
    if (btn.isHovering()) {
      const t = time() * 10;
      btn.color = rgb(
        wave(0, 255, t),
        wave(0, 255, t + 2),
        wave(0, 255, t + 4)
      );
      btn.scale = vec2(1.2);
    } else {
      btn.scale = vec2(1);
      btn.color = rgb();
    }
  });
};

const greetingConfigs = {
  width: 20,
  height: 20,
  "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
  m: () => [sprite("mercury"), area(), solid(), scale(0.4), rotate(0), "mercury"],
  f: () => [sprite("rocket"), area(), solid(), scale(0.3), rotate(0), "rocket"],
};


const map = [
  "                                                            *          ",
  "                                                *                      ",
  "                                                 m                     ",
  "     *                                                                 ",
  "                             *                                         ",
  "                                                                       ",
  "                       *                                         *     ",
  "                                                                       ",
  "                                           *                           ",
  "                                     *                                 ",
  "                                                                       ",
  "                                                                      ",
  "                                                                       ",
  "                             *                                         ",
  "                                                                       ",
  "                                *                                      ",
  "                                                                       ",
  "      *                                   *                            ",
  "                                                                       ",
  "                  *                                                    ",
  "                                                                 *     ",
  "              f                                 *                      ",
  "                                                                       ",
  "      *                       *                                        ",
  "                                                                       ",
  "               *                                                       ",
  "                                                                       ",
  "                                                            *          ",
  "                                                                       ",
  "      *                                   *                            ",
  "                                                                       ",
  "                             *                                         ",
  "                                                                       ",
  "                                                *                      ",
  "                                                                       ",
  "      *                                   *                            ",
];

export {
  greetingConfigs,
  map,
  asteroidLarge,
  asteroid,
  satellite,
  moonhttps,
  earth,
  ufo,
  alien1,
  alien2,
  alien3,
  alien4,
  alien5,
  spaceship,
  meteor,
  spacestation,
  addButton,
};
