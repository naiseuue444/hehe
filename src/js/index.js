//jshint esversion:8

import { initLockscreen } from "./lockscreen.js";
import { animate } from "./animation.js";

/******************************************************* SETUP ************************************************************/

initLockscreen(() => {
  animate();
});
