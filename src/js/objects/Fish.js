var Fish = (function(){

    function Fish(){
        THREE.Object3D.call(this);

        // White Eye
        var geometryWhiteEye = new THREE.CylinderGeometry(10, 10, 35, 32); 
        var materialWhiteEye = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0xFFFFFF, 
            specular: 0xFFFFFF, 
            shininess: 30, 
            shading: THREE.FlatShading
        });
        this.whiteEye = new THREE.Mesh(geometryWhiteEye, materialWhiteEye); 
        this.whiteEye.position.set(40, 10, 5);
        this.whiteEye.rotation.set(1.58, 0, 0);
        this.add(this.whiteEye);

        // Black Eye
        var geometryBlackEye = new THREE.CylinderGeometry(5, 5, 37, 32); 
        var materialBlackEye = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0x000000, 
            specular: 0x000000, 
            shininess: 30, 
            shading: THREE.FlatShading
        });
        this.blackEye = new THREE.Mesh(geometryBlackEye, materialBlackEye); 
        this.blackEye.position.set(37, 11, 5);
        this.blackEye.rotation.set(1.58, 0, 0);
        this.add(this.blackEye);

        // Fish Corps
        var extrudeSettings = { 
            amount: 10,
            curveSegments: 100,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSegments: 20,
            steps: 2
        };

		var x = y = 0;
        var fishShape = new THREE.Shape();

		fishShape.moveTo(x,y);
		fishShape.quadraticCurveTo(x + 50, y - 50, x + 110, y - 10);
		fishShape.quadraticCurveTo(x + 100, y - 10, x + 150, y - 30);
		fishShape.quadraticCurveTo(x + 115, y, x + 150, y + 50);
		fishShape.quadraticCurveTo(x + 100, y + 10, x + 110, y + 50);
		fishShape.quadraticCurveTo(x + 50, y + 50, x, y);

		var geometryCorps = new THREE.ExtrudeGeometry(fishShape, extrudeSettings); 
		var materialCorps = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0xCBBEB5, 
            specular: 0xAAAAAA, 
            shininess: 5, 
            shading: THREE.FlatShading
        });

	    this.corps = new THREE.Mesh(geometryCorps, materialCorps);
	    this.corps.position.set(0, 0, 0);
	    this.add(this.corps);

	    this.scale.set(0.3, 0.3, 0.3);

		//addShape( fishShape, extrudeSettings, 0x3facc8, -60, 200, 0, 0, 0, 0, 1 );
    }

    Fish.prototype = new THREE.Object3D;
    Fish.prototype.constructor = Fish;

    Fish.prototype.update = function() {

        var time = Date.now() / 2000;
        var phase = 0;
        //this.rotation.y = Math.sin(time) * 0.05;

        TweenMax.to(this.rotation, 0.3, {y: (Math.atan2(-this.velocity.z, -this.velocity.x)), z: (-Math.asin(this.velocity.y / this.velocity.length()) * 0.2), ease:Linear.easeNone});
        //this.rotation.y = Math.atan2(-this.velocity.z, -this.velocity.x);
        //this.rotation.z = -Math.asin(this.velocity.y / this.velocity.length()) * 0.2;

    	//this.rotation.y -= 0.01;
        //if(this.position.x > 0)
    	//this.position.x -= 5;

        /*
        this.velocity = new THREE.Vector3(-Math.random(), 0, 0);
        this.velocity.x -= Math.random() * 0.1;
*/      
    };

    return Fish;
})();

