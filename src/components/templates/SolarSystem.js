
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRef, useEffect, useState} from 'react'
import data from '../../data/data.json';

const scene = new THREE.Scene();
window.scene = scene;


export function SolarSystem({planetId, infoId, onInfoSelect}) {
    const mount = useRef(null)
    const controls = useRef(null)

    
    const splitArrayToPositions = (inputArray) => {
      var perChunk = 3 // items per chunk    

        return inputArray.reduce((resultArray, item, index) => { 
          const chunkIndex = Math.floor(index/perChunk)
  
          if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
          }
  
          resultArray[chunkIndex].push(item)
  
          return resultArray
        }, [])
      }

    
    useEffect(() => {
      let width = mount.current.clientWidth
      let height = mount.current.clientHeight
      let frameId
  
      const camera = new THREE.PerspectiveCamera(75, width / height, 19, 1000);
      window.camera = camera;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

      
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.listenToKeyEvents( window );
        
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 600;

        // controls.maxPolarAngle = Math.PI / 2;
        camera.position.z = 600;

        let geometry = new THREE.SphereGeometry( 10, 32, 16 );
        let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const sun = new THREE.Mesh( geometry, material );
        sun.position.set(0,0,0)
        scene.add( sun );


        const planetsGroup = new THREE.Group();
        planetsGroup.name = 'planets';

        const orbitsGroup = new THREE.Group();
        orbitsGroup.name = 'orbits';

        for(let i = 0; i <= 7; i++) {

          if (i >= 1) {
            let radius   = (i) * 50;
            let segments = 64;
            material = new THREE.LineBasicMaterial( { color: 0xcccccc, transparent: true, opacity: 0.1 } );
            geometry = new THREE.CircleGeometry( radius, segments );
            orbitsGroup.add( new THREE.Line( geometry, material ) );
          }

          const planetGroup = new THREE.Group();
          planetGroup.name = `'planet${i}`
          planetGroup.position.set(0, 0, 0);
          geometry = new THREE.SphereGeometry( 5, 32, 16 );
          material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
          const planet = new THREE.Mesh( geometry, material );
          planetGroup.add(planet);

          planet.position.set((i+1) * 50,0,0)
          planetsGroup.add( planetGroup );
        }

        scene.add( planetsGroup );
        scene.add( orbitsGroup);

    // To get a closed circle use LineLoop instead (see also @jackrugile his comment):
    // scene.add( new THREE.LineLoop( geometry, material ) );

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
          const scale = 0.1
          
          switch (rotation.unit) {
            case 'Days':
             planetGroup.rotation.z += earthYear * rotation.value * scale;
              break;
            case 'Hours':
              planetGroup.rotation.z += earthYear * rotation.value * 24 * scale;
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
        window.removeEventListener('resize', handleResize)
        mount.current.removeChild(renderer.domElement)
  
        // scene.remove(cube)?
        geometry.dispose()
        material.dispose()
      }
    }, [])
  


    return (
        <div className="Scene" ref={mount}></div>

    )
  }