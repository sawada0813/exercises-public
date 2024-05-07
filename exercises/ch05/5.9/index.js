export function canParseJson(jsonString) {
  const result = {};
  try {
    result['data'] = JSON.parse(jsonString)
    result['success'] = true
  } catch(e) {
    result['success'] = false
    result['data'] = e
  }
  return result
}