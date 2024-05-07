export function resize(params) {
  let maxWidth = 600
  let maxHeight = 480

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight
  }

  return { maxWidth: maxWidth, maxHeight: maxHeight }
}

export function resize1(params) {
  return {
    maxWidth: (params && params.maxWidth) || 600,
    maxHeight: (params && params.maxHeight) || 480,
  }
}

export function resize2(params) {
  return {
    maxWidth: params?.maxWidth ?? 600,
    maxHeight: params?.maxHeight ?? 480,
  }
}