let face, palette, gui_head;
let renderer;
let button;

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, SVG);
  face = new Face();
  palette = new Colors();
  createGUI();
  randomizeFace();
}

// Resizes the canvas responsively
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  renderer.drawingContext.__clearCanvas();
  background(palette.backgroundColor);
  drawFace();
}

function drawFace() {
  fill(0)
  strokeWeight(palette.strokeWeight);
  fill(palette.hairColor);
  for (i = face.bunSize; i > 0; i = i - face.hairstr) {
    ellipse(width / 2 - face.hsx - face.bunx,
      height / 2 - face.buny,
      i * i, i * i);
    ellipse(width / 2 + face.hsx + face.bunx,
      height / 2 - face.buny,
      i * i, i * i);
  }
  for (i = face.bunSize; i > 0; i = i - face.hairstr) {
    ellipse(width / 2 - face.hsx - face.bunx,
      height / 2 - face.buny,
      i * i, i * i);
    ellipse(width / 2 + face.hsx + face.bunx,
      height / 2 - face.buny,
      i * i, i * i);
  }

  fill(palette.skinColor);
  bezier(width / 2 - face.hsx, height / 2 + face.hsy,
    width / 2 - face.hcp1x / 10, height / 2 - height / 7,
    width / 2 + face.hcp1x / 10, height / 2 - height / 7,
    width / 2 + face.hsx, height / 2 + face.hsy);

  bezier(width / 2 - face.hsx, height / 2 + face.hsy,
    width / 2 - face.hcp1x, height / 2 + face.hcp1y,
    width / 2 + face.hcp1x, height / 2 + face.hcp1y,
    width / 2 + face.hsx, height / 2 + face.hsy);


  fill(palette.cheeksColor);
  ellipse(width / 2 - face.hsx + face.chSpacing, height / 2 + face.chYpos, face.ch, face.ch);
  ellipse(width / 2 + face.hsx - face.chSpacing, height / 2 + face.chYpos, face.ch, face.ch);

  fill(255);
  ellipse(width / 2 - face.espac, height / 2 + face.eypos, face.ew, face.eh);
  ellipse(width / 2 + face.espac, height / 2 + face.eypos, face.ew, face.eh);

  fill(palette.eyeColor);
  ellipse(width / 2 - face.espac, height / 2 + face.eypos, face.p, face.p);
  ellipse(width / 2 + face.espac, height / 2 + face.eypos, face.p, face.p);

  makeHair();

  noFill();
  if (palette.strokeWeight < 1) {
    strokeWeight(5);
  }
  stroke((palette.skinColor[0] - 45), (palette.skinColor[1] - 45), (palette.skinColor[2] - 45));
  bezier(width / 2 - face.mouthX, height / 2 + face.mouthY,
    width / 2 - face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthX, height / 2 + face.mouthY);

  fill(palette.skinColor);
  bezier(width / 2 - face.noseX, height / 2 + face.noseY,
    width / 2 - face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseX, height / 2 + face.noseY);

  noFill();
  stroke(0);
  strokeWeight(palette.strokeWeight);
  bezier(width / 2 - face.mouthX, height / 2 + face.mouthY,
    width / 2 - face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthX, height / 2 + face.mouthY);

  bezier(width / 2 - face.noseX, height / 2 + face.noseY,
    width / 2 - face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseX, height / 2 + face.noseY);
}

function makeHair() {
  noFill();
  for (i = 0; i <= face.hairk; i = i + face.hairstr) {
    fill(palette.hairColor);
    if (i >= face.hairk - 1) {
      noFill();
    }
    bezier(width / 2 - face.hsx, height / 2 + i * face.hairl, width / 2 - face.hsx, height / 4 + i * i, width / 2, height / 2.5, width / 2, height / 2 - height / 8 + face.hairln);
    bezier(width / 2 + face.hsx, height / 2 + i * face.hairl, width / 2 + face.hsx, height / 4 + i * i, width / 2, height / 2.5, width / 2, height / 2 - height / 8 + face.hairln);
  }
}

function Face() {
  this.hsx = 150; // Bezier control point x1 
  this.hsy = 0; // Bezier control point y2 
  this.hcp1x = 120; // Bezier control point x2
  this.hcp1y = 250; // Bezier control point y2

  this.bunx = 0; // Buns x-position
  this.buny = 50; // Buns y-position
  this.bunSize = 10; // Bun height/width

  this.hairk = 15;
  this.hairstr = 1;
  this.hairl = 2;
  this.hairln = 14;

  this.espac = 50;
  this.eypos = 40;
  this.ew = 60;
  this.eh = 30;

  this.p = 30;

  this.chSpacing = 60;
  this.chYpos = 100;
  this.ch = 50;

  this.mouthX = 40;
  this.mouthY = 125;
  this.mouthCx = 250 / 4;
  this.mouthCy = 150;

  this.noseX = 20;
  this.noseY = 105;
  this.noseCx = 25;
  this.noseCy = 80;
}

