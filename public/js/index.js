console.log('From client side javascript')
const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTw0 = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTw0.textContent = ''
    fetch("http://localhost:3000/weather?address=" + location)
        .then(
            (response) => {
                response.json().then((data) => {
                    if (data.error) return messageOne.textContent = (data.error)
                    messageOne.textContent = 'Forecast :' + (data.location)
                    messageTw0.textContent = 'Location :' + ((data.forecast))
                });
            }
        )
})
// fetch('http://puzzle.mead.io/puzzle').then(
//     (response) => {
//         response.json().then((data) => {
//             if (data.error) console.log(data.error)
//             console.log((data))
//         });
//     }
// )