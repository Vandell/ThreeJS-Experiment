var Grass = (function(){

    function Grass(width, height){
        THREE.Object3D.call(this);

        var geometry = new THREE.BoxGeometry(1.5, 20, 1.5);
        var materials = [
            new THREE.MeshPhongMaterial({
                ambient: 0x000000, 
                color: 0x00FF3E,
                specular: 0x555555,
                shininess: 30, 
                shading: THREE.FlatShading
            }), 
            new THREE.MeshPhongMaterial({
                ambient: 0x000000, 
                color: 0x00997C, 
                specular: 0x555555,
                shininess: 30, 
                shading: THREE.FlatShading
            }),
            new THREE.MeshPhongMaterial({
                ambient: 0x000000, 
                color: 0x00CCA5, 
                specular: 0x555555,
                shininess: 30, 
                shading: THREE.FlatShading
            })
        ];

        for (var i = 0; i < 10000 ; i++) {

            //var random = Math.floor(Math.random() * 3) + 0;

            this.mesh = new THREE.Mesh(geometry, materials[i%3]);
            this.mesh.position.x = (-width/2) + Math.random() * width;
            this.mesh.position.y = -120/*(-height/2) + Math.random() * (height/2.5)*/;
            this.mesh.position.z = (-250) + Math.random() * 500;
            this.mesh.rotation.x = (Math.random() * 0.3) + 9.5;
            this.mesh.scale.y = Math.random() * 1.8 + 0.2;
            //this.mesh.rotation.y = Math.random() + 10;
            //this.mesh.material.color.setHex(colors[i%3]);
            this.add(this.mesh);
        };
        
    }

    Grass.prototype = new THREE.Object3D;
    Grass.prototype.constructor = Grass;

    Grass.prototype.update = function() {

        var time = Date.now() / 3000;

        for (var i = 0, l = this.children.length ; i < l ; i ++) {
            var mesh = this.children[i];
            mesh.rotation.x = (Math.sin(time * 4) * 0.1) + 9.6;
            //mesh.rotation.y = (Math.sin(time * 4)) + 50;
        }
    };

    return Grass;
})();