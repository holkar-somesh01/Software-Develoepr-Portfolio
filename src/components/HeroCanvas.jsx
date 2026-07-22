import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
const Scene3D = lazy(() => import('./Scene3D'))

const HeroCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </Canvas>
  )
}

export default HeroCanvas
