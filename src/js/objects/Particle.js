var Particle = (function(){

    function Particle(){
        THREE.Object3D.call(this);


        // create the particle variables
        var particleCount = 500;
        var particles = new THREE.Geometry();
        var pMaterial = new THREE.PointCloudMaterial({
              color: 0x088DA5,
              size: 2
            });

        // now create the individual particles
        for (var p = 0; p < particleCount; p++) {

            // create a particle with random
            // position values, -250 -> 250
            var pX = Math.random() * 1000 - 500;
            var pY = Math.random() * 1000 - 500;
            var pZ = Math.random() * 1000 - 500;
            var particle = new THREE.Vector3(pX, pY, pZ);

            // add it to the geometry
            particles.vertices.push(particle);
        }

        // create the particle system
        this.particleSystem = new THREE.PointCloud(particles, pMaterial);

        // add it to the scene
        this.add(this.particleSystem);
    }

    Particle.prototype = new THREE.Object3D;
    Particle.prototype.constructor = Particle;

    Particle.prototype.update = function() {
        var time = Date.now() * 0.00005;
        //this.particleSystem.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
        this.particleSystem.rotation.x -= 0.002;
        this.particleSystem.rotation.y += 0.002;
    };

    return Particle;
})();