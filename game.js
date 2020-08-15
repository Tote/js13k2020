import Gloop from './gloop/Gloop.js'
import BrowserEvent from './gloop/BrowserEvent.js'
import Platform from './items/Platform.js'
import Character from './items/Character.js'

/**********************************************/
/** OBJECT CREATION                        **/
/**********************************************/
const game = Gloop.createGame()


const ground = new Platform()
ground.vx = 0
ground.size({w: game.width(), h: 50})
ground.moveTo({x: 0, y: game.height() - ground.h})
game.add(ground)

const platform = new Platform()
platform.moveTo({x: game.width(), y:ground.y - platform.h})
game.add(platform)

const character = new Character()
character.moveTo({x: 200, y: 500})
game.add(character)

/**********************************************/
/**  GAME RULES                              **/
/**********************************************/
game.rule({
    every: 1000,
    then: t => console.log(`It's ${t}!`)
})
game.rule({
    when: () => character.collidesWith(ground),
    then: () => character.inellasticCollision(ground)
})
game.rule({
    when: () => character.collidesWith(platform),
    then: () => character.inellasticCollision(platform)
})

/**********************************************/
/**  CONTROLS                                **/
/**********************************************/
const press = new BrowserEvent('keydown')
press.rule({
    when: e => e.key == ' ',
    then: () => character.jump()
})

game.run()