import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Float, OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei'

// Advanced 3D Component with deeper visual impact
const AnimatedShape = ({ color }) => (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.2, 64, 64]} scale={2.0}>
            <MeshDistortMaterial
                color={color}
                speed={1.5}
                distort={0.4}
                radius={1}
                wireframe
                opacity={0.15}
                transparent
                emissive={color}
                emissiveIntensity={0.2}
            />
        </Sphere>
    </Float>
)

const DetailScene = ({ color }) => (
    <>
        <Stars radius={100} depth={50} count={6000} factor={6} saturation={0} fade speed={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={color} intensity={2} />
        <AnimatedShape color={color} />
        <OrbitControls enableZoom={false} />
    </>
)

const ServiceDetailCanvas = ({ color }) => {
    return (
        <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}>
            <Suspense fallback={null}>
                <DetailScene color={color} />
            </Suspense>
        </Canvas>
    )
}

export default ServiceDetailCanvas
