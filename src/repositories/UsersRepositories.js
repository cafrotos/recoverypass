const BaseRepositories = require('./BaseRepositories');

class UserRepositories extends BaseRepositories{
    constructor(){
        super('users');
    }
}