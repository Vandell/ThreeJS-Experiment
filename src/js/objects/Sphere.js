var Sphere = (function(){

    function Sphere(){
        THREE.Object3D.call(this);

        var geometry = new THREE.SphereGeometry(35);
        var material = new THREE.MeshPhongMaterial({
            ambient: 0x000000, 
            color: 0x00C0C0, 
            specular: 0xAAAAAA, 
            shininess: 30, 
            shading: THREE.FlatShading
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }

    Sphere.prototype = new THREE.Object3D;
    Sphere.prototype.constructor = Sphere;

    Sphere.prototype.update = function() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    };

    return Sphere;
})();