import PhysicItem from "../gloop/PhysicItem.js";

export default class Character extends PhysicItem{
    constructor(){
        super()
        this.h = 10
        this.w = 10
        this.ay = 1
    }

    draw(g){
        g.color('red')
        g.rect(this)
    }

    jump(){
        this.vy = -10
    }

} 