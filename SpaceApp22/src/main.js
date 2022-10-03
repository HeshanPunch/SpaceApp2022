import k from "./kaboom";
import intro from "./introduction";
import { addButton, map, greetingConfigs } from "./items";



k.scene("start", () => {
  addLevel(map, greetingConfigs);

  setTimeout(() => {
    addButton("Start", vec2(k.width() * 0.5, k.height() * 0.75), () =>
      k.go("introduction")
    );
  }, 500);

  add([
    text("Space is a harsh environment", {
      size: 25,
    }),
    pos(center() - 200),
    { value: 0 },
  ]);
});

intro();

k.go("start");
