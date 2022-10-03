import k from "./kaboom";
import game from "./satellite";
import { map, greetingConfigs, addButton } from "./items";

export const intro = () => {
  k.scene("introduction", () => {
    addLevel(map, greetingConfigs);

    setTimeout(() => {
      addButton("Start", vec2(k.width() * 0.5, k.height() * 0.75), () =>
        k.go("game")
      );
    }, 2000);

    add([
      text("Space is a harsh environment", {
        size: 25,
      }),
      pos(center() - 200),
      { value: 0 },
    ]);
  });

  game();

  k.go("start");
};

export default intro;
