// Simple dialogues
import k from "./kaboom";
import totalScore from './items';

export function Quiz(){

  loadSprite("bean", "https://kaboomjs.com/sprites/bean.png");
  k.scene("quiz", () => {
    // Define the dialogue data
    const dialogs = [
      ["bean", "This is quiz time!"],
      ["bean", "Q. What is my name?"],
    ];

  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 700, 120, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 400),
    outline(2),
  ]);

  // Text
  const txt = add([
    text("", { size: 32, width: width() - 230 }),
    pos(textbox.pos),
    origin("center"),
  ]);

  // Character avatar
  const avatar = add([
    sprite("alien"),
    scale(0.5),
    origin("center"),
    rotate(0),
    pos(center().sub(0, 200))
  ]);

  avatar.onUpdate(() => {
    // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
    avatar.angle += 120 * dt()
  })
  

  onKeyPress("space", () => {
    // Cycle through the dialogs
    curDialog = (curDialog + 1) % dialogs.length;
    updateDialog();
  });

  // Update the on screen sprite & text
  function updateDialog() {
    const [char, dialog] = dialogs[curDialog];

    // Use a new sprite component to replace the old one
    avatar.use(sprite(char));
    // Update the dialog text
    txt.text = dialog;
  }

  updateDialog();

  const addButton = (txt, p, f) => {
    const btn = add([
      text(txt),
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
    totalScore += 100;

    //   scene("start", () => {
    //     addButton("Start", vec2(k.width() * 0.5, k.height() * 0.5), () => k.go('inputName'));
    //   })
    const answer = [["Alien"], ["Joo"]];
    addButton("1." + answer[0], vec2(width() * 0.4, height() * 0.8), () =>
      correct()
    );
    addButton("2." + answer[1], vec2(width() * 0.6, height() * 0.8), () =>
      wrong()
    );

    let score = 0;

    const correct = () => {
      debug.log("correct in");
      score++;
      debug.log("score: " + score);
    };

    const wrong = () => {
      debug.log("wrong in");
      k.go("lose");
    }
  });

  k.scene("lose", () => {
    add([text("Game over"), pos(center()), origin("center")]);
  });

  /*
  k.scene("quiz", () => {
    const levelConfigs = {
      width: 20,
      height: 20,
      "*": () => [sprite("asteroid"), area(), solid(), scale(0.03), "asteroid"],
    };
  
    const ufo = add([
      sprite("ufo"),
      pos(600, 300),
      scale(0.5),
      solid(),
      area(),
      "ufo",
    ]);
  
    const alienDialog = add([
      text("Hello Human", {
        size: 25,
      }),
      pos(100, 100),
      { value: 0 },
    ]);
  
    addLevel(map, levelConfigs);
  });
  */
  k.go("quiz");
}

Quiz();

export default Quiz;

