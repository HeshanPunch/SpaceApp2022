// Simple dialogues
import k from "./kaboom";
import {alien1, alien2, alien3, alien4, alien5} from "./items"
import Game from "./satellite";

let correctQuiz = false;

function Quiz(){

  loadSprite("alien1", alien1);
  loadSprite("alien2", alien2);
  loadSprite("alien3", alien3);
  loadSprite("alien4", alien4);
  loadSprite("alien5", alien5);

  k.scene("quiz1", () => {
    // Define the dialogue data
    const dialogs = [
      ["alien1", "Quiz time!"],
      ["alien1", "Q. Cascade, Smallsat and Ionospheric Polar Explorer (CASSIOPE) was launched to study the ionosphere, who operates CASSIOPE?"],
    ];

  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 100, 120, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 380),
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
    sprite("alien1"),
    scale(0.4),
    origin("center"),
    rotate(0),
    pos(center().sub(0, 200))
  ]);

  avatar.onUpdate(() => {
    // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
    avatar.angle += 100 * dt()
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
      scale(3),
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
          btn.scale = vec2(3.2);
        } else {
          btn.scale = vec2(3);
          btn.color = rgb();
        }
      });
    };
    
    const answer = [["1. NASA"], ["2. University of Calgary"]];
    addButton(answer[0], vec2(640, 500), () =>
      wrong()
    );
    addButton(answer[1], vec2(640, 600), () =>
      correct()
    );

    const correct = () => {
      correctQuiz = true;
      Game();
    };

    const wrong = () => {
      correctQuiz = false;
      Game();
    }
  });
  
  
  k.go("quiz1");
}
  

//quiz2
  k.scene("quiz2", () => {
    // Define the dialogue data
    const dialogs = [
      ["alien2", "Quiz time!"],
      ["alien2", "Q. Satellites are built with some resistance to radiation. This determines how sensitive they are to space weather. What could happen when the protection doesn't stand up to extreme space weather phenomenon?"],
    ];

  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 100, 220, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 380),
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
    sprite("alien2"),
    scale(0.3),
    origin("center"),
    rotate(0),
    pos(center().sub(0, 230))
  ]);

  avatar.onUpdate(() => {
    // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
    avatar.angle += 100 * dt()
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
      scale(3),
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
          btn.scale = vec2(3.2);
        } else {
          btn.scale = vec2(3);
          btn.color = rgb();
        }
      });
    };
    
    const answer = [[`1. Satellite's computers can restart,
    resulting in a loss of data!`], 
    [`2. Satellite becomes vulnerable 
    to alien plasma-beam technology!`]];
    addButton(answer[0], vec2(640, 500), () =>
      correct()
    );
    addButton(answer[1], vec2(640, 600), () =>
      wrong()
    );


    const correct = () => {
      correctQuiz = true;
      Game();
    };

    const wrong = () => {
      correctQuiz = false;
      Game();
    }
  });
  
  
  k.go("quiz2");

  

//quiz3
  k.scene("quiz3", () => {
    // Define the dialogue data
    const dialogs = [
      ["alien3", "Quiz time!"],
      ["alien3", "Q. The Canadian CASSIOPE satellite carries the Enhanced Polar Outflow Probe (e-POP) suite of scientific instruments to study the ionosphere. What is the ionosphere?"]
    ]
  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 100, 185, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 380),
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
    sprite("alien3"),
    scale(0.3),
    origin("center"),
    rotate(0),
    pos(center().sub(0, 230))
  ]);

  avatar.onUpdate(() => {
    // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
    avatar.angle += 100 * dt()
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
      scale(2),
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
          btn.scale = vec2(2.2);
        } else {
          btn.scale = vec2(2);
          btn.color = rgb();
        }
      });
    };
    
    const answer = [[`1. The ionosphere stretches roughly 50 to 400 miles above Earth's surface, 
    right at the edge of space. 
    The ionosphere forms the boundary between Earth's lower atmosphere 
    —where we live and breathe — 
    and the vacuum of space.
    resulting in a loss of data!`], 
    [`2. The "ionosphere" is a trendy restaurant where aliens species 
    hang out after a busy week of travel. 
    It has been popular for over 2000 years!
`]];
    addButton(answer[0], vec2(640, 510), () =>
      correct()
    );
    addButton(answer[1], vec2(640, 650), () =>
      wrong()
    );


    const correct = () => {
      correctQuiz = true;
      Game();
    };

    const wrong = () => {
      correctQuiz = false;
      Game();
    }
  });
  
  
  k.go("quiz3");

  //quiz4
  k.scene("quiz4", () => {
    // Define the dialogue data
    const dialogs = [
      ["alien4", "Quiz time!"],
      ["alien4", `Q. 
      "Perigee" is the point at which a satellite is nearest to the earth, on the other hand, "Apogee" is the point at which a satellite is furthest from earth. Can you guess CASSIOPE's approximate Perigee and Apogee?`]]
  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 100, 185, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 380),
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
    sprite("alien4"),
    scale(0.3),
    origin("center"),
    rotate(0),
    pos(center().sub(0, 230))
  ]);

  avatar.onUpdate(() => {
    // .angle is a property provided by rotate() component, here we're incrementing the angle by 120 degrees per second, dt() is the time elapsed since last frame in seconds
    avatar.angle += 100 * dt()
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
      scale(2),
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
          btn.scale = vec2(2.2);
        } else {
          btn.scale = vec2(2);
          btn.color = rgb();
        }
      });
    };
    
    const answer = [[`1. The ionosphere stretches roughly 50 to 400 miles above Earth's surface, 
    right at the edge of space. 
    The ionosphere forms the boundary between Earth's lower atmosphere 
    —where we live and breathe — 
    and the vacuum of space.
    resulting in a loss of data!`], 
    [`2. The "ionosphere" is a trendy restaurant where aliens species 
    hang out after a busy week of travel. 
    It has been popular for over 2000 years!
`]];
    addButton(answer[0], vec2(640, 510), () =>
      correct()
    );
    addButton(answer[1], vec2(640, 650), () =>
      wrong()
    );


    const correct = () => {
      correctQuiz = true;
      Game();
    };

    const wrong = () => {
      correctQuiz = false;
      Game();
    }
  });
  
  
  k.go("quiz4");

  

  k.scene("lose", () => {
    add([text("Game over"), pos(center()), origin("center")]);
  });

export { Quiz, correctQuiz } ;

