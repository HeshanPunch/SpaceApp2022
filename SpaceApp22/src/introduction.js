import k from "./kaboom";
import game from "./satellite";
import { map, greetingConfigs, addButton, asteroid } from "./items";

export const intro = () => {
  loadSprite("asteroid", asteroid);
  let x = 0;

  k.scene("intro", () => {
    setTimeout(() => {
      addButton("Start", vec2(k.width() * 0.5, k.height() * 0.75), () =>
        k.go("game")
      );
    }, 3000);

    const addtext = (myText) => {
      add([
        pos(100 + x * 0.5, 100 + x),
        text(myText, {
          size: 24, // 48 pixels tall
          width: 800,
          font: "apl386", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
        }),
      ]);
    };

    addtext("Space is a harsh environment.");
    x += 100;
    addtext(
      "Space-based threats include cosmic radiation from the sun, signal interferences, meteoroids from near-Earth comets and asteroids, and space debris. "
    );
    x += 100;
    addtext(
      "Operators must measure and understand these threats as part of their space situational awareness"
    );
    x += 300;
    addtext(
        "CASSIOPE is lost! avoid space threats and bring her back to orbit..."
      );

    addLevel(map, greetingConfigs);
  });
};

game();

export default intro;
