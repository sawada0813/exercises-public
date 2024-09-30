window.addEventListener('load', () => {
  // テストで失敗するから追加したが、必要なのかよくわからない
  document.querySelector('#editor-front').style.backgroundColor =
    'white'
})

document.querySelector('#editor-front').addEventListener('click', () => {
  document.querySelector('input').focus();
});

document.querySelector('#editor-back').addEventListener('focus', () => {
  document.querySelector('#editor-front').style.backgroundColor = 'silver'
})

document.querySelector('#editor-back').addEventListener('blur', () => {
  document.querySelector('#editor-front').style.backgroundColor = 'white'
})

document.querySelector('#editor-back').addEventListener('input', () => {
  document.querySelector('#editor-front').textContent = document.querySelector('#editor-back').value
})