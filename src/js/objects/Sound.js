var Sound = (function(){

    function Sound(){

        myAudio = new Audio('src/audio/PlongeeNocturne.mp3'); 
		myAudio.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
		myAudio.play();
    }

    Sound.prototype.constructor = Sound;

    return Sound;
})();