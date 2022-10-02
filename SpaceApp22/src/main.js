import kaboom from "kaboom";

// initialize context
const k = kaboom({});

k.scene("main", () => [
  k.add([
    k.text("Hello World", 32),
    k.pos(k.width() * 0.5, k.height() * 0.5),
    k.color(1, 1, 1, 1),
    k.origin("center"),
  ]),
]);

k.go("main");
