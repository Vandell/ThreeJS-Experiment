var Shark = (function(){

    function Shark(){
        THREE.Object3D.call(this);

        // White Eye
        var geometryWhiteEye = new THREE.BoxGeometry(35, 35, 10); 
        var materialWhiteEye = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0xFFFFFF, 
            specular: 0xFFFFFF, 
            shininess: 30, 
            shading: THREE.FlatShading
        });
        this.whiteEye = new THREE.Mesh(geometryWhiteEye, materialWhiteEye); 
        this.whiteEye.position.set(40, 14, 5);
        this.whiteEye.rotation.set(1.58, 0, 0);
        this.add(this.whiteEye);

        // Black Eye
        var geometryBlackEye = new THREE.CylinderGeometry(4, 4, 37, 32); 
        var materialBlackEye = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0x000000, 
            specular: 0x000000, 
            shininess: 30, 
            shading: THREE.FlatShading
        });
        this.blackEye = new THREE.Mesh(geometryBlackEye, materialBlackEye); 
        this.blackEye.position.set(45, 14, 5);
        this.blackEye.rotation.set(1.58, 0, 0);
        this.add(this.blackEye);

        // Shark Corps
        var extrudeSettings = { 
            amount: 10,
            curveSegments: 100,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSegments: 20,
            steps: 2
        };

		var x = y = 0;
        var sharkShape = new THREE.Shape();

		sharkShape.moveTo(x,y);
		sharkShape.quadraticCurveTo(x + 100, y - 40, x + 100, y - 10);
		sharkShape.quadraticCurveTo(x + 100, y - 10, x + 170, y - 60);
		sharkShape.quadraticCurveTo(x + 115, y, x + 150, y + 60);
		sharkShape.quadraticCurveTo(x + 100, y + 10, x + 110, y + 80);
		sharkShape.quadraticCurveTo(x + 50, y + 30, x-50, y);

		var geometryCorps = new THREE.ExtrudeGeometry(sharkShape, extrudeSettings); 
		var materialCorps = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0x555555, 
            specular: 0xAAAAAA, 
            shininess: 30, 
            shading: THREE.FlatShading
        });

	    this.corps = new THREE.Mesh(geometryCorps, materialCorps);
	    this.corps.position.set(0, 0, 0);
	    this.add(this.corps);

        this.scale.set(2, 2, 2);

		//addShape( sharkShape, extrudeSettings, 0x3facc8, -60, 200, 0, 0, 0, 0, 1 );
    }

    Shark.prototype = new THREE.Object3D;
    Shark.prototype.constructor = Shark;

    Shark.prototype.update = function() {

        var time = Date.now() / 150;

        this.rotation.y = Math.sin(time) * 0.05;

            var move = Math.sin(Date.now() / 2000);
            var change = true;

            this.position.x -= 20;
/*
            if(move < 0 && change) {
                this.rotation.y = 0;
                change = false;
            }
            else {
                this.rotation.y = 3 * Math.sin(Date.now() / 1500);
                change = true;
            }*/

    	//this.rotation.y -= 0.01;
        //if(this.position.x > 0)
    	//this.position.x -= 5;

        /*
        this.velocity = new THREE.Vector3(-Math.random(), 0, 0);
        this.velocity.x -= Math.random() * 0.1;
*/      
    };

    return Shark;
})();