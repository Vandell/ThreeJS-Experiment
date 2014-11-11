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
        
        this.boidObject = new Boid(10);
        this.boidObject.position.set(0, 0, 0);
        this.scene.add(this.boidObject);
        

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
        var vector = new THREE.Vector3(mouse.x, mouse.y, 1).unproject(this.camera);
        raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize());
        var intersect = raycaster.intersectObject(this.scene.children[3], true);

        if (intersect.length > 0) {
/*
            for (var i = 0; i < intersect.length; i++) {
                this.boidObject.fleeMouse(vector, intersect[i].object.parent);
            };
*/
            if (INTERSECTED != intersect[0].object) {
                if (INTERSECTED) 
                    INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = intersect[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0xFF6666);

                this.boidObject.fleeMouse(vector, intersect[0].object.parent);
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
        //this.sharkObject.update();
    };

    return Webgl;

})();