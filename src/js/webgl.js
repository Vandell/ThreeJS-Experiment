var Webgl = (function(){

    function Webgl(width, height){
        // Basic three.js setup
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        //this.camera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 1, 1000);
        this.camera.position.z = 500;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000);

        // Light
        var light = new THREE.PointLight(0xFFFFFF, 1, 2000);
        light.position.set(0, 300, -200);
        this.scene.add(light);

        // Grass
        this.grassObject = new Grass(width, height);
        this.grassObject.position.set(0, 0, 0);
        this.scene.add(this.grassObject);

        // Plane
        this.planeObject = new Plane();
        this.planeObject.position.set(0, 0, 0);
        this.scene.add(this.planeObject);

        // Fishes
        this.boidObject = new Boid(10, 0xAEAEAE);
        this.boidObject.position.set(0, 0, 0);
        this.scene.add(this.boidObject);
        
        this.boid2Object = new Boid(10, 0x520B6B);
        this.boid2Object.position.set(0, 0, 0);
        this.scene.add(this.boid2Object);

        //Particles
        this.particleObject = new Particle();
        this.particleObject.position.set(0, 0, 0);
        this.scene.add(this.particleObject);

        // Plant
    /*
        for (var i = 0 ; i < 4 ; i++) {
            this.plantObject = new Plant();
            this.plantObject.position.set(0, 0, 0);
            this.scene.add(this.plantObject);
        };*/
        

        // Skybox
    /*
        this.skyboxObject = new Skybox();
        this.skyboxObject.position.set(0, 0, 0);
        //this.skyboxObject.scale.set(0, 0, 0);
        this.scene.add(this.skyboxObject);
*/
        // Sound
        this.soundObject = new Sound();

        // Shark
        /*
        this.sharkObject = new Shark();
        this.sharkObject.position.set(1000, 0, -1000);
        this.scene.add(this.sharkObject);*/

    }

    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    Webgl.prototype.render = function() {
        // MOUSE GESTURE
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(this.camera);
        raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize());
        var intersect = raycaster.intersectObject(this.scene.children[3], true);

        if (intersect.length > 0) {

            if (INTERSECTED != intersect[0].object) {
                if (INTERSECTED) 
                    INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = intersect[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0xAAAAAA);

                this.boidObject.fleeMouse(vector, intersect[0].object.parent);
/*
                for(var i = 0; i < this.boidObject.children.length; i++) {

                    var boid = this.boidObject.children[i];
                    vector.z = boid.position.z;

                    var distance = boid.position.distanceTo(vector);
                    var minDistance = 50;
                    
                    if(distance < minDistance) {
                        var steer = new THREE.Vector3();

                        steer.subVectors(boid.position, vector);
                        steer.multiplyScalar(0.5 / distance);

                        boid.velocity.x -= steer.x;
                        boid.velocity.y -= steer.y;
                        boid.velocity.z -= steer.z;
                    }
                }*/
            }
        } 
        else {
            if (INTERSECTED) 
                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = null;
        }
        // END MOUSE GESTURE

        this.renderer.render(this.scene, this.camera);

        this.grassObject.update();
        this.boidObject.update();
        this.boid2Object.update();
        this.particleObject.update();
        //this.sharkObject.update();
    };

    return Webgl;

})();