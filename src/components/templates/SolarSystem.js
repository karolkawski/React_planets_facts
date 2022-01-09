
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRef, useEffect, useState} from 'react'
import data from '../../data/data.json';
import {textures} from '../../data/testures';

const scene = new THREE.Scene();
scene.background =new THREE.Color('#070724')
window.scene = scene;


export function SolarSystem({planetId, infoId, onInfoSelect}) {
    const mount = useRef(null)
    const controls = useRef(null)
    
    useEffect(() => {

      document.querySelector('.scrollbar-container').classList.remove('ps', 'ps--active-y');
      let width = mount.current.clientWidth
      let height = mount.current.clientHeight
      let frameId
  
      const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
      window.camera = camera;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
      const controls = new OrbitControls( camera, renderer.domElement );
      controls.listenToKeyEvents( window );
      
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      // controls.dampingFactor = 0.05;

      controls.screenSpacePanning = false;

      controls.minDistance = 10;
      controls.maxDistance = 800;
      // controls

      // controls.maxPolarAngle = Math.PI/4;
      camera.position.x = 65;
      camera.position.y = -85;
      camera.position.z = 115;
      camera.rotation.x = 0.64;
      camera.rotation.y = 0.43;
      camera.rotation.z = -0.3;

      let geometry = new THREE.SphereGeometry( 10, 32, 16 );
      let texture = new THREE.TextureLoader().load('./assets/2k_sun.jpg')
      let material = new THREE.MeshBasicMaterial( { map: texture } );
      const sun = new THREE.Mesh( geometry, material );
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
            material = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.05, transparent: true } );
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
      scene.add( orbitsGroup);
      scene.add( spinsGroup);

      
      const dirLight1 = new THREE.DirectionalLight( 0xffffff );
      dirLight1.position.set( 1, 1, 1 );
      scene.add( dirLight1 );

      const dirLight2 = new THREE.DirectionalLight( 0x002288 );
      dirLight2.position.set( - 1, - 1, - 1 );
      scene.add( dirLight2 );

      const ambientLight = new THREE.AmbientLight( 0x222222 );
      scene.add( ambientLight );


          renderer.setClearColor('#000000')
          renderer.setSize(width, height)
      
          const renderScene = () => {
            renderer.render(scene, camera)
          }
      
          const handleResize = () => {
            width = mount.current.clientWidth
            height = mount.current.clientHeight
            renderer.setSize(width, height)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderScene()
          }

          const animate = () => {
      
            renderScene()
            frameId = window.requestAnimationFrame(animate);
            animatePlanets()
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

          const animatePlanets = () => {
            const planetsGroup = scene.getObjectByName('planets').children;
            
            const earthYear = 2 * Math.PI * (1 / 60) * (1 / 60);


            planetsGroup.forEach((planetGroup, index) => {
              const planetData = data[Object.keys(data)[index]];
              const rotation = {value: Number.parseFloat(planetData.rotation.split(' ')[0]), unit: planetData.rotation.split(' ')[1]};
              const scale = 0.005;

              
              switch (rotation.unit) {
                case 'Days':
                  planetGroup.rotation.z += earthYear * rotation.value * scale;
                  planetGroup.children[0].rotation.y +=  earthYear * rotation.value * scale ;

                  break;
                case 'Hours':
                  planetGroup.rotation.z += earthYear * rotation.value * 24 * scale;
                  planetGroup.children[0].rotation.y +=  earthYear * rotation.value * 24* scale ;
                  
                  break;
                default: break;
              }

            })
          }
  
      mount.current.appendChild(renderer.domElement)
      window.addEventListener('resize', handleResize)
      start()
  
      controls.current = { start, stop }
      
      return () => {
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
        <div className="Scene__Controls">
          <div class="Control">
            <div class="Control__Header">
              CONTROLS
              <div class="Control__Toggle">></div>
            </div>
            <div class="Control__Body">
            <label class="container">
              <input type="checkbox"/>
              <span class="checkmark"></span>
              Show/Hide orbits
           </label>

           <label class="container">
              <input type="checkbox"/>
              <span class="checkmark"></span>
              Show/Hide moons
           </label>

           <label class="container">
              <input type="checkbox"/>
              <span class="checkmark"></span>
              Show/Hide orbits
           </label>

           <label class="container">
             Time
              <input type="text"/>
              <span class="checkmark"></span>
           </label>


           <div class="Control__Actions">
            Actions

            <label class="container">
                <button>Center</button>
            </label>

            <label class="container">
                <button>Reset</button>
            </label>

          </div>
            
            </div>
            <div class="Control__Footer">
            
            </div>
          </div>
        </div>
      </>

    )
  }