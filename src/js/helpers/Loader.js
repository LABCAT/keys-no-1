import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  let { progress } = useProgress()
  progress = progress.toFixed(2);
  return (
    <Html center className="loader">
      {progress}% loaded
    </Html>
  )
}
