"use strict";

const fs = require("fs");


test("every logo has a PNG equivalent", () => {
  const LOGOS = fs.readdirSync(__dirname + "/../public/img/logos");
  LOGOS.filter(file => !file.endsWith(".png"))
       .forEach(file => {
         const pngFile = file.replace(/\.(.*)$/, ".png");
         expect(LOGOS).toContain(pngFile);
       });
});
