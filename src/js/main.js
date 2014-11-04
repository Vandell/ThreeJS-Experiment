var webgl, gui, raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;

$(document).ready(init);

function init(){

    webgl = new Webgl(window.innerWidth, window.innerHeight);
    $('.three').append(webgl.renderer.domElement);

    gui = new dat.GUI();
/*
    gui.add(webgl.skyboxObject.scale, 'x').min(-10).max(10);
    gui.add(webgl.skyboxObject.scale, 'y').min(-10).max(10);
    gui.add(webgl.skyboxObject.scale, 'z').min(-10).max(10);
*/
    gui.add(webgl.planeObject.position, 'y').min(-100).max(200);
    gui.add(webgl.planeObject.position, 'z').min(-300).max(100);
    /*
    gui.add(webgl.skyboxObject.position, 'y').min(-100).max(200);
    gui.add(webgl.skyboxObject.position, 'z').min(-100).max(200);
    */
/*
    gui.add(webgl.sharkObject.whiteEye.position, 'x').min(-50).max(50);
    gui.add(webgl.sharkObject.whiteEye.position, 'y').min(-50).max(50);
    gui.add(webgl.sharkObject.whiteEye.position, 'z').min(-50).max(50);
*/
    gui.close();

    raycaster = new THREE.Raycaster();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //document.addEventListener( 'mousedown', onDocumentMouseDown, false );

    $(window).on('resize', resizeHandler);

    animate();
}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x =  (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
/*
function onDocumentMouseDown(event) {

    event.preventDefault();

    mouse.x =  (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
*/
function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    webgl.render();
}