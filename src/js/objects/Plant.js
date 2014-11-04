var Plant = (function(){

    function Plant(width, height){
        THREE.Object3D.call(this);

        // Random
        var randomPoints = [];
        var size = (Math.random()*3) + 4;

        for ( var i = 0; i < size; i ++ ) {
            randomPoints.push(new THREE.Vector3((i - 4.5) * 50, THREE.Math.randFloat(-20, 20), THREE.Math.randFloat(5, 10)));
        }

        var randomSpline =  new THREE.SplineCurve3(randomPoints);
        
        // Plant
        var extrudeSettings = {
            steps           : 200,
            bevelEnabled    : false,
            extrudePath     : randomSpline
        };

        var pts = [], numPts = 2;

        for (var i = 0 ; i < numPts * 2 ; i++) {
            var l = i % 2 == 1 ? 5 : 10;
            var a = i / numPts * Math.PI;
            pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
        }

        var shape = new THREE.Shape(pts);
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var material = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0x00CCA5, 
            specular: 0xFFFFFF, 
            shininess: 5, 
            shading: THREE.FlatShading
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(0, 0, 1.58);

        this.add(this.mesh);
    }

    Plant.prototype = new THREE.Object3D;
    Plant.prototype.constructor = Plant;

    Plant.prototype.update = function() {
        /*this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;*/
    };

    return Plant;
})();