function randomizeFace() {
  face.hsx = random(145, 400);
  face.hcp1x = random(0, 400);
  face.hcp1y = random(190, 400);

  face.buny = random(-face.hcp1y / 2, 120);
  face.bunx = random(-150, face.bunSize * 2);
  face.bunSize = random(6, 15);

  face.hairk = random(5, 15);
  face.hairstr = random(1.5, 5);
  face.hairl = random(-22, 33);

  face.espac = random(face.espac / 2, face.hsx - 30);
  face.eypos = random(0, face.hcp1y / 3.5);
  face.ew = random(10, 100);
  face.eh = face.ew - random(0, 80);

  face.p = random(face.eh / 4, face.eh / 1.5);

  face.chSpacing = random(40, 60);
  face.chYpos = random(face.hcp1y / 4, face.hcp1y / 2);
  face.ch = random(0, 65);

  face.mouthX = random(15, face.hcp1x / 3);
  face.mouthY = random(125, 150);
  face.mouthCx = random(250 / 6, 250 / 4);
  face.mouthCy = random(125, 160);

  face.noseX = random(10, 25);
  face.noseY - random(90, 140);
  face.noseCx = random(5, 120);
  face.noseCy = random(0, 125);

  palette.hairColor = [0, 0, 0, 255];
  palette.skinColor =  [255, 255, 255];
  palette.eyeColor = [0, 0, 0, 255];
  palette.cheeksColor = [255, 255, 255];
}

function Colors() {
  this.backgroundColor = [255, 255, 255];
  this.hairColor = [255, 255, 255];
  this.skinColor = [255, 255, 255];
  this.eyeColor = [255, 255, 255];
  this.cheeksColor = [255, 255, 255];
  this.strokeWeight = 1;
}

function createGUI() {
  let gui = new dat.GUI();

  let colorsMenu = gui.addFolder('Colors');
  colorsMenu.addColor(palette, 'backgroundColor').name("Background");
  colorsMenu.addColor(palette, 'skinColor').name("Skin Color");
  colorsMenu.addColor(palette, 'hairColor').name("Hair Color");
  colorsMenu.addColor(palette, 'eyeColor').name("Eye Color");
  colorsMenu.addColor(palette, 'cheeksColor').name("Cheeks Color");
  colorsMenu.add(palette, 'strokeWeight', 0, 10).step(1);

  let faceMenu = gui.addFolder('Face Shape');
  faceMenu.add(face, 'hsx', 0, 500).name("Forehead Width");
  faceMenu.add(face, 'hcp1x', 0, 500).name("Chin Width");
  faceMenu.add(face, 'hcp1y', -500, 500).name("Chin Height");

  let bunsMenu = gui.addFolder('Hair Buns');
  bunsMenu.add(face, 'bunx', -500, 500).name("Bun Spacing");
  bunsMenu.add(face, 'buny', -500, 500).name("Bun Y-Position");
  bunsMenu.add(face, 'bunSize', 0, 20).name("Bun Size");

  let hairMenu = gui.addFolder('Hair');
  hairMenu.add(face, 'hairk', 0, 25).name("Hair Fullness");
  hairMenu.add(face, 'hairstr', 0.1, 5).name("Strand Thickness");
  hairMenu.add(face, 'hairl', -500, 500).name("Hair Length");
  hairMenu.add(face, 'hairln', -500, 500).name("Hairline");

  let eyesMenu = gui.addFolder('Eyes');
  eyesMenu.add(face, 'espac', -500, 500).name("Eye Spacing");
  eyesMenu.add(face, 'eypos', -500, 500).name("Eyes Y-Position");
  eyesMenu.add(face, 'ew', 0, 100).name("Eye Width");
  eyesMenu.add(face, 'eh', 0, 100).name("Eye Height");
  eyesMenu.add(face, 'p', 0, 100).name("Pupils Size");

  let mouthMenu = gui.addFolder('Mouth');
  mouthMenu.add(face, 'mouthX', -500, 500).name("Mouth Width");
  mouthMenu.add(face, 'mouthY', -500, 500).name("Mouth Y-Position");
  mouthMenu.add(face, 'mouthCx', -500, 500).name("Cheekiness");
  mouthMenu.add(face, 'mouthCy', -500, 500).name("Smile Intensity");

  let noseMenu = gui.addFolder('Nose');
  noseMenu.add(face, 'noseX', 0, 250).name("Nose Base Width");
  noseMenu.add(face, 'noseY', -250, 250).name("Nose Y-Position");
  noseMenu.add(face, 'noseCx', 0, 250).name("Nose Width");
  noseMenu.add(face, 'noseCy', -250, 250).name("Nose Length");

  let cheeksMenu = gui.addFolder('Cheeks');
  cheeksMenu.add(face, 'chSpacing', 0, 500).name("Cheeks Spacing");
  cheeksMenu.add(face, 'chYpos', -500, 500).name("Cheeks Y-Position");
  cheeksMenu.add(face, 'ch', 0, 500).name("Cheeks Size");
}

function keyPressed() {
  if (key === 's') {
    save("my-beautiful-face.svg");
  }
}