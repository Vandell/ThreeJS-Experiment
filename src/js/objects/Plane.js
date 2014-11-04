var Plane = (function(){

    function Plane(){
        THREE.Object3D.call(this);

        var geometry = new THREE.PlaneGeometry(2000, 600);
        var material = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0x002654, 
            specular: 0x444444, 
            shininess: 5, 
            shading: THREE.FlatShading
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 150, -300);
        this.add(this.mesh);
    }

    Plane.prototype = new THREE.Object3D;
    Plane.prototype.constructor = Plane;

    Plane.prototype.update = function() {

    };

    return Plane;
})();