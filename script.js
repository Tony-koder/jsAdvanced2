const gameLoggerForm = document.querySelector("#gameLoggerForm")
const gameContainer = document.querySelector("#gameContainer")
const searchBar = document.querySelector("#searchBar")

// Code for making the GameLogger work

searchBar.addEventListener("input", (e) => {
    createGameCards(e.target.value)
})

function createGameCards( where) {
    let searchFunction;
    if (where) {
        const getGames = JSON.parse(localStorage.getItem("gameinfo"))
        
        searchFunction = getGames.filter(search => search.gameName.includes(where))
        
    } else {
        searchFunction = JSON.parse(localStorage.getItem("gameinfo"))
    }
    
    
    
    gameContainer.innerHTML = ""
    
    searchFunction.forEach(({gameName, status, rating, picture}) => {
        const containDiv = document.createElement("div")
        
        const gameNameP = document.createElement("p")
        gameNameP.textContent = "Name: " + gameName
        
        const statusP = document.createElement("p")
        statusP.textContent = "Status: " + status
        
        const ratingP = document.createElement("p")
        ratingP.textContent = "Rating: "+ rating + "/10"

        const img = document.createElement("img")
        img.src = picture
        
        containDiv.append(gameNameP, statusP, ratingP, img)
        gameContainer.append(containDiv)
        
        
    })
    
}

createGameCards()
gameLoggerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    

    const formData = new FormData(gameLoggerForm)
    const data = Object.fromEntries(formData.entries())

    let gameArray = []

    if (localStorage.getItem("gameinfo")) {
        const allgames = JSON.parse(localStorage.getItem("gameinfo"))

        allgames.forEach((game) => {
            gameArray.push(game)
        })

    }
    gameArray.push(data)
    
    localStorage.setItem("gameinfo", JSON.stringify(gameArray))

    createGameCards()
})