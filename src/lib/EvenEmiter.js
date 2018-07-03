const Events = require('events');

class EventEmitter extends Event{
    static getInstance(){
        if(!EventEmitter.instance){
            EventEmitter.instance = new EventEmitter();
        }
        return EventEmitter.instance;
    }
}

module.exports = EventEmitter;