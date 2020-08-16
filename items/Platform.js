import PhysicItem from "../gloop/PhysicItem.js";

export default class Platform extends PhysicItem{
    constructor(){
        super()
        this.vx = -5
        this.h = 10
        this.w = 200
    }

    draw(g){
        g.color('black')
        g.rect(this)
    }
    

} 