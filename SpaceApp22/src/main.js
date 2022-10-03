import k from "./kaboom";
import intro from "./introduction";
import game from "./satellite";
import { addButton, map, greetingConfigs } from "./items";

k.scene("start", () => {
  addLevel(map, greetingConfigs);

  setTimeout(() => {
    addButton("Start", vec2(k.width() * 0.5, k.height() * 0.75), () =>
      k.go("intro")
    );
  }, 500);
});

intro();

k.go("start");
