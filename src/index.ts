export interface IconShadowOptions {
  dx?: number
  dy?: number
  stdDeviation?: number
  opacity?: number
  viewBoxScale?: number
}

// so that I don't misspell witdh or heigth
interface Box { x: number; y: number; width: number; height: number }

const warned = new Set<string>()

function warnOnce(msg: string) {
  if (warned.has(msg))
    return
  console.warn('[icon-shadow]', msg)
  warned.add(msg)
}

const startPathRE = /<path/s
const endSvgRE = /<\/svg>/s
const viewBoxRE = /viewBox="([^"]+)"/s

export function insertShadow(svg: string, options: IconShadowOptions = {}): string {
  const {
    dx = 0,
    dy = 0,
    stdDeviation = 1,
    opacity = 0.5,
    viewBoxScale = 1,
  } = options

  const viewBoxValues = svg.match(viewBoxRE)?.[1]

  if (!viewBoxValues) {
    warnOnce('viewBox not found in svg')
    return svg
  }

  const [,, vw, vh] = viewBoxValues.split(' ').map(Number)

  const _dx = vw * dx / 40
  const _dy = vh * dy / 40
  const _stdDeviation = Math.max(vw, vh) * stdDeviation / 40

  const filter = {
    x: -20 * viewBoxScale,
    y: -20 * viewBoxScale,
    width: 100 + 50 * viewBoxScale,
    height: 100 + 50 * viewBoxScale,
  } satisfies Box

  const filterTag = `
  <filter id="shadow" color-interpolation-filters="sRGB" x="${filter.x}%" y="${filter.y}%" width="${filter.width}%" height="${filter.height}%">
    <feDropShadow dx="${_dx}" dy="${_dy}" stdDeviation="${_stdDeviation * 1}" flood-opacity="${opacity}" />
    <feDropShadow dx="${_dx}" dy="${_dy}" stdDeviation="${_stdDeviation * 2}" flood-opacity="${opacity}" />
  </filter>`

  const viewBox = {
    x: vw * -0.1 * viewBoxScale,
    y: vh * -0.1 * viewBoxScale,
    width: vw * (1 + 0.2 * viewBoxScale),
    height: vh * (1 + 0.2 * viewBoxScale),
  } satisfies Box

  return svg
    .replace(endSvgRE, `${filterTag}</svg>`)
    .replace(startPathRE, '<path filter="url(#shadow)"')
    .replace(viewBoxRE, `viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"`)
}
