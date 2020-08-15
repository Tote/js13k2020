export default class GloopItem{
    constructor(){
        this.x  = 0
        this.y  = 0
        this.w  = 0
        this.h  = 0
        this.debug
    }

    draw(graphics, timestamp){}
    next(timestamp){}

    left(){
        return this.x
    }

    right(){
        return this.x + this.w
    }

    centerX(){
        return this.x + (this.w/2)
    }

    top(){
        return this.y
    }

    bottom(){
        return this.y + this.h
    }

    centerY(){
        return this.y + (this.h/2)
    }

    moveTo({x, y}){
        this.x = x,
        this.y = y
    }

    size({w, h}){
        this.w = w,
        this.h = h
    }

    debugOnce( action ){
        if(this.debug){
            action()
            this.debug = false
        }
    }
}