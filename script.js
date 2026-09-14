const gameLoggerForm = document.querySelector("#gameLoggerForm")
const gameContainer = document.querySelector("#gameContainer")

// Code for making the GameLogger work
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

        gameArray.push(data)
    }
    gameArray.push(data)
    
    localStorage.setItem("gameinfo", JSON.stringify(gameArray))

    createGameCards()
})



function createGameCards() {
    const getGames = JSON.parse(localStorage.getItem("gameinfo")) || []

    gameContainer.innerHTML = ""

    getGames.forEach(({gameName, status, rating, picture}) => {
        const containDiv = document.createElement("div")

        const gameNameP = document.createElement("p")
        gameNameP.textContent = gameName
        
        const statusP = document.createElement("p")
        statusP.textContent = status

        const ratingP = document.createElement("p")
        ratingP.textContent = rating

        const img = document.createElement("img")
        img.src = picture

        containDiv.append(gameNameP, statusP, ratingP, img)
        gameContainer.append(containDiv)


    })

}
