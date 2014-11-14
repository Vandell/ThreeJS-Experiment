var Boid = (function(){

    function Boid(nbFishes, color){
        THREE.Object3D.call(this);

        var fishes = [];

        for (var i = 0 ; i < nbFishes ; i++) {

          var fish = new Fish(color);
          fish.position.set((Math.random()*800)-400, (Math.random()*200)-100, (Math.random()*200)-100);
          fish.velocity = new THREE.Vector3(1, 1, 1);
          fishes.push(fish);
          this.add(fish);
        };
    }

    Boid.prototype = new THREE.Object3D;
    Boid.prototype.constructor = Boid;

    Boid.prototype.update = function() {

        for (var i = 0 ; i < this.children.length ; i++) {
            this.moveWith(this.children, this.children[i], 100);
            this.moveCloser(this.children, this.children[i], 100);                    
            this.moveAway(this.children, this.children[i], 40); 
        }

        for (var i = 0 ; i < this.children.length ; i++) {
            this.children[i].update();
            this.move(this.children[i]); 
        }
    }

    Boid.prototype.move = function(currentBoid) {
        
        currentBoid.position.x += currentBoid.velocity.x;
        currentBoid.position.y += currentBoid.velocity.y;
        currentBoid.position.z += currentBoid.velocity.z;

        var width = 400;
        var height = 100;
        var depth = 100;
        var border = 0;
        
        if(currentBoid.position.x <= -width + border || currentBoid.position.x >= width - border) {
            currentBoid.position.x -= currentBoid.velocity.x;                   
            currentBoid.position.x = Math.max(currentBoid.position.x, -width + border);
            currentBoid.position.x = Math.min(currentBoid.position.x,  width - border);
            currentBoid.velocity.x = -currentBoid.velocity.x;
            currentBoid.position.x += currentBoid.velocity.x;
        }
        if(currentBoid.position.y <= -height + border || currentBoid.position.y >= height - border) {
            currentBoid.position.y -= currentBoid.velocity.y;
            currentBoid.position.y = Math.max(currentBoid.position.y, -height + border);
            currentBoid.position.y = Math.min(currentBoid.position.y,  height - border);
            currentBoid.velocity.y = -currentBoid.velocity.y;
            currentBoid.position.y += currentBoid.velocity.y;
        }
        if(currentBoid.position.z <= -depth + border || currentBoid.position.z >= depth - border) {
            currentBoid.position.z -= currentBoid.velocity.z;
            currentBoid.position.z = Math.max(currentBoid.position.z, -depth + border);
            currentBoid.position.z = Math.min(currentBoid.position.z,  depth - border);
            currentBoid.velocity.z = -currentBoid.velocity.z;
            currentBoid.position.z += currentBoid.velocity.z;
        }
    }
        
    Boid.prototype.distance = function(boid, currentBoid) {
        var distX = currentBoid.position.x - boid.position.x;
        var distY = currentBoid.position.y - boid.position.y;
        var distZ = currentBoid.position.z - boid.position.z;
        return Math.sqrt(distX * distX + distY * distY + distZ * distZ);
    }
        
    Boid.prototype.moveAway = function(boids, currentBoid, minDistance) {
        var distanceX = 0;
        var distanceY = 0;
        var distanceZ = 0;
        var numClose = 0;

        for(var i = 0; i < boids.length; i++) {
            var boid = boids[i];
            
            if(boid.position.x == currentBoid.position.x && boid.position.y == currentBoid.position.y && boid.position.z == currentBoid.position.z) continue;
            
            var distance = this.distance(boid, currentBoid);
            if(distance < minDistance) {
                numClose++;
                var xdiff = (currentBoid.position.x - boid.position.x);
                var ydiff = (currentBoid.position.y - boid.position.y);
                var zdiff = (currentBoid.position.z - boid.position.z);

                if(xdiff >= 0) xdiff = Math.sqrt(minDistance) - xdiff;
                else if(xdiff < 0) xdiff = -Math.sqrt(minDistance) - xdiff;

                if(ydiff >= 0) ydiff = Math.sqrt(minDistance) - ydiff;
                else if(ydiff < 0) ydiff = -Math.sqrt(minDistance) - ydiff;

                if(zdiff >= 0) zdiff = Math.sqrt(minDistance) - zdiff;
                else if(zdiff < 0) zdiff = -Math.sqrt(minDistance) - zdiff;

                distanceX += xdiff;
                distanceY += ydiff;
                distanceZ += zdiff;
                boid = null; 
            }
        }
        
        if(numClose == 0) return;
        
        currentBoid.velocity.x -= distanceX / 5;
        currentBoid.velocity.y -= distanceY / 5;
        currentBoid.velocity.z -= distanceZ / 5;
    }
        
    Boid.prototype.moveCloser = function(boids, currentBoid, distance) {
        if(boids.length < 1) return             

        var avgX = 0;
        var avgY = 0;
        var avgZ = 0;
        var maxVelocity = 3;

        for(var i = 0; i < boids.length; i++) {
            var boid = boids[i];
            if(boid.position.x == currentBoid.position.x && boid.position.y == currentBoid.position.y && boid.position.z == currentBoid.position.z) continue;
            if(this.distance(boid, currentBoid) > distance) continue;
            
            avgX += (currentBoid.position.x - boid.position.x);
            avgY += (currentBoid.position.y - boid.position.y);
            avgZ += (currentBoid.position.z - boid.position.z);
            boid = null;
        }
            

        avgX /= boids.length;
        avgY /= boids.length;
        avgZ /= boids.length;

        distance = Math.sqrt((avgX * avgX) + (avgY * avgY) + (avgZ * avgZ)) * -1.0;
        if(distance == 0) return;
        
        currentBoid.velocity.x = Math.min(currentBoid.velocity.x + (avgX / distance) * 0.15, maxVelocity);
        currentBoid.velocity.y = Math.min(currentBoid.velocity.y + (avgY / distance) * 0.15, maxVelocity);
        currentBoid.velocity.z = Math.min(currentBoid.velocity.z + (avgZ / distance) * 0.15, maxVelocity);
    }
        
    Boid.prototype.moveWith = function(boids, currentBoid, distance) {
        if(boids.length < 1) return

        // calculate the average velocity of the other boids
        var avgX = 0;
        var avgY = 0;
        var avgZ = 0;
        var maxVelocity = 5;

        for(var i = 0; i < boids.length; i++) {
            var boid = boids[i];
            if(boid.position.x == currentBoid.position.x && boid.position.y == currentBoid.position.y && boid.position.z == currentBoid.position.z) continue;
            if(this.distance(boid, currentBoid) > distance) continue;
            
            avgX += boid.velocity.x;
            avgY += boid.velocity.y;
            avgZ += boid.velocity.z;
            boid = null;
        }
        avgX /= boids.length;
        avgY /= boids.length;
        avgZ /= boids.length;

        distance = Math.sqrt((avgX * avgX) + (avgY * avgY) + (avgZ * avgZ)) * 1.0;
        if(distance == 0) return;

        currentBoid.velocity.x = Math.min(currentBoid.velocity.x + (avgX / distance) * 0.05, maxVelocity);
        currentBoid.velocity.y = Math.min(currentBoid.velocity.y + (avgY / distance) * 0.05, maxVelocity); 
        currentBoid.velocity.z = Math.min(currentBoid.velocity.z + (avgZ / distance) * 0.05, maxVelocity);                     
    }

    Boid.prototype.fleeMouse = function(mouseVector, currentBoid) {

        var distanceX = 0;
        var distanceY = 0;
        var numClose = 0;

        //if(mouseVector.position.x == currentBoid.position.x && mouseVector.position.y == currentBoid.position.y) continue;
        
        var distance = 5;
        var minDistance = 10/*this.distance(mouseVector, currentBoid)*/;
        
        if(distance < minDistance) {
            numClose++;
            var xdiff = (currentBoid.position.x - mouseVector.x);
            var ydiff = (currentBoid.position.y - mouseVector.y);

            if(xdiff >= 0) xdiff = Math.sqrt(minDistance) - xdiff;
            else if(xdiff < 0) xdiff = -Math.sqrt(minDistance) - xdiff;

            if(ydiff >= 0) ydiff = Math.sqrt(minDistance) - ydiff;
            else if(ydiff < 0) ydiff = -Math.sqrt(minDistance) - ydiff;

            distanceX += xdiff;
            distanceY += ydiff;
            mouseVector = null; 
        }
        
        if(numClose == 0) return;
        
        currentBoid.velocity.x -= distanceX / 5;
        currentBoid.velocity.y -= distanceY / 5;
    }

    var random = function(maxNum) {
        return Math.ceil(Math.random() * maxNum);
    }

    return Boid;
})();


