
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRef, useEffect, useState} from 'react'
import data from '../../data/data.json';
import {textures} from '../../data/testures';

const scene = new THREE.Scene();
let camera, renderer
scene.background =new THREE.Color('#070724')
window.scene = scene;
let frameId
let rotationTime = 0.005

export function SolarSystem({planetId, infoId, onInfoSelect}) {
    const mount = useRef(null)
    const [isCollapsed, setCollapsed] = useState(false)
    const [orbitsVisible, setOrbitsVisible] = useState(true)
    const [orbitOpacity, setOrbitOpacity] = useState(0.05)
    const [moonsVisible, setMoonsvisible] = useState(true)

    const controlToggleHandler = () => setCollapsed(!isCollapsed);

    const startAnimation = () => {
      console.log('start');
    }

    const stoptAnimation = () => {
      console.log('stop');

    }

    const centerScene = () => {
      console.log('center');

    }

    const resetScene = () => {
      console.log('reset');

    }

    const toggleOrbitsVisible = () => {
      setOrbitsVisible(!orbitsVisible);
      const orbits = scene.getObjectByName('orbits').children;

      orbits.map((orbit) => {
        orbit.visible = orbitsVisible
      })
    }

    const toggleMoonsVisible = () => {
      setMoonsvisible(!moonsVisible);

    }
    
    const orbitsOpacityChange = (e) => {
      const value = Number.parseInt(e.currentTarget.value)/100;
      const orbit = scene.getObjectByName('orbits');

      setOrbitOpacity(0.4 * value);

      //TODO check orbits visible state
      if (orbit) {
        const orbits = orbit.children;

        orbits.map((orbit) => {
          orbit.material.opacity = orbitOpacity
        })
      }



    }

    const rotationsTimeChange = (e) => {
      const value = Number.parseInt(e.currentTarget.value)/100;

      rotationTime = value;

    }

    const animatePlanets = () => {
      const planetsGroup = scene.getObjectByName('planets').children;
    
      const earthYear = 2 * Math.PI * (1 / 60) * (1 / 60);


      planetsGroup.forEach((planetGroup, index) => {
        const planetData = data[Object.keys(data)[index]];
        const rotation = {value: Number.parseFloat(planetData.rotation.split(' ')[0]), unit: planetData.rotation.split(' ')[1]};

        
        switch (rotation.unit) {
          case 'Days':
            planetGroup.rotation.z += earthYear * rotation.value * rotationTime;
            planetGroup.children[0].rotation.y +=  earthYear * rotation.value * rotationTime ;

            break;
          case 'Hours':
            planetGroup.rotation.z += earthYear * rotation.value * 24 * rotationTime;
            planetGroup.children[0].rotation.y +=  earthYear * rotation.value * 24* rotationTime ;
            
            break;
          default: break;
        }

      })
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const animate = () => {

      renderScene()
      frameId = window.requestAnimationFrame(animate);
      animatePlanets()
    }


    
    useEffect(() => {

      document.querySelector('.scrollbar-container').classList.remove('ps', 'ps--active-y');
      let width = mount.current.clientWidth
      let height = mount.current.clientHeight
  
      camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
      window.camera = camera;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.listenToKeyEvents( window );
      
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      // controls.dampingFactor = 0.05;

      controls.screenSpacePanning = false;

      controls.minDistance = 10;
      controls.maxDistance = 800;
      camera.position.x = 65;
      camera.position.y = -85;
      camera.position.z = 115;
      camera.rotation.x = 0.64;
      camera.rotation.y = 0.43;
      camera.rotation.z = -0.3;

      try {
        scene.remove(scene.getObjectByName('planets'));
        scene.remove(scene.getObjectByName('orbits'));
        scene.remove(scene.getObjectByName('spins'));
        scene.remove(scene.getObjectByName('SUN'));

      }catch {

      }

      let geometry = new THREE.SphereGeometry( 10, 32, 16 );
      let texture = new THREE.TextureLoader().load('./assets/2k_sun.jpg')
      let material = new THREE.MeshBasicMaterial( { map: texture } );
      const sun = new THREE.Mesh( geometry, material );
      sun.name = 'SUN'
      sun.position.set(0,0,0)
      scene.add( sun );


      const planetsGroup = new THREE.Group();
      planetsGroup.name = 'planets';

      const orbitsGroup = new THREE.Group();
      orbitsGroup.name = 'orbits';

      const spinsGroup = new THREE.Group();
      spinsGroup.name = 'spins';

      for(let i = 0; i <= 7; i++) {

          // if (i >= 1) {
            geometry = new THREE.TorusGeometry( 0.1 *((i+1) * 150 + 50), 0.1, 16, 100 );
            material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: orbitOpacity, transparent: true } );
            const torus = new THREE.Mesh( geometry, material );
            orbitsGroup.add( torus );

            //TODO spin of planet
            // geometry = new THREE.TorusGeometry( (i+1) * 100, 1, 16, 100, Math.PI*2 );
            // material = new THREE.MeshBasicMaterial( { color: 0xe40000 } );
            // const spin = new THREE.Mesh( geometry, material );
            // spinsGroup.add( spin );
          // }

          const planetGroup = new THREE.Group();
          planetGroup.name = `'planet${i}`
          planetGroup.position.set(0, 0, 0);
          geometry = new THREE.SphereGeometry( 0.1*( 5 * textures[Object.keys(textures)[i]].size), 32, 16 );
          texture = new THREE.TextureLoader().load(textures[Object.keys(textures)[i]].path)
          material = new THREE.MeshBasicMaterial( { map: texture } );
          const planet = new THREE.Mesh( geometry, material );
          planetGroup.add(planet);

          planet.position.set(0.1 * ((i+1) * 150 + 50),0,0);
          planet.rotation.set(Math.PI/2, 0, 0)

          planetsGroup.add( planetGroup );
      }

      scene.add( planetsGroup );

      if(orbitsVisible) {
        scene.add( orbitsGroup);
      }

      scene.add( spinsGroup);

      if (!scene.getObjectByName('dirLight1')) {
        const dirLight1 = new THREE.DirectionalLight( 0xffffff );
        dirLight1.position.set( 1, 1, 1 );
        dirLight1.name = 'dirLight1';
        scene.add( dirLight1 );
      }

      if (!scene.getObjectByName('dirLight2')) {

        const dirLight2 = new THREE.DirectionalLight( 0x002288 );
        dirLight2.position.set( - 1, - 1, - 1 );
        dirLight2.name = 'dirLight2';
        scene.add( dirLight2 );
      }

      if (!scene.getObjectByName('ambient')) {
        const ambientLight = new THREE.AmbientLight( 0x222222 );
        ambientLight.name = 'ambient';
        scene.add( ambientLight );
      }


          renderer.setClearColor('#000000')
          renderer.setSize(width, height)
      
          const handleResize = () => {

            let width = mount.current.clientWidth
            let height = mount.current.clientHeight

            width = mount.current.clientWidth
            height = mount.current.clientHeight
            renderer.setSize(width, height)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderScene()
          }


      

      mount.current.appendChild(renderer.domElement)
      window.addEventListener('resize', handleResize)
      start()
  
      // controls.current = { start, stop} //TODO why

      setCollapsed(false)
      
      return () => {

        //TODO remove scene here ?
        stop()
        window.removeEventListener('resize', handleResize);
        if (mount.current) {
          mount.current.removeChild(renderer.domElement)
        }
        // scene.remove(cube)?
        geometry.dispose()
        material.dispose()
      }
    }, [])
  


    return (
      <>
        <div className="Scene" ref={mount}></div>
        <div className={!isCollapsed ? "Scene__Controls Scene__Controls--Show" : "Scene__Controls Scene__Controls--Hide"}>
          <div className="Control">
            <div className="Control__Header">
              CONTROLS
              <div className="Control__Toggle" onClick={(e) => controlToggleHandler(e)}>
              </div>
            </div>
            <div className="Control__Body">
            <label className="container">
              <input type="checkbox" onClick={(e) => { toggleOrbitsVisible(e) }}/>
              <span className="checkmark"></span>
              Show/Hide orbits
           </label>
           {/* <label className="container">
              <input type="checkbox"/>
              <span className="checkmark" onClick={(e) => { toggleMoonsVisible(e) }}></span>
              Show/Hide moons
           </label> */}
           <label className="container">
             Rotations time
              <input type="range"  onChange={(e) => { rotationsTimeChange(e) }}/>
              <span className="checkmark"></span>
           </label>
           <label className="container">
             Orbits opacity
              <input type="range" onChange={(e) => {orbitsOpacityChange(e)}} min="10"/>
              <span className="checkmark"></span>
           </label>
           <div className="Control__Actions">
            Actions:
            <label className="container">
                <button onClick={(e) => startAnimation(e)}>Start</button>
            </label>
            <label className="container">
                <button onClick={(e) =>stoptAnimation(e)}>Stop</button>
            </label>
            <label className="container">
                <button onClick={(e) => centerScene(e)}>Center</button>
            </label>
            <label className="container">
                <button onClick={(e) => resetScene(e)}>Reset</button>
            </label>
          </div>
            </div>
          </div>
        </div>
      </>
    )
  }