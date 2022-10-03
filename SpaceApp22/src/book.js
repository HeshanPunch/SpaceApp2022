import k from "./kaboom";
import { book } from "./items";
import Game from "./satellite";

export function Book() {
  loadSprite("book", book);
  k.scene("book", () => {
    const dialogs = ["How to play"];
    const close = add([
      text("x", {
        size: 30,
      }),
      pos(1300, 10),
      area({ cursor: "pointer" }),
    ]);

    close.onClick(() => {
      Game();
    });

    const textbox = add([
      rect(width() - 700, 120, { radius: 32 }),
      origin("center"),
      pos(center().x, height() - 400),
      outline(2),
    ]);

    const txt = add([
      text("", { size: 32, width: width() - 230 }),
      pos(textbox.pos),
      origin("center"),
    ]);
    txt.text = dialogs;
  });
}

export default Book;
