'use client'

import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import Tabs from '../UI/Tabs'

function LogoModel() {
    const { scene } = useGLTF(
        'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images//f-model.glb'
    )
    const ref = useRef<THREE.Group>(null)

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                mesh.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color('#7D7D7D'),
                    metalness: 1,
                    roughness: 0.15,
                    clearcoat: 1,
                    clearcoatRoughness: 0.05,
                })
                mesh.castShadow = true
                mesh.receiveShadow = true
            }
        })
    }, [scene])

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.008
        }
    })

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={[1.5, 1.5, 1.5]}
            rotation={[-Math.PI / 1, 0, Math.PI / 2]}
            position={[0, 0, 0]}
        />
    )
}

function SetupEnvironment({ hdrUrl }: { hdrUrl: string }) {
    const { scene } = useThree()

    useEffect(() => {
        new RGBELoader().load(hdrUrl, (hdrTexture) => {
            hdrTexture.mapping = THREE.EquirectangularReflectionMapping
            scene.environment = hdrTexture
            scene.background = null
        })
    }, [hdrUrl, scene])

    return null
}

export default function AboutTabs() {
    return (
        <section className="flex gap-10 max-sm:gap-3 py-10 items-center justify-center flex-col sm:flex-row">
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
                <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: true }} shadows>
                    <Suspense fallback={null}>
                        <SetupEnvironment hdrUrl="https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images//%20SkiesLL_6.hdr" />
                        <ambientLight intensity={0.4} />
                        <directionalLight position={[2, 2, 2]} intensity={1} castShadow />
                        <LogoModel />
                    </Suspense>
                </Canvas>
            </div>
            <div className="w-full md:w-1/2">
                <p className="text-white text-2xl py-6 max-sm:text-xl">
                    My name is Fedor. I&apos;m a full stack web developer with a passion for creating interactive and responsive web applications.
                    I have experience working with modern web technologies and frameworks. I&apos;m a fast learner and a collaborative team player.
                </p>
                <Tabs />
            </div>
        </section>
    )
}

useGLTF.preload(
    'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images//f-model.glb'
)
