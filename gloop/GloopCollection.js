import GloopItem from './GloopItem.js'

export default class GloopCollection extends GloopItem {
    constructor(){
        super()
        this.items = []
    }
    draw(g){
        this.items.forEach( item => item.draw(g) )
    }

    next(){
        this.items.forEach( item => item.next())
    }

    add(item){
        this.items.push(item)
    }

    all( action ){
        this.items.forEach(action)
    }
}