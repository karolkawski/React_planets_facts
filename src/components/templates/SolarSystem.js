
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRef, useEffect, useState} from 'react'
import data from '../../data/data.json';
import {textures} from '../../data/testures';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const sceneBloom = new THREE.Scene();
const scene = new THREE.Scene();

let camera, composer, renderer
sceneBloom.background = new THREE.Color('#040414') 

let frameId
let rotationTime = 0.05

const defaults = {
  isCollapsed: false,
  orbitsVisible: true,
  orbitOpacity: 0.05,
}

export function SolarSystem() {
    const mount = useRef(null)
    const [isCollapsed, setCollapsed] = useState(defaults.isCollapsed)
    const [orbitsVisible, setOrbitsVisible] = useState(defaults.orbitsVisible)
    const [orbitOpacity, setOrbitOpacity] = useState(defaults.orbitOpacity)

    const controlToggleHandler = () => setCollapsed(!isCollapsed);

    const render3D = () => {
      composer.render();
    }

    const resetScene = () => {
      rotationTime = 0.005;
    }

    const toggleOrbitsVisible = () => {
      setOrbitsVisible(!orbitsVisible);
      const orbits = scene.getObjectByName('orbits').children;

      orbits.map((orbit) => {
        orbit.visible = !orbitsVisible
      })
    }

    
    const orbitsOpacityChange = (e) => {
      const value = Number.parseInt(e.currentTarget.value)/100;
      const orbit = scene.getObjectByName('orbits');

      setOrbitOpacity(0.4 * value);

      if (orbitsVisible) {
        const orbits = orbit.children;

        orbits.map((orbit) => {
          orbit.material.opacity = orbitOpacity
        })
      }
    }

    const rotationsTimeChange = (e) => {
      const value = Number.parseInt(e.currentTarget.value)/10000;
      rotationTime = value;
    }

    const animatePlanets = () => {
      const planetsGroup = scene.getObjectByName('planets').children;
      planetsGroup.forEach((planetGroup, index) => {
        const planetData = data[Object.keys(data)[index]];
        const rotation = {value: Number.parseFloat(planetData.rotation.split(' ')[0]), unit: planetData.rotation.split(' ')[1]};
        const revolution = {value: Number.parseFloat(planetData.revolution.split(' ')[0]), unit: planetData.revolution.split(' ')[1]};

        switch ('a', rotation.unit) {
          case 'Days':
            planetGroup.rotation.z += (0.1 * Math.PI / 180) * (100*rotationTime) * revolution.value/10;
            planetGroup.children[0].rotation.y +=  (0.1 * Math.PI / 180)* (100*rotationTime)

            break;
          case 'Hours':
            planetGroup.rotation.z += (0.1 * Math.PI / 180) * (80*rotationTime) * (revolution.value/(24/10));
            planetGroup.children[0].rotation.y +=  (0.1 * Math.PI / 180)* (80*rotationTime)
            
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

    const animate = () => {
      render3D()
      frameId = window.requestAnimationFrame(animate);
      animatePlanets()
    }
    
    useEffect(() => {

      resetScene();

      document.querySelector('.scrollbar-container').classList.remove('ps', 'ps--active-y');
      document.querySelector('.App__Main').classList.add('App__Main--System');

      let width = mount.current.clientWidth
      let height = mount.current.clientHeight
  
      camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);

      window.camera = camera;
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
      renderer.setClearColor( 0x000000, 0 ); // second param is opacity, 0 => transparent
      renderer.autoClear = false;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.listenToKeyEvents( window );
      
      controls.enableDamping = true; 
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
        sceneBloom.remove(sceneBloom.getObjectByName('SUN'));

      }catch {

      }
      let geometry, texture, material;

      const planetsGroup = new THREE.Group();
      planetsGroup.name = 'planets';

      const orbitsGroup = new THREE.Group();
      orbitsGroup.name = 'orbits';

      const spinsGroup = new THREE.Group();
      spinsGroup.name = 'spins';

      for(let i = 0; i <= 7; i++) {

          geometry = new THREE.TorusGeometry( 0.1 *((i+1) * 150 + 50), 0.1, 16, 100 );
          material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: orbitOpacity, transparent: true } );
          const torus = new THREE.Mesh( geometry, material );
          orbitsGroup.add( torus );

          const planetGroup = new THREE.Group();
          planetGroup.name = `'planet${i}`
          planetGroup.position.set(0, 0, 0);
          geometry = new THREE.SphereGeometry( 0.1*( 5 * textures[Object.keys(textures)[i]].size), 32, 16 );
          texture = new THREE.TextureLoader().load(textures[Object.keys(textures)[i]].path)
          material = new THREE.MeshBasicMaterial( { map: texture } );
          const planet = new THREE.Mesh( geometry, material );
          // planet.layers.set(0)
          planetGroup.add(planet);

          planet.position.set(0.1 * ((i+1) * 150 + 50),0,0);
          planet.rotation.set(Math.PI/2, 0, 0)

          planetsGroup.add( planetGroup );
      }

      scene.add( planetsGroup );

      geometry = new THREE.SphereGeometry( 10, 32, 16 );
      texture = new THREE.TextureLoader().load('./assets/2k_sun.jpg')
      material = new THREE.MeshBasicMaterial( { map: texture } );
      const sun = new THREE.Mesh( geometry, material );
      sun.name = 'SUN'
      sun.position.set(0,0,0)
      sceneBloom.add( sun );
      
      if(orbitsVisible) {
        scene.add( orbitsGroup);
      }

      scene.add( spinsGroup);

  
      const handleResize = () => {

        let width = mount.current.clientWidth;
        let height = mount.current.clientHeight;

        width = mount.current.clientWidth;
        height = mount.current.clientHeight;
        camera.aspect = width / height;
        composer.aspect = width / height;

        composer.setSize(window.innerWidth, window.innerHeight);
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.updateProjectionMatrix();
        render3D();
      }

      mount.current.appendChild(renderer.domElement)
      window.addEventListener('resize', handleResize)
      start()
  
   // POST PROCESSING
    
    let clearPass = new ClearPass();

      const renderScene = new RenderPass( sceneBloom, camera );
      renderScene.clear = false;
      const renderSUNScene = new RenderPass( scene, camera );
      renderSUNScene.clear = false;

      
      const params = {
				exposure: 2,
				bloomStrength: 3,
				bloomThreshold: 0.50,
				bloomRadius: 1
			};

      const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      bloomPass.threshold = params.bloomThreshold;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;


      let outputPass = new ShaderPass(CopyShader)
      outputPass.renderToScreen = true

      composer = new EffectComposer( renderer );
      composer.renderToScreen = true;
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.addPass( clearPass );
      composer.addPass( renderScene );
      composer.addPass( bloomPass );
      composer.addPass( renderSUNScene );
      composer.addPass( outputPass );

      setCollapsed(false);

      
      return () => {

        stop()
        window.removeEventListener('resize', handleResize);
        if (mount.current) {
          mount.current.removeChild(renderer.domElement)
        }
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
              <input type="checkbox" onClick={(e) => { toggleOrbitsVisible(e) }} defaultChecked="true"/>
              <span className="checkmark"></span>
              Show/Hide orbits
           </label>
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
            </div>
          </div>
        </div>
      </>
    )
  }