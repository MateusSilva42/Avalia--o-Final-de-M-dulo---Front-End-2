async function getData(page){

    try{
        const res = await api.get('/character', {
            params: {
                page: 1
            }
        })
        return res.data
    }catch(error){
        console.log(error)
    }
   

   
}

async function getLocations(){

    try{
        const res = await api.get('/location')
        return res.data
    }catch(error){
        console.log(error)
    }
}

async function getEpisodes(){

    try{
        const res = await api.get('/episode')
        return res.data
    }catch(error){
        console.log(error)
    }
}

async function renderCards(page){
    const cardsContainer = document.querySelector('#cards-container')
    let counter = 1

    if(!page) page === 1

    const charData = await getData()

    charData.results.forEach((char)=>{
        const article = document.createElement('article')
        article.classList.add('card')
    
        const divImgContainer = document.createElement('div')
        const imgEl = document.createElement('img')
        imgEl.classList.add('card-image')
        imgEl.src = char.image

        const divCardData = document.createElement('div')
        divCardData.classList.add('card-data')

        const divCharStatus = document.createElement('div')
        divCharStatus.classList.add('char-status')

        const divStatusColor = document.createElement('div')
        divStatusColor.classList.add('status')
        divStatusColor.classList.add(char.status.toLowerCase())


        let cardH3 = document.createElement('h3')
        cardH3.innerText = char.name
       

        let cardP = document.createElement('p')
        cardP.innerText = `${char.status} - ${char.species}`

        divCharStatus.appendChild(divStatusColor)
        divCharStatus.appendChild(cardP)

        divCardData.appendChild(cardH3)
        divCardData.appendChild(divCharStatus)

        divImgContainer.appendChild(imgEl)

        article.appendChild(divImgContainer)
        article.appendChild(divCardData)

        cardsContainer.appendChild(article)

        if(counter%2 === 0){
            const hr = document.createElement('hr')
            hr.classList.add('separator')
            cardsContainer.appendChild(hr)
        }

        counter ++

    })

}

async function getOverallData(){
    const totalChar = await getData()
    const totalLocations = await getLocations()
    const totalEpisodes = await getEpisodes()

    const qtdCharEl = document.querySelector('#qtd-char')
    const qtdLocationsEl = document.querySelector('#qtd-locations')
    const qtdEpisodesEl = document.querySelector('#qtd-episodes')

    qtdCharEl.innerText = totalChar.info.count
    qtdLocationsEl.innerText = totalLocations.info.count
    qtdEpisodesEl.innerText = totalEpisodes.info.count

}



getData()
renderCards()
getOverallData()