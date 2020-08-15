export default class BrowserEvent{
    constructor(eventName){
        this.handlers = []
        
        document.addEventListener(eventName, event => {
            const preprocessedEvent = this.preprocess(event)
            this.handlers
                .filter( handler => handler.when(preprocessedEvent) )
                .forEach(handler => handler.then(preprocessedEvent) )
        })
    }
    
    rule( handler ){
        this.handlers.push(handler)
    }

    preprocess(event){
        return event
    }
}