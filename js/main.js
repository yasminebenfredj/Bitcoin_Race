import Gift from "./Gift.js";
let Score ;

let canvas;
let engine;
let scene;
let score = 0;


let inputStates = {};

window.onload = startGame;

function startGame() {
    Score = document.querySelector("#score");
    canvas = document.querySelector("#myCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = createScene();
    modifySettings();


    engine.runRenderLoop(() => {
        updatescore(score);
        let car = scene.getMeshByName("myCar");
        
        let deltaTime = engine.getDeltaTime(); 

        if(car) {
            car.move();
        }


        if(scene.gifts) {
            for(var i = 0 ; i < scene.gifts.length ; i++) {
                scene.gifts[i].Gift.move(scene);
            }
        }    

        scene.render();
    });
}

function updatescore(l){
    Score.innerHTML = "";
  
    let txt = " <b> Score " + l + "</b>" ;
    Score.innerHTML += txt;
  }

function createScene() {
    let scene = new BABYLON.Scene(engine);

    //var gravityVector = new BABYLON.Vector3(0,-9.81,0);
    //var physicsPlugin = new BABYLON.CannonJSPlugin();

    //scene.enablePhysics(gravityVector, physicsPlugin);
    let ground = createGround(scene);
    let freeCamera = createFreeCamera(scene);

    createTank(scene, ground);
    let tank = scene.getMeshByName("heroTank");

    // second parameter is the target to follow

    //let followCamera = createFollowCamera(scene, tank);
    //scene.activeCamera = freeCamera;

    createLights(scene);
    createSky(scene);

    createHeroGift(scene);
    creatTree(scene);
    createwall(scene);
    //creatTarget(scene);

   return scene;
}

function createGround(scene) {
    
    const groundOptions = { width:1000, height:500, subdivisions:100, minHeight:0, maxHeight:15, onReady: onGroundCreated};
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("terrain", 'images/hmap3.jpg', groundOptions, scene); 
    //const ground = BABYLON.MeshBuilder.CreateGround("terrain", groundOptions, scene); 


    function onGroundCreated() {
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        //groundMaterial.mixTexture = new BABYLON.Texture("images/textures/mixMap.png", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("images/circuit3.jpg");
        //groundMaterial.diffuseTexture1 = new BABYLON.Texture("images/textures/floor.png");

        // Bump textures according to the previously set diffuse textures
        //groundMaterial.bumpTexture = new BABYLON.Texture("images/textures/grassn.png", scene);
       
        // Rescale textures according to the terrain
        //groundMaterial.diffuseTexture.uScale = groundMaterial.diffuseTexture.vScale = 50;

        ground.material = groundMaterial;
        // to be taken into account by collision detection
        ground.checkCollisions = true;
        //groundMaterial.wireframe=true;
    }
    return ground;

}

function createSky(scene){
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1500}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("models/sky/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
}





function createwall(scene) {
    scene.walls = [];
    for (let index = -245; index < 245; index = index + 20) {

            //scene is optional and defaults to the current scene
            scene.walls[index] = BABYLON.Mesh.CreateBox("cube", 15, scene);
            scene.walls[index].position.y = 20;
            scene.walls[index].position.x = 495;
            scene.walls[index].position.z = index;
            const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
            wallMaterial.emissiveTexture = new BABYLON.Texture("images/wall-texture.jpg");
            wallMaterial.bumpTexture = new BABYLON.Texture("images/wall-bump-map.jpg");
            wallMaterial.specularTexture = new BABYLON.Texture("images/wall-map.jpg");

            scene.walls[index].material = wallMaterial;
            scene.walls[index].checkCollisions = true;
            //cube.position = new BABYLON.Vector3(4, 4, 4);
        }
    scene.walls1 = [];
    for (let index = -245; index < 245; index = index + 20) {

        //scene is optional and defaults to the current scene
        scene.walls1[index] = BABYLON.Mesh.CreateBox("cube", 15, scene);
        scene.walls1[index].position.y = 20;
        scene.walls1[index].position.x = -495;
        scene.walls1[index].position.z = index;
        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
        wallMaterial.emissiveTexture = new BABYLON.Texture("images/wall-texture.jpg");
        wallMaterial.bumpTexture = new BABYLON.Texture("images/wall-bump-map.jpg");
        wallMaterial.specularTexture = new BABYLON.Texture("images/wall-map.jpg");

        scene.walls1[index].material = wallMaterial;
        scene.walls1[index].checkCollisions = true;
    }

    scene.walls2 = [];
    for (let index = -495; index < 495; index = index + 20) {

        //scene is optional and defaults to the current scene
        scene.walls2[index] = BABYLON.Mesh.CreateBox("cube", 15, scene);
        scene.walls2[index].position.y = 20;
        scene.walls2[index].position.x = index;
        scene.walls2[index].position.z = 245 ;
        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
        wallMaterial.emissiveTexture = new BABYLON.Texture("images/wall-texture.jpg");
        wallMaterial.bumpTexture = new BABYLON.Texture("images/wall-bump-map.jpg");
        wallMaterial.specularTexture = new BABYLON.Texture("images/wall-map.jpg");

        scene.walls2[index].material = wallMaterial;
        scene.walls2[index].checkCollisions = true;
    }

    scene.walls3 = [];
    for (let index = -495; index < 495; index = index + 20) {

        //scene is optional and defaults to the current scene
        scene.walls3[index] = BABYLON.Mesh.CreateBox("cube", 15, scene);
        scene.walls3[index].position.y = 20;
        scene.walls3[index].position.x = index;
        scene.walls3[index].position.z = -245;
        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
        wallMaterial.emissiveTexture = new BABYLON.Texture("images/wall-texture.jpg");
        wallMaterial.bumpTexture = new BABYLON.Texture("images/wall-bump-map.jpg");
        wallMaterial.specularTexture = new BABYLON.Texture("images/wall-map.jpg");

        scene.walls3[index].material = wallMaterial;
        scene.walls3[index].checkCollisions = true;
    }
}

function createLights(scene) {
    // i.e sun light with all light rays parallels, the vector is the direction.
    let light0 = new BABYLON.DirectionalLight("dir0", new BABYLON.Vector3(-1, -1, 0), scene);
    let light1 = new BABYLON.PointLight("dir1", new BABYLON.Vector3(-1, 15, -1), scene);
    let light2 = new BABYLON.HemisphericLight("dir2", new BABYLON.Vector3(0, 3, 0), scene);
    light0.intensity = 0.3;
    light1.intensity = 0.2;
    light2.intensity = 0.5;

}

function createFreeCamera(scene) {
    let camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 50, 0), scene);
    camera.attachControl(canvas);
    // prevent camera to cross ground
    camera.checkCollisions = true; 
    // avoid flying with the camera

    // Add extra keys for camera movements
    // Need the ascii code of the extra key(s). We use a string method here to get the ascii code
    camera.keysUp.push('z'.charCodeAt(0));
    camera.keysDown.push('s'.charCodeAt(0));
    camera.keysLeft.push('q'.charCodeAt(0));
    camera.keysRight.push('d'.charCodeAt(0));
    camera.keysUp.push('Z'.charCodeAt(0));
    camera.keysDown.push('S'.charCodeAt(0));
    camera.keysLeft.push('Q'.charCodeAt(0));
    camera.keysRight.push('D'.charCodeAt(0));

    return camera;
}

