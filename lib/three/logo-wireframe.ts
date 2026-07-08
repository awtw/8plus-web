import * as THREE from 'three'

const SVG_SCALE = 0.014

function svgToWorld(x: number, y: number): THREE.Vector3 {
  return new THREE.Vector3((x - 50) * SVG_SCALE, -(y - 50) * SVG_SCALE, 0)
}

export type LogoWireframeLayer = {
  id: 'circle-sm' | 'circle-lg' | 'slash'
  geometry: THREE.BufferGeometry
  position: THREE.Vector3
  /** Intro scatter offset */
  scatterOffset: THREE.Vector3
}

/** Palm anchor — logo sits slightly above center of large circle */
export const LOGO_PALM_ANCHOR = new THREE.Vector3(0.08, 0.42, 0.12)

export function createLogoWireframeLayers(): LogoWireframeLayer[] {
  const layers: LogoWireframeLayer[] = []

  const addCircle = (id: LogoWireframeLayer['id'], cx: number, cy: number, r: number) => {
    const geo = new THREE.TorusGeometry(r * SVG_SCALE, 0.0018, 6, 40)
    geo.rotateX(Math.PI / 2)
    const center = svgToWorld(cx, cy)
    const scatterOffset = new THREE.Vector3(
      (Math.random() - 0.5) * 0.35,
      0.15 + Math.random() * 0.2,
      (Math.random() - 0.5) * 0.2,
    )
    layers.push({ id, geometry: geo, position: center, scatterOffset })
  }

  addCircle('circle-sm', 32, 29, 18)
  addCircle('circle-lg', 70, 64, 28)

  const slashGeo = new THREE.BoxGeometry(0.34, 0.004, 0.055)
  slashGeo.rotateZ(-0.62)
  const slashCenter = svgToWorld(44, 50)
  layers.push({
    id: 'slash',
    geometry: slashGeo,
    position: slashCenter,
    scatterOffset: new THREE.Vector3(-0.12, 0.22, 0.08),
  })

  return layers
}

export function getLogoWorldBounds(layers: LogoWireframeLayer[]) {
  const box = new THREE.Box3()
  for (const layer of layers) {
    const g = layer.geometry.clone()
    g.translate(layer.position.x, layer.position.y, layer.position.z)
    g.computeBoundingBox()
    if (g.boundingBox) box.union(g.boundingBox)
    g.dispose()
  }
  return box
}

export function getLogoWorldBoundsFromArray(layers: LogoWireframeLayer[]) {
  const box = new THREE.Box3()
  for (const layer of layers) {
    const g = layer.geometry.clone()
    g.translate(layer.position.x, layer.position.y, layer.position.z)
    g.computeBoundingBox()
    if (g.boundingBox) box.union(g.boundingBox)
    g.dispose()
  }
  return box
}
