console.log(typeof undefined)
// 予想: undefined
// 結果: undefined
console.log(typeof null)
// 予想: undefined → ×
// 結果: object
console.log(typeof {})
// 予想: object
// 結果: object
console.log(typeof NaN)
// 予想: number
// 結果: number
console.log(typeof 100)
// 予想: number
// 結果: number
console.log(typeof (()=>{}))
// 予想: function
// 結果: function