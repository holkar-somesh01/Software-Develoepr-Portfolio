import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

const ContactBackground = () => {
    return (
        <group>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.8} />
        </group>
    )
}

const ContactCanvas = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}>
            <Suspense fallback={null}>
                <ContactBackground />
            </Suspense>
        </Canvas>
    )
}

export default ContactCanvas
