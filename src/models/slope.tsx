/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from '@react-three/drei'
import type { Mesh, MeshStandardMaterial } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import type { ConvexHullColliderProps } from '../components/physics'
import { ConvexHullCollider } from '../components/physics'

type GLTFResult = GLTF & {
  nodes: {
    Slope: Mesh
  }
  materials: {
    Slope: MeshStandardMaterial
  }
}

export default function Slope(props: Omit<ConvexHullColliderProps, 'args'>) {
  const { nodes } = useGLTF('/slope.glb') as GLTFResult
  const { geometry } = nodes.Slope
  const vertices = geometry.attributes.position.array as Float32Array

  return (
    <ConvexHullCollider args={[vertices]} {...props}>
      <mesh castShadow receiveShadow geometry={geometry}>
        <meshPhongMaterial color={0xed7200} />
      </mesh>
    </ConvexHullCollider>
  )
}

useGLTF.preload('/stone.gltf')
