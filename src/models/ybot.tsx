import {useAnimations, useGLTF} from '@react-three/drei'
import {useGraph} from '@react-three/fiber'
import {createMachine} from '@xstate/fsm'
import {useEffect, useMemo, useRef} from 'react'
import type * as THREE from 'three'
import type {Object3D} from 'three'
import type {GLTF} from 'three-stdlib'
import {SkeletonUtils} from 'three/addons/SkeletonUtils'

type GLTFResult = GLTF & {
  nodes: {
    Alpha_Joints: THREE.SkinnedMesh
    Alpha_Surface: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Alpha_Joints_MAT: THREE.MeshStandardMaterial
    Alpha_Body_MAT: THREE.MeshStandardMaterial
  }
}

type ActionName = 'Idle' | 'Run' | 'TPose' | 'Walk'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const characterMachine = createMachine({
  id: 'character',
  initial: 'idle',
  states: {
    idle: {on: {WALK: 'walk'}},
    walk: {on: {RUN: 'run'}},
    run: {on: {WALK: 'walk'}},
  },
})

console.log(characterMachine.transition(characterMachine.initialState, 'WALK'))

function Character(props) {
  const ref = useRef<Object3D>(null)
  const characterRef = forwardedRef || ref
  const {scene, materials, animations} = useGLTF('/ybot.glb') as GLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const {nodes} = useGraph(clone) as unknown as Pick<
    GLTFResult,
    'nodes' | 'materials'
  >

  const {actions} = useAnimations<GLTFActions>(animations, ref)

  const state = 'Idle'
  useEffect(() => {
    const action = actions[state]
    action.play()
    return () => {
      action.stop()
    }
  })

  return (
    <group ref={characterRef} {...props}>
      <group dispose={null} scale={0.01} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.Alpha_Joints.geometry}
          material={materials.Alpha_Joints_MAT}
          skeleton={nodes.Alpha_Joints.skeleton}
          frustumCulled={false}
        />
        <skinnedMesh
          castShadow
          receiveShadow
          geometry={nodes.Alpha_Surface.geometry}
          material={materials.Alpha_Body_MAT}
          skeleton={nodes.Alpha_Surface.skeleton}
          frustumCulled={false}
        />
      </group>
    </group>
  )
}

export default Character

useGLTF.preload('/ybot.glb')
