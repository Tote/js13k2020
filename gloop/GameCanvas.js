export default class GameCanvas{
    constructor(size){
        this.canvas  = this.createCanvas(size)
        this.context = this.canvas.getContext('2d')
    }

    createCanvas(size){
        //TODO: Remove document dependencies
        const SCROLLBAR_COMPENSATION = 10

        document.body.style.margin = 0
        document.body.style.padding = 0
        
        const canvas    = document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        canvas.width    = size? size.w : document.documentElement.clientWidth - SCROLLBAR_COMPENSATION
        canvas.height   = size? size.h : document.documentElement.clientHeight- SCROLLBAR_COMPENSATION
        
        document.body.appendChild(canvas)

        return canvas
    }

    height(){
        return this.canvas.height
    }

    width(){
        return this.canvas.width
    }

    resize({w, h}){
        this.canvas.width = w,
        this.canvas.height = h
    }
}