function createFollowCamera(scene, target) {
    let camera = new BABYLON.FollowCamera("tankFollowCamera", target.position, scene, target);

    camera.radius = 60; // how far from the object to follow
	camera.heightOffset = 14; // how high above the object to place the camera
	camera.rotationOffset = 0; // the viewing angle
	camera.cameraAcceleration = .2; // how fast to move
	camera.maxCameraSpeed = 5; // speed limit

    return camera;
}

let zMovement = 5;


function createMont(scene){
    BABYLON.SceneLoader.ImportMesh("", "models/Tree/", "tree1.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
        let mont = newMeshes[0];
        let montMaterial = new BABYLON.StandardMaterial("tankMaterial", scene);
        montMaterial.diffuseTexture = new BABYLON.Texture("models/Tree/TreeTexture.png");
        montMaterial.emissiveTexture = new BABYLON.Texture("models/TreeStackA_baked_EMIT.jpg");
        mont.material = montMaterial;
    
        // By default the box/tank is in 0, 0, 0, let's change that...
        mont.position.y = 20;

        mont.scaling = new BABYLON.Vector3(5,5,5);
        mont.frontVector = new BABYLON.Vector3(0, 0, 1);
        return mont;

    });
}

function createTank(scene, ground) {
    let tank;
    BABYLON.SceneLoader.ImportMesh("", "models/tank/", "CartoonTank.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
    tank= newMeshes[0];
    tank.name = "myCar";
    let tankMaterial = new BABYLON.StandardMaterial("tankMaterial", scene);
    tankMaterial.diffuseTexture = new BABYLON.Texture("models/tank/tank_palette_red.png");
    tankMaterial.emissiveTexture = new BABYLON.Texture("models/tank/tank_palette_red.png");
    tank.material = tankMaterial;
	tank.rotationOffset = 90; // the viewing angle

    // By default the box/tank is in 0, 0, 0, let's change that...
    tank.position.y = 16;

    tank.speed = 1;
    tank.scaling = new BABYLON.Vector3(2,1,1);
    tank.frontVector = new BABYLON.Vector3(0, 0, 1);
    tank.applyGravity = true;
    tank.checkCollisions = false;
    //tank.showBoundingBox = true;

    let followCamera = createFollowCamera(scene, tank);
    scene.activeCamera = followCamera;


    tank.move = () => {
        //tank.position.z += -1; // speed should be in unit/s, and depends on
                                 // deltaTime !

        // if we want to move while taking into account collision detections
        // collision uses by default "ellipsoids"

        let yMovement = 0;
       
        if (tank.position.y > 2) {
            zMovement = 0;
            yMovement = -2;
        } 
        //tank.moveWithCollisions(new BABYLON.Vector3(0, yMovement, zMovement));

        if(inputStates.up) {
            //tank.moveWithCollisions(new BABYLON.Vector3(0, 0, 1*tank.speed));
            tank.moveWithCollisions(tank.frontVector.multiplyByFloats(-tank.speed, -tank.speed, -tank.speed));
        }    
        if(inputStates.down) {
            //tank.moveWithCollisions(new BABYLON.Vector3(0, 0, -1*tank.speed));
            tank.moveWithCollisions(tank.frontVector.multiplyByFloats(tank.speed, tank.speed, tank.speed));

        }    
        if(inputStates.left) {
            //tank.moveWithCollisions(new BABYLON.Vector3(-1*tank.speed, 0, 0));
            tank.rotation.y -= 0.02;
            tank.frontVector = new BABYLON.Vector3(Math.sin(tank.rotation.y), 0, Math.cos(tank.rotation.y));
        }    
        if(inputStates.right) {
            //tank.moveWithCollisions(new BABYLON.Vector3(1*tank.speed, 0, 0));
            tank.rotation.y += 0.02;
            tank.frontVector = new BABYLON.Vector3(Math.sin(tank.rotation.y), 0, Math.cos(tank.rotation.y));
        }

        tank.actionManager = new BABYLON.ActionManager(scene);

        if(scene.gifts) {

            var boundInfo = tank.getBoundingInfo();
            let max = boundInfo.maximum;
            let min = boundInfo.minimum;
            let diameter = 2 * boundInfo.boundingSphere.radius;

            scene.gifts.forEach(gift => {                
                tank.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
                    {trigger : BABYLON.ActionManager.OnIntersectionEnterTrigger,
                    parameter : gift},            
                    () => {
                        score+= 10;
                        gift.dispose();
                    }
                ));

            });
        }  


    }

    tank.getPos = () => {
        return tank.position;
    }

    });
    return tank;

}

function creatTree(scene)
{
    for (let index = 0; index < 10; index++) {
        let x = Math.floor(Math.random()*500 - 250);
        let z = Math.floor(Math.random()*500 - 250);
        BABYLON.SceneLoader.ImportMesh("", "models/Tree/", "SmallTreeWithLeave.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
            let tree= newMeshes[0];
            let treeMaterial = new BABYLON.StandardMaterial("Tree", scene);
            treeMaterial.diffuseTexture = new BABYLON.Texture("models/Tree/TreeTexture.png");
            treeMaterial.emissiveTexture = new BABYLON.Texture("models/Tree/TreeTexture.png");
            tree.material = treeMaterial;
            
                // By default the box/tank is in 0, 0, 0, let's change that...
            tree.position.y = 25;
            tree.position.x = x;
            tree.position.z = z;
        
            tree.scaling = new BABYLON.Vector3(2,2,2);
            tree.frontVector = new BABYLON.Vector3(0, 3, 1);
            tree.applyGravity = true;
            tree.checkCollisions = false;
            return tree;
            });
        
    }

}
function creatTarget(scene)
{
    for (let index = 0; index < 10; index++) {

        let x = Math.floor(Math.random()*250 - 250);
        let z = Math.floor(Math.random()*250 - 250);
        BABYLON.SceneLoader.ImportMesh("", "models/Dragon/", "dragon2.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
            let target= newMeshes[0];
            target.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
            target.frontVector = new BABYLON.Vector3(5, 5, 5);
            let targetMaterial = new BABYLON.StandardMaterial("Tree", scene);
            targetMaterial.diffuseTexture = new BABYLON.Texture("models/Tree/TreeTexture.png");
            targetMaterial.emissiveTexture = new BABYLON.Texture("models/Tree/TreeTexture.png");
            target.material = targetMaterial;
            
                // By default the box/tank is in 0, 0, 0, let's change that...
            target.position.y = 25;
            target.position.x = x;
            target.position.z = z;
        

            target.applyGravity = true;
            target.checkCollisions = false;
            target.size = 1000;
            return target;
            });
        
    }

}

function createHeroGift(scene) {
    // load the Dude 3D animated model
     // name, folder, skeleton name 
     BABYLON.SceneLoader.ImportMesh("BITCOIN", "models/gift/", "gift.babylon", scene,  (newMeshes, particleSystems, skeletons) => {
         let myGift = newMeshes[0];

         let giftMaterial = new BABYLON.StandardMaterial("Tree", scene);
         giftMaterial.diffuseTexture = new BABYLON.Texture("models/gift/BTC_Albedo.png");
         myGift.material = giftMaterial;

         myGift.position = new BABYLON.Vector3(2, 2, 2);  
         myGift.position.y = -20;
 
         myGift.name = "myGift";
         myGift.applyGravity = true;
 
         // params = id, speed, scaling, scene
         let hero = new Gift(myGift, -1, 0.1, 3, scene);

         // make clones
         scene.gifts = [];
         
         for(let i = 0; i < 50; i++) {
             scene.gifts[i] = doClone(myGift, skeletons, i);
             scene.gifts[i].applyGravity = true;
             scene.gifts[i].position.y = 20;

             // Create instance with move method etc.
             // params = speed, scaling, scene
             var temp = new Gift(scene.gifts[i], i, 0.3, 0.2, scene);
         }
 
     });
 }


function doClone(originalMesh, skeletons, id) {
    let myClone;
    let xrand = Math.floor(Math.random()*500 - 250);
    let zrand = Math.floor(Math.random()*500 - 250);

    myClone = originalMesh.clone("clone_" + id);
    myClone.position = new BABYLON.Vector3(xrand, 0, zrand);

    if(!skeletons) return myClone;

    // The mesh has at least one skeleton
    if(!originalMesh.getChildren()) {
        myClone.skeleton = skeletons[0].clone("clone_" + id + "_skeleton");
        return myClone;
    } else {
        if(skeletons.length === 1) {
            // the skeleton controls/animates all children, like in the Dude model
            let clonedSkeleton = skeletons[0].clone("clone_" + id + "_skeleton");
            myClone.skeleton = clonedSkeleton;
            let nbChildren = myClone.getChildren().length;

            for(let i = 0; i < nbChildren;  i++) {
                myClone.getChildren()[i].skeleton = clonedSkeleton
            }
            return myClone;
        } else if(skeletons.length === originalMesh.getChildren().length) {
            // each child has its own skeleton
            for(let i = 0; i < myClone.getChildren().length;  i++) {
                myClone.getChildren()[i].skeleton() = skeletons[i].clone("clone_" + id + "_skeleton_" + i);
            }
            return myClone;
        }
    }

    return myClone;
}

window.addEventListener("resize", () => {
    engine.resize()
});

function modifySettings() {
    // as soon as we click on the game window, the mouse pointer is "locked"
    // you will have to press ESC to unlock it
    scene.onPointerDown = () => {
        if(!scene.alreadyLocked) {
            console.log("requesting pointer lock");
            canvas.requestPointerLock();
        } else {
            console.log("Pointer already locked");
        }
    }

    document.addEventListener("pointerlockchange", () => {
        let element = document.pointerLockElement || null;
        if(element) {
            // lets create a custom attribute
            scene.alreadyLocked = true;
        } else {
            scene.alreadyLocked = false;
        }
    })

    // key listeners for the tank
    inputStates.left = false;
    inputStates.right = false;
    inputStates.up = false;
    inputStates.down = false;
    inputStates.space = false;
    
    //add the listener to the main, window object, and update the states
    window.addEventListener('keydown', (event) => {
        if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
           inputStates.left = true;
        } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
           inputStates.up = true;
        } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
           inputStates.right = true;
        } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
           inputStates.down = true;
        }  else if (event.key === " ") {
           inputStates.space = true;
        }
    }, false);

    //if the key will be released, change the states object 
    window.addEventListener('keyup', (event) => {
        if ((event.key === "ArrowLeft") || (event.key === "q")|| (event.key === "Q")) {
           inputStates.left = false;
        } else if ((event.key === "ArrowUp") || (event.key === "z")|| (event.key === "Z")){
           inputStates.up = false;
        } else if ((event.key === "ArrowRight") || (event.key === "d")|| (event.key === "D")){
           inputStates.right = false;
        } else if ((event.key === "ArrowDown")|| (event.key === "s")|| (event.key === "S")) {
           inputStates.down = false;
        }  else if (event.key === " ") {
           inputStates.space = false;
        }
    }, false);
}

