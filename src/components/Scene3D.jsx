import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

const FloatingShape = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2 * speed
    meshRef.current.rotation.y = t * 0.3 * speed
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.5
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  )
}

const ParticleField = () => {
  const points = useRef()
  const count = 500
  
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00d4ff" transparent opacity={0.6} />
    </points>
  )
}

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.8} />
      <ParticleField />
      <FloatingShape position={[-3, 1, -2]} color="#00d4ff" speed={0.8} />
      <FloatingShape position={[3, -1, -1]} color="#7c3aed" speed={1.2} />
      <FloatingShape position={[2, 2, -3]} color="#f472b6" speed={0.6} />
      <FloatingShape position={[-2, -2, -2]} color="#00d4ff" speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default Scene3D
export { FloatingShape, ParticleField }