import GameCanvas from "./GameCanvas.js"
import Graphics from "./Graphics.js"

export default class Gloop{
    constructor(graphics){
		this.rules = {timed: [], regular: []}
		this.items = []
		this.looper = fn => window.requestAnimationFrame(fn)
		this.graphics = graphics
	}

	run(timestamp){
		this.graphics.clear()

		this.items.forEach( item => {
			item.next(timestamp)
		})

		this.rules.timed
			.filter(  rule => timestamp > rule.lastExecution + rule.every ) 
			.forEach( rule => {rule.then(timestamp); rule.lastExecution = timestamp} )

		this.rules.regular
			.filter(  rule => rule.when() ) 
			.forEach( rule => rule.then() )

		this.items.forEach( item => {
			item.draw(this.graphics, timestamp)
		})
		
		this.looper( this.run.bind(this) )
	}

	rule( rule ){
		if('every' in rule){
			rule.lastExecution = 0
			this.rules.timed.push(rule)
		}
		else if('when' in rule){
			this.rules.regular.push(rule)
		}
	}
	
	add( item ){
		this.items.push(item)
	}

	height(){
		return this.graphics.output.height()
	}
	width(){
		return this.graphics.output.width()
	}
}

Gloop.createGame = size => {
	const canvas    = new GameCanvas(size)
	const graphics  = new Graphics(canvas)
	const loop      = new Gloop(graphics)

	return loop
}