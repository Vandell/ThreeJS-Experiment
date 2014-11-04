var Boid = (function(){

    function Boid(nbFishes){
        THREE.Object3D.call(this);

        var fishes = [];

        for (var i = 0 ; i < nbFishes ; i++) {

          var fish = new Fish();
          fish.position.set((Math.random()*1000)-500, (Math.random()*600)-300, 0);
          fish.velocity = new THREE.Vector3(1, -1, 0);
          fishes.push(fish);
          this.add(fish);
        };
    }

    Boid.prototype = new THREE.Object3D;
    Boid.prototype.constructor = Boid;

    Boid.prototype.update = function() {

        for (var i = 0 ; i < this.children.length ; i++) {
            this.moveWith(this.children, this.children[i], 300);
            this.moveCloser(this.children, this.children[i], 300);                    
            this.moveAway(this.children, this.children[i], 50); 
        }

        for (var i = 0 ; i < this.children.length ; i++) {
            this.children[i].update();
            this.move(this.children[i]); 
        }
    }

    Boid.prototype.move = function(currentBoid) {
        
        currentBoid.position.x += currentBoid.velocity.x;
        currentBoid.position.y += currentBoid.velocity.y;

        var width = 1000;
        var height = 300;
        var border = 10;
        
        if(currentBoid.position.x <= border || currentBoid.position.x >= width - border) {
            currentBoid.position.x -= currentBoid.velocity.x;                   
            currentBoid.position.x = Math.max(currentBoid.position.x, border);
            currentBoid.position.x = Math.min(currentBoid.position.x, width - border);
            currentBoid.velocity.x = -currentBoid.velocity.x;
            currentBoid.position.x += currentBoid.velocity.x;
        }
        if(currentBoid.position.y <= border || currentBoid.position.y >= height - border) {
            currentBoid.position.y -= currentBoid.velocity.y;
            currentBoid.position.y = Math.max(currentBoid.position.y, border);
            currentBoid.position.y = Math.min(currentBoid.position.y, height - border);
            currentBoid.velocity.y = -currentBoid.velocity.y;
            currentBoid.position.y += currentBoid.velocity.y;
        }
    }
        
    Boid.prototype.distance = function(boid, currentBoid) {
        var distX = currentBoid.position.x - boid.position.x;
        var distY = currentBoid.position.y - boid.position.y;
        return Math.sqrt(distX * distX + distY * distY);
    }
        
    Boid.prototype.moveAway = function(boids, currentBoid, minDistance) {
        var distanceX = 0;
        var distanceY = 0;
        var numClose = 0;

        for(var i = 0; i < boids.length; i++) {
            var boid = boids[i];
            
            if(boid.position.x == currentBoid.position.x && boid.position.y == currentBoid.position.y) continue;
            
            var distance = this.distance(boid, currentBoid);
            if(distance < minDistance) {
                numClose++;
                var xdiff = (currentBoid.position.x - boid.position.x);
                var ydiff = (currentBoid.position.y - boid.position.y);

                if(xdiff >= 0) xdiff = Math.sqrt(minDistance) - xdiff;
                else if(xdiff < 0) xdiff = -Math.sqrt(minDistance) - xdiff;

                if(ydiff >= 0) ydiff = Math.sqrt(minDistance) - ydiff;
                else if(ydiff < 0) ydiff = -Math.sqrt(minDistance) - ydiff;

                distanceX += xdiff;
                distanceY += ydiff;
                boid = null; 
            }
        }
        
        if(numClose == 0) return;
        
        currentBoid.velocity.x -= distanceX / 5;
        currentBoid.velocity.y -= distanceY / 5;
    }
        
    Boid.prototype.moveCloser = function(boids, currentBoid, distance) {
        if(boids.length < 1) return             

        var avgX = 0;
        var avgY = 0;
        var maxVelocity = 3;

        for(var i = 0; i < boids.length; i++) {
            var boid = boids[i];
            if(boid.position.x == currentBoid.position.x && boid.position.y == currentBoid.position.y) continue;
            if(this.distance(boid, currentBoid) > distance) continue;
            
            avgX += (currentBoid.position.x - boid.position.x);
            avgY += (currentBoid.position.y - boid.position.y);
            boid = null;
        }
            

        avgX /= boids.length;
        avgY /= boids.length;

        distance = Math.sqrt((avgX * avgX) + (avgY * avgY)) * -1.0
        if(distance == 0) return;
        
        currentBoid.velocity.x = Math.min(currentBoid.velocity.x + (avgX / distance) * 0.15, maxVelocity)
        currentBoid.velocity.y = Math.min(currentBoid.velocity.y + (avgY / distance) * 0.15, maxVelocity)
    }
        
    Boid.prototype.moveWith = function(boids, currentBoid, distance) {
        if(boids.length < 1) return

        // calculate the average velocity of the other boids
        var avgX = 0;
        var avgY = 0;
        var maxVelocity = 5;

        for(var i = 0; i < boids.length; i++) {
            var boid = boids[i];
            if(boid.position.x == currentBoid.position.x && boid.position.y == currentBoid.position.y) continue;
            if(this.distance(boid, currentBoid) > distance) continue;
            
            avgX += boid.velocity.x;
            avgY += boid.velocity.y;
            boid = null;
        }
        avgX /= boids.length;
        avgY /= boids.length;

        distance = Math.sqrt((avgX * avgX) + (avgY * avgY)) * 1.0
        if(distance == 0) return;

        currentBoid.velocity.x = Math.min(currentBoid.velocity.x + (avgX / distance) * 0.05, maxVelocity)
        currentBoid.velocity.y = Math.min(currentBoid.velocity.y + (avgY / distance) * 0.05, maxVelocity)                       
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


