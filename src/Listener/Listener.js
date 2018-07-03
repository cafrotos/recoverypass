const eventEmitter = require('../lib/EvenEmiter');
const constants = require('./constant');
const UserRepository = require('../repositories/UsersRepositories')

let events = eventEmitter.getInstance();

events.on(constants.GET_USER, (userInfo) => {
    
})

events.on(constants.SET_NEWPASS, (newPass) => {

})