const redis = require('redis');
const bluebird = require('bluebird')
const timebound = 60 * 60 * 24 //1 ngày tính theo giây


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


class RedisManager {
    constructor() {
        this.client = redis.createClient()
        this.client.on('connect', () => {
            console.log('Connected in redis ...');
        })
    }

    static getInstance() {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }

    setKeyNotAlready(key, values, time = timebound, timetype = 'EX') {
        this.client.set(key, values, timetype, time, (err, res) => {
            if (err) {
                console.log(err);
            }
            else console.log('Set time key: ' + key + ', values: ' + values + ' in ' + time + ' second');
        });
    }

    getOneTime(key) {
        return this.client.getAsync(key)
            .then(values => {
                if(values){
                    this.client.del(key);
                    return values;
                }
                
            })
            .catch(err => err);
    }

}

let resssss = RedisManager.getInstance();

resssss.setKeyNotAlready('abc', 'abbbbbbb');

setTimeout(async () => {
   let acc = await resssss.getOneTime('abc');
   console.log(acc);
  // resssss.del('abc');
}, 1000);

setTimeout(async () => {
    let acc = await resssss.getOneTime('abc');
    console.log(acc)
 }, 4000);
 