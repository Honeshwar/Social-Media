//create queue and export

const kue= require('kue');

const queue = kue.createQueue();//create an queue

module.exports = queue;


// data structure use redis need