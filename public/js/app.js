fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#Message-one')
const messageTwo = document.querySelector('#Message-two')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    cityName = search.value
    fetch('/weather?address=' + cityName).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                //console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
                //console.log(data.location)
                //console.log(data.weather)
            }
            
        })
    })
   //console.log(cityName)
})