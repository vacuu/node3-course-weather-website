console.log('Client side js-file is loaded...');

//fetch is an api on browser site
// then and asynch await -> is an api called promises

// query searches for the first element of this type
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// type , .class , #id
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Huhu'

weatherForm.addEventListener('submit', (e) => {
  // event should not have default reload!
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''
  fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return messageOne.textContent = data.error
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    })
  })

  // console.log('Search-Value is: ', location);
})
