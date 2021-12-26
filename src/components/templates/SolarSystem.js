
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useRef, useEffect, useState} from 'react'

export function SolarSystem({planetId, infoId, onInfoSelect}) {
    const mount = useRef(null)
    const controls = useRef(null)
    
    useEffect(() => {
      let width = mount.current.clientWidth
      let height = mount.current.clientHeight
      let frameId
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

      
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.listenToKeyEvents( window );
        
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 500;

        controls.maxPolarAngle = Math.PI / 2;
  
      camera.position.z = 4
      const geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
      const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

      for ( let i = 0; i < 500; i ++ ) {

          const mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = Math.random() * 1600 - 800;
          mesh.position.y = 0;
          mesh.position.z = Math.random() * 1600 - 800;
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          scene.add( mesh );

      }

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
        // cube.rotation.x += 0.01
        // cube.rotation.y += 0.01
  
        renderScene()
        frameId = window.requestAnimationFrame(animate)
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