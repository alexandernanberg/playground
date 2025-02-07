/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import {useGLTF} from '@react-three/drei'
import type {Mesh} from 'three'
import type {GLTF} from 'three-stdlib'
import type {ConvexHullColliderProps} from '~/components/physics'
import {ConvexHullCollider} from '~/components/physics'

type GLTFResult = GLTF & {
  nodes: {
    Ramp: Mesh
  }
  materials: Record<string, never>
}

export default function Ramp(props: Omit<ConvexHullColliderProps, 'args'>) {
  const {nodes} = useGLTF('/ramp.glb') as GLTFResult
  const {position} = nodes.Ramp.geometry.attributes

  return (
    <ConvexHullCollider args={[position.array as Float32Array]} {...props}>
      <mesh castShadow receiveShadow geometry={nodes.Ramp.geometry}>
        <meshPhongMaterial color={0xfffff0} />
      </mesh>
    </ConvexHullCollider>
  )
}

useGLTF.preload('/ramp.glb')
