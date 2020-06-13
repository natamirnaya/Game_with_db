let obs_on_screen = false;
let obs;
let check;
let robot;
let counter;
let game_state = 'start';
let robot_y = window.innerHeight / 2;

function define_sprite(sprite_obj, sprite_x, sprite_y) {
  sprite_img = loadImage(sprite_obj.image);
  sprite = createSprite(sprite_x, sprite_y);
  sprite.addImage(sprite_img);
  sprite.scale = sprite_obj.scale;
  switch (sprite_obj.collider) {
      case 'rectangle':
        sprite.setCollider(sprite_obj.collider, 0, 0, sprite_obj.width,sprite_obj.height);
        break;
      case 'circle':
        sprite.setCollider(sprite_obj.collider, 0, 0, sprite_obj.radius);
        break;
  }
  sprite.depth = sprite_obj.depth;
  return sprite;
}


function end_game(){
  
  background(end_title);
  fill(240,30,35);
  textFont('Gill Sans Nova');
  textSize(40);
  results_x = window.innerWidth / 2;
  results_y = window.innerHeight / 3;
  text(str(counter), results_x,results_y);

  showForm();
  
  game_state = 'game_over';
  robot.remove();
  obs.remove();
  check.remove();
  ost_over.play();
}

function add_point(){
  
  obs_on_screen = false;
  counter = counter + 1;
  obs.remove();
  check.remove();
}
  

function setup() {
  createCanvas(windowWidth, windowHeight);

  game_back = loadImage('assets/background_picture.jpg');
  end_title = loadImage('assets/end_picture.jpg');
  begin_title = loadImage('assets/start_picture.jpg');
  ost_jump = loadSound('assets/jump.mp3');
  ost_over = loadSound('assets/game_over.wav');
  
}

function draw() {
  
  if (game_state=='start'){
    background(begin_title);
    //fill(210,50,20);
    //textSize(30);
    //textFont('Comic Sans MS');
    //text('Press S to start', 20, 50);
    //fill(60,130,160);
    //textFont('Comic Sans MS');
    //textSize(20);
    //text('USE ARROW UP TO JUMP', 220, 292);
    robot_x = 50;
    if (keyIsPressed && key == 's'){
      game_state = 'game';
      background(game_back);
      robot = define_sprite(robot_spec, robot_x, robot_y);
      robot_speed = 0;
      counter = 0;
      obs_on_screen = false;
    }}
    
  if (game_state=='game'){
  background(game_back);
  fill(240,30,35);
  textSize(36);
  textFont('Gill Sans Nova');
  points_x = 0.8 * window.innerWidth;
  points_y = 0.125 * window.innerHeight;
  text('POINTS: ' + str(counter), points_x, points_y);
  robot.setVelocity(0, robot_speed);
  drawSprites();
  
  if (keyIsPressed===true && keyCode == UP_ARROW && robot.position.y==robot_y){
    robot_speed = -12;
    ost_jump.play();
  }
  
  if (robot.position.y<robot_y){
    robot_speed = robot_speed + 0.35;
  }
  
  if (robot.position.y>=robot_y && robot.previousPosition.y<robot_y){
    robot_speed = 0;
    robot.position.y=robot_y;
  }
  
  robot.setVelocity(0, robot_speed);
  
  if (obs_on_screen == true){
    obs.rotation += obs.getSpeed()*0.5;
    obs.overlap(robot, end_game);
    obs.overlap(check, add_point);
  }
  
  if (obs_on_screen == false){
    check = createSprite(0, 0, 1, window.innerHeight);
    check.shapeColor = color(0, 175, 240);
    obs_spec = random([obs_1_spec, obs_2_spec, obs_3_spec, obs_4_spec, obs_5_spec, obs_6_spec, obs_7_spec, obs_8_spec]);
    obs_x = window.innerWidth;
    obs_y = window.innerHeight / 2;
    obs = define_sprite(obs_spec, obs_x, obs_y);
    obs.setVelocity(-2.5 - counter/10, 0);
    obs_on_screen = true;
  }
    
  }
  
  if (game_state=='game_over'){
    
    
    
    
    if (keyIsPressed && key=='r'){
      document.location.reload(true);
      game_state = 'start';
    
    }
  }

} 


let robot_spec = {
    image: 'assets/mf_robot.png',
    scale: 0.23,
    collider: 'rectangle',
    width: 400, 
    height: 430,
    depth: 2
  };

let obs_1_spec = {
    image: 'assets/obs_1.png',
    scale: 0.19,
    collider: 'circle',
    radius: 200,
    depth: 1
  };

let obs_2_spec = {
    image: 'assets/obs_2.png',
    scale: 0.13,
    collider: 'circle',
    radius: 200,
    depth: 1
  };

let obs_3_spec = {
    image: 'assets/obs_3.png',
    scale: 0.23,
    collider: 'rectangle',
    width: 120, 
    height: 198,
    depth: 1
  };

let obs_4_spec = {
    image: 'assets/obs_4.png',
    scale: 0.23,
    collider: 'rectangle',
    width: 137, 
    height: 195
  };

let obs_5_spec = {
    image: 'assets/obs_5.png',
    scale: 0.15,
    collider: 'circle',
    radius: 62,
    depth: 1
  };

let obs_6_spec = {
    image: 'assets/obs_6.png',
    scale: 0.15,
    collider: 'circle',
    radius: 112,
    depth: 1
  };

let obs_7_spec = {
    image: 'assets/obs_7.png',
    scale: 0.23,
    collider: 'rectangle',
    width: 130, 
    height: 195,
    depth: 1
  };

let obs_8_spec = {
    image: 'assets/obs_8.png',
    scale: 0.15,
    collider: 'circle',
    radius: 198,
    depth: 1
  };