import Gloop from './gloop/Gloop.js'

// Game Creation --------------------------------
const game = Gloop.createGame()

game.rule({
    every: 1000,
    then: () => console.log(`New Game in a ${game.height()}x${game.width()} screen`)
})

game.run()