import GloopCollection from '../gloop/GloopCollection.js'
import Platform from './Platform.js'

export default class Level extends GloopCollection{
    constructor(size){
        super()
        this.size = size
        this.rows = 10
        this.cols = 17
        this.gridSize = {w: this.size.w / this.cols, h: this.size.h / this.rows}
        this.position = 0
        this.nextCol = this.cols - 1
        this.speed = 5

        this.map = {
            17: [[9,5]],
            21: [[8,2]],
            22: [[7,2]],
            23: [[6,2]],
            24: [[5,7]],
            32: [[3,5]],
            40: [[3,6]],
            42: [[1,4]]

        }
    }
    
    draw(g){
        super.draw(g)
        // Grid
        const dashes = [1,1]
        const offset = this.position % this.gridSize.w
        for(let i = 0; i < this.size.w; i += this.gridSize.w){
            g.line({x: i - offset,y: 0}, {x:i - offset, y:this.size.h}, dashes)
        }
        for(let j = 0; j < this.size.h; j += this.gridSize.h){
            g.line({x: 0,y: j}, {x:this.size.w, y:j}, dashes)
        }
    }

    next(){
        super.next()
        this.position += this.speed
        const next = this.cols + Math.floor(this.position / this.gridSize.w)

        if(next > this.nextCol){
            console.log(`loadin col ${next}`)
            this.loadCol(next)
            this.nextCol = next
        }
        
    }

    loadCol(c){
        if(c in this.map){
            this.map[c].forEach( platform => this.addPlatform(...platform) )
            console.log(`loaded col ${c}`)
        }
    }

    addPlatform(y, w){
        console.log(`received ${y}, ${w}`)
        const platform = new Platform()
        platform.size({w: w*this.gridSize.w, h: this.gridSize.h})
        platform.moveTo({x:this.size.w, y:y * this.gridSize.h})
        platform.vx = -this.speed
        this.add(platform)
    }
}