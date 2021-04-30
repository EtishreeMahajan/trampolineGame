var trampoline, trampolineImg;
var boy, boyImg, boyGroup;
var bgImg, bg;
var score = 0;
var life = 0;
var line;

function preload() {
  trampolineImg = loadImage("asserts/trampoline.png");
  boyImg = loadImage("asserts/boy.png");
  bgImg = loadImage("asserts/bg.jpg");
}

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 50);

  line = createSprite(windowWidth / 2 - 50, windowHeight / 2 + 350, windowWidth, 1);

  bg = createSprite(windowWidth/2,windowHeight/2,50,50);
  bg.addImage("bg",bgImg);
  bg.scale = 4;

  trampoline = createSprite(windowWidth / 2 - 50, windowHeight / 2 + 250, 50, 50);
  trampoline.addImage("trmpo", trampolineImg);
  trampoline.scale = 0.5;
  trampoline.debug = false;
  trampoline.setCollider("rectangle", 0, -120, 650, 5);

  boyGroup = new Group();
}

function draw() {
  background(0);

  if (keyDown("right")) {
    trampoline.velocityX = 5;
  }

  if (keyDown("left")) {
    trampoline.velocityX = -5;
  }

  if (trampoline.isTouching(boyGroup)) {
    score += 1;
    boy.destroy();
  }

  if (boyGroup.isTouching(line)) {
    life += 1;
  }

  spawnBoy();

  drawSprites();

  if (life === 5) {
    textSize(25);
    fill(0);
    text("Sorry!You Loose Your Life", windowWidth / 2 - 150, windowHeight / 2 - 150);
    boyGroup.destroy();
    trampoline.destroy();
  }

  if (score === 250) {
    textSize(25);
    fill(0);
    text("Congrats!You Have Won The Game", windowWidth / 2 - 200, windowHeight / 2 - 50);
    boyGroup.destroy();
    trampoline.destroy();
  }

  textSize(25);
  fill(0);
  text("Score :- " + score, windowWidth / 5 - 360, windowHeight / 6 - 115);
  text("Life :- " + life, windowWidth / 2 + 770, windowHeight / 6 - 115);
  text("Press Right And Left Arrow Key To Move The Trampoline ", windowWidth / 2 - 325, windowHeight / 2 - 395);
  text("Score 250 Ponits To Win The Game", windowWidth / 3 + 100, windowHeight / 6 - 55);
  text("If You Loose Your 5 Life You Will Loose The Game", windowWidth / 3 + 8, windowHeight / 8 - 50);

}

function spawnBoy() {
  if (frameCount % 250 === 0) {
    boy = createSprite(windowWidth + 300, 0, 50, 60);
    boy.x = Math.round(random(windowWidth, windowHeight));
    boy.addImage("boy", boyImg);
    boy.scale = 0.5;
    boy.velocityY = 3;
    boy.debug = false;
    boy.setCollider("rectangle", 0, 180, 250, 2.5);
    boy.lifetime = 450;
    boyGroup.add(boy);
    boy.depth = trampoline.depth;
    boy.depth = boy.depth + 1;

  }
}