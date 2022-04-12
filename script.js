const quotes = document.querySelector('.quotes')
const author = document.querySelector('.author')
const image = document.querySelector('.img')
const text = document.querySelector('.text')
const spinner = document.querySelector('.spinner')
const btn = document.querySelector('.button')

function getCharacters() {
   return fetch('https://www.breakingbadapi.com/api/characters')
      .then((res) => {
         if (res.ok) {
            return res.json()
         } else {
            Promise.reject(`Ошибка: ${res.status}`)
         }
      })
}

function getQuotes() {
   return fetch('https://www.breakingbadapi.com/api/quotes')
      .then((res) => {
         if (res.ok) {
            return res.json()
         } else {
            Promise.reject(`Ошибка: ${res.status}`)
         }
      })
}

function randomInteger(min, max) {
   let rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}


function showQotes() {
   getQuotes()
      .then((data) => {
         const onlyBreakingBads = data.filter(item => {
            return item.series !== 'Better Call Saul'
         })
         const randomObj = onlyBreakingBads[randomInteger(0, (onlyBreakingBads.length - 1))]
         quotes.textContent = randomObj.quote
         author.textContent = randomObj.author
      })
      .catch((err) => console.error(err))
}

function showImages() {
   getCharacters()
      .then((data) => {
         data.forEach(item => {
            if (item.name === author.textContent) {
               image.src = item.img
            }
            else if (author.textContent === 'Gus Fring') {
               image.src = 'https://vignette.wikia.nocookie.net/breakingbad/images/1/1f/BCS_S4_Gustavo_Fring.jpg/revision/latest?cb=20180824195925'
            }
            else if (author.textContent === 'Hank Schrader') {
               image.src = 'https://vignette.wikia.nocookie.net/breakingbad/images/b/b7/HankS5.jpg/revision/latest/scale-to-width-down/700?cb=20120620014136'
            }
         })
      })
      .catch(err => console.error(err))
      .finally(() => renderLoading(false))
}

function renderLoading(isLoading) {
   if (isLoading) {
      spinner.classList.add('spinner_visible')
      image.style.display = 'none'
   } else {
      spinner.classList.remove('spinner_visible')
      image.style.display = 'inline-block'
   }
}


btn.addEventListener('click', () => {
   renderLoading(true)
   showQotes()
   showImages()
   text.style.display = 'flex'
})

console.log(123)


