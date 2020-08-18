import Gloop from './gloop/Gloop.js'
import BrowserEvent from './gloop/BrowserEvent.js'
import Platform from './items/Platform.js'
import Character from './items/Character.js'
import Level from './items/Level.js'

/**********************************************/
/** OBJECT CREATION                        **/
/**********************************************/
const game = Gloop.createGame()


const ground = new Platform()
ground.vx = 0
ground.size({w: game.width(), h: 50})
ground.moveTo({x: 0, y: game.height() - ground.h})
game.add(ground)

// const platform = new Platform()
// platform.moveTo({x: game.width(), y:ground.y - platform.h})
// game.add(platform)

const level = new Level({w: game.width(), h:game.height() - ground.h})
game.add(level)

const character = new Character()
character.size(level.gridSize)
character.moveTo({x: 2*level.gridSize.w, y: ground.y - character.h})
game.add(character)

/**********************************************/
/**  GAME RULES                              **/
/**********************************************/
game.rule({
    when: () => character.collidesWith(ground),
    then: () => character.inellasticCollision(ground)
})
game.rule({
    when: () => true,
    then: () => 
                level.items
                    .find( p => character.collidesWith(p))
                    ?.inellasticCollision(character, true)
})

/**********************************************/
/**  CONTROLS                                **/
/**********************************************/
const press = new BrowserEvent('keydown')
press.rule({
    when: e => e.key == ' ',
    then: () => character.jump()
})

press.rule({
    when: e => e.key == 'ArrowLeft',
    then: () => level.runLeft()
})
press.rule({
    when: e => e.key == 'ArrowRight',
    then: () => level.runRight()
})

game.run()