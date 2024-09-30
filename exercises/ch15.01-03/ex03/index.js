const currentMessage = document.querySelector('p');
const replacedMessage = document.createElement('p');
replacedMessage.textContent = 'Success!'
currentMessage.replaceWith(replacedMessage)