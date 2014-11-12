var canvas = document.getElementById('thecanvas'),
    ctx = canvas.getContext('2d'),
    state = {
      time : 0,
      objects : [
        {
          style : "yellow",
          pos   : { x : getRandomX(), y : getRandomY() },
          vel   : { x : 4,   y : -10 }
        }
      ]
    },
     RADIUS = 10,
  
     GRAVITY = 0.001,
     KICK_AMOUNT = 20,
     KICK_INTERVAL = 10000,
     RUN_INTERVAL = 40,
     BOUNCINESS = 1,

     colors = [ "red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "white" ];


function getRandomY () {
  return Math.floor( Math.random()*(canvas.height - RADIUS - 1));
}

function getRandomX () {
  return Math.floor( Math.random()* (canvas.width - RADIUS - 1) );
}

function bound(obj) {
  var bottom = canvas.height - RADIUS - 1,
      top    = 0 + RADIUS,
      left   = 0 + RADIUS,
      right  = canvas.width - RADIUS - 1;



  if (obj.pos.y + RADIUS >= bottom) {
    obj.pos.y = bottom;
    obj.vel.y = 0 - Math.floor(obj.vel.y / (1 / BOUNCINESS) );
  } else {
    gravity(obj);
  }

  if (obj.pos.y < top) {
    obj.pos.y = top;
    obj.vel.y = Math.floor(0 - obj.vel.y);
  }

  if (obj.pos.x >= right) {
    obj.pos.x = right;
    obj.vel.x = 0 - Math.floor(obj.vel.x / 1.5);
  }
  
  if (obj.pos.x < left) {
    obj.pos.x = left;
    obj.vel.x = Math.floor(0 - obj.vel.x);
  }



}

function gravity(obj) {
  obj.vel.y += GRAVITY * state.time;
}

function move(obj) {
  obj.pos.x += obj.vel.x;
  obj.pos.y += obj.vel.y;
}

function clear() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw(obj) {
  ctx.beginPath();
  ctx.arc(obj.pos.x, obj.pos.y, RADIUS, 0, 2 * Math.PI, false);
  ctx.fillStyle = obj.style;
  ctx.fill();
}

function render() {
  clear();

  for (var i=0; i<state.objects.length; i++) {
    draw(state.objects[i]);
  }

}

function go () {
  setInterval(run, RUN_INTERVAL);
  setInterval(kick, KICK_INTERVAL);

}

function run () {

  for (var i=0; i<state.objects.length; i++) {
    move(state.objects[i]);
    bound(state.objects[i]);
    //console.table(state.objects[i]);
  }

  render();

  state.time++;

}

function getRand() {
    var direction = Math.random() > 0.5 ? 1 : -1,
        amount    = Math.floor(Math.random()*KICK_AMOUNT)+10;

    console.log(direction * amount);
    return direction * amount;

}

function kick () {
  for (var i=0; i<state.objects.length; i++) {
    state.objects[i].vel.x += getRand();
    state.objects[i].vel.y -= Math.abs(getRand());

  }
    state.objects.push(JSON.parse(JSON.stringify(state.objects[state.objects.length-1])));
    state.objects[state.objects.length-1].style = colors[Math.floor(Math.random()*colors.length)];
}

render();
