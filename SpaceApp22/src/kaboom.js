import kaboom from "kaboom";

// initialize context
export const  k = kaboom({
  font: "sinko",
  // background: [11, 16, 38],
  background: [12, 21, 55],
  fullscreen: true,
  canvas: document.querySelector("gamecanvas"),
  // width: 1280,
  // height: 800,
  scale: 1,
});

export default k;