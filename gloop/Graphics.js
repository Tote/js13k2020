export default class Graphics{
    constructor(output){
        this.output = output
        this.context = output.context
    }

    clear(){
        const w = this.output.width()
        const h = this.output.height()
        this.context.clearRect(0,0,w,h)
    }

    color( color ){
        this.context.fillStyle = color
        this.context.strokeStyle = color
    }

    pattern( image ){
        this.context.fillStyle = this.context.createPattern(image, 'repeat')
    }

    rect(item){
        this.context.fillRect(
            item.x,
            item.y,
            item.w,
            item.h)
    }

    circle(item){
        this.context.beginPath()
        this.context.arc(
            item.centerX(),
            item.centerY(),
            Math.min(item.w, item.h),
            0,
            2*Math.PI
        )
        this.context.fill()
    }

    circle2({x, y, r}){
        this.context.beginPath()
        this.context.arc(
            x,
            y,
            r,
            0,
            2*Math.PI
        )
        this.context.fill()
    }

    line(from, to, dashes){
        this.context.beginPath()
        this.context.moveTo(from.x, from.y)
        this.context.lineTo(to.x, to.y)

        if(dashes){
            this.context.setLineDash(dashes)
        }

        this.context.stroke()
    }

    text(text, location, font){
        this.context.font = font
        this.context.fillText(text, location.x, location.y)
    }

    border(item){
        this.context.strokeRect(
            item.x,
            item.y,
            item.w,
            item.h)
    }

    image(image, from, to){
        this.context.drawImage(
            image,
            from.x,
            from.y,
            from.w,
            from.h,
            to.x,
            to.y,
            to.w,
            to.h
        )
    }

    rotatedImage(image, from, to, angle){
        let rotationCenter = {
            x: to.x + to.w/2,
            y: to.y + to.h/2
        }

        let rotatedOrigin = {
            x: -to.w/2,
            y: -to.h/2
        }

        this.context.save()
        this.context.translate(rotationCenter.x, rotationCenter.y)
        this.context.rotate(angle)
        this.image(image, from, {
            x: rotatedOrigin.x,
            y: rotatedOrigin.y,
            w: to.w,
            h: to.h
        })
        this.context.restore()
    }
}