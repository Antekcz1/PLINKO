var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

const engine = Engine.create();

const render = Render.create({
    element: document.getElementById('can'),
    engine: engine
});


function collision(event) {
  // Iterate through all pairs of collision events
  for (let i = 0; i < event.pairs.length; i++) {
      const pair = event.pairs[i];

      // Check if the collision involves the disk and the ground
      if (
          (pair.bodyA === ground && pair.bodyB === disk[count - 1]) ||
          (pair.bodyA === disk[count - 1] && pair.bodyB === ground)
      ) {
          // Perform the action when the disk hits the ground
          console.log("Disk hit the ground!");

          // Set the collision variables
          collisionOccurred = true;
          collisionEvent = pair;

          // Update the displayed options immediately
          updateOptions();

          // Uncomment the line below to disable the special event after it occurs
          // specialEvent1.isEnabled = false;
      }
  }
}

// Set up the collision event handler
Events.on(engine, 'collisionStart', collision);


var specialEvent = true;

Events.on(engine, 'collisionStart', collision);



const fOptions = {
    isStatic: true,
}
const flanges = [
  
    Bodies.polygon(45,150,3,20,fOptions),
    Bodies.polygon(100,250,3,20,fOptions),
    Bodies.polygon(60,350,3,20,fOptions),
    Bodies.polygon(100,450,3,20,fOptions),

    Bodies.polygon(150,150,3,20,fOptions),
    Bodies.polygon(200,250,3,20,fOptions),
    Bodies.polygon(150,350,3,20,fOptions),
    Bodies.polygon(200,450,3,20,fOptions),

    Bodies.polygon(250,150,3,20,fOptions),
    Bodies.polygon(300,250,3,20,fOptions),
    Bodies.polygon(250,350,3,20,fOptions),
    Bodies.polygon(300,450,3,20,fOptions),
 
    Bodies.polygon(350,150,3,20,fOptions),
    Bodies.polygon(400,250,3,20,fOptions),
    Bodies.polygon(350,350,3,20,fOptions),
    Bodies.polygon(400,450,3,20,fOptions),

    Bodies.polygon(450,150,3,20,fOptions),
    Bodies.polygon(500,250,3,20,fOptions),
    Bodies.polygon(450,350,3,20,fOptions),
    Bodies.polygon(500,450,3,20,fOptions),

    Bodies.polygon(550,150,3,20,fOptions),
    Bodies.polygon(600,250,3,20,fOptions),
    Bodies.polygon(550,350,3,20,fOptions),
    Bodies.polygon(600,450,3,20,fOptions),
    
    Bodies.polygon(650,150,3,20,fOptions),
    Bodies.polygon(700,250,3,20,fOptions),
    Bodies.polygon(650,350,3,20,fOptions),
    Bodies.polygon(700,450,3,20,fOptions),
   
    Bodies.polygon(763,150,3,20,fOptions),
    Bodies.polygon(740,350,3,20,fOptions),
];
for (i = 0; i < flanges.length; i++){
    World.add(engine.world,[flanges[i]])
    Body.setAngle(flanges[i], 16.23)
}
//kubły
const cOptions = {
    isStatic:true
}
const catches = [
    Bodies.rectangle(10,565,2,40,cOptions)
];
xasx = 245;
for (v = 0; v < 20; v++){
    catches.push(Bodies.rectangle(xasx,565,2,40,cOptions))
    World.add(engine.world,[catches[v]])
    xasx = xasx + 183;
}
//piłka
let disk = [];
let count = 0;
const dOptions = {
    friction: .2,
    restitution:1
}
function addD() {
    disk.push(Bodies.circle(event.offsetX, 0, 20,dOptions ))
    World.add(engine.world,[disk[count]])
    count++
}


const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const leftWall = Bodies.rectangle(0, 305,2 , 810, { isStatic: true });
const righttWall = Bodies.rectangle(800, 305,2 , 810, { isStatic: true });
const sky = Bodies.rectangle(400, 0,810,2, { isStatic: true });

World.add(engine.world, [sky,righttWall,leftWall,ground]);


Engine.run(engine);

Render.run(render);