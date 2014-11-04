var Skybox = (function(){

    function Skybox(){
        THREE.Object3D.call(this);

        var r = "src/img/";
        var urls = [r + "whirlpool_py.jpg", r + "whirlpool_py.jpg",
                    r + "whirlpool_py.jpg", r + "whirlpool_ny.jpg",
                    r + "whirlpool_py.jpg", r + "whirlpool_py.jpg"];

        var textureCube = THREE.ImageUtils.loadTextureCube( urls );
        textureCube.format = THREE.RGBFormat;

        // Skybox

        var shader = THREE.ShaderLib[ "cube" ];
        shader.uniforms[ "tCube" ].value = textureCube;

        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.ShaderMaterial( {

            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide

        } );

        this.mesh = new THREE.Mesh(geometry, material);
        //this.mesh.scale.set(10, 10, 10);

		this.add(this.mesh);
    }

    Skybox.prototype = new THREE.Object3D;
    Skybox.prototype.constructor = Skybox;

    Skybox.prototype.update = function() {
        
    };

    return Skybox;
})();