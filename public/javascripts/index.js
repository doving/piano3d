//(function(){

    var scene, camera, renderer, light, piano;

    var conf = {
        keypad: {
            num    : 28,
            x      : 2.5,
            y      : 15,
            z      : 1,
            gap    : 0.3,
            color  : 0xffffff,
        },
        bgcolor: 0xcccccc,
        lightcolor: 0xffffff,
    };
    conf.button = {
        color  : 0x000000,
        x      : conf.keypad.x * 1,
        y      : conf.keypad.y * 0.75,
        z      : conf.keypad.z * 2,  
    };
        
   

    (function(){
        scene    = new THREE.Scene();
        renderer = new THREE.WebGLRenderer();
        camera   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        light    = new THREE.PointLight(0xffffff);

        piano  = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshLambertMaterial()
        );

        light.position.set(-50, 50, 100);

        scene.add(light);
        scene.add(piano);

        //scene.overrideMarterial = new THREE.MeshBasicMaterial({color: conf.keypad.color});

        camera.position.z = 100;
        camera.lookAt(scene.position);
        renderer.setClearColor(conf.bgcolor);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    })();

    (function(){
        for(var i = 1; i <= conf.keypad.num; i++){
            var keypadGeometry = new THREE.BoxGeometry(conf.keypad.x, conf.keypad.y, conf.keypad.z);
            var keypadMarterial = new THREE.MeshLambertMaterial({color: conf.keypad.color});
            var keypad = new THREE.Mesh(keypadGeometry, keypadMarterial);
            
            var keypadx = ( i - 1 - conf.keypad.num / 2 ) * ( conf.keypad.x + 2 * conf.keypad.gap );
            
            keypad.name = 'keypad' + i;
            keypad.position.x = keypadx;

            piano.add(keypad);

            if([1,2,3,5,6].indexOf(i % 7) < 0)continue;
            //console.log(i);

            var buttonGeometry = new THREE.BoxGeometry(conf.button.x, conf.button.y, conf.button.z);
            var buttonMarterial = new THREE.MeshLambertMaterial({color: conf.button.color});
            var button = new THREE.Mesh(buttonGeometry, buttonMarterial);
            
            var buttonx = keypadx + ( conf.keypad.x - ( conf.button.x - conf.keypad.gap ) / 2 );
            
            button.name = 'button' + i;
            button.position.x = buttonx;
            button.position.y = ( conf.keypad.y - conf.button.y ) / 2;
            //button.position.z = conf.button.z - conf.keypad.z;
            //console.log(button);
            piano.add(button);
        }
    })();

    requestAnimationFrame(function(){

        //var keypad = scene.getObjectByName('keypad0');
        //camera.position.z += 0.1;
        //camera.rotateY(0.01);
        //piano.rotation.x += 0.01;
        //piano.rotation.y += 0.01;
        //piano.rotation.z += 0.01;


        renderer.render(scene, camera);
        
        requestAnimationFrame(arguments.callee);
    });

    window.onresize = function(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

//})()