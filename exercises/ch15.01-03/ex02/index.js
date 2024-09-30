async function importUsername() {
  const { username } = await import("./username.js");
  return username;
}

const button = document.querySelector('#btn')

button.addEventListener("click", () => {
  importUsername().then((username) => {
    const body = document.querySelector('body')
    const h2 = document.createElement('h2')
    h2.textContent = username
    body.append(h2)
  })
})