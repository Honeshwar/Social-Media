//worker code that process each time an queue when an job send(add) in queue,add from comment controller when an comment created
const queue = require('../config/kue');

const commentsMailer = require('../mailer/comment_mailer');//import because we have to process all mails after entering in queue,so after entering i need mailer to sent mail

// tell worker to execute(process) job inside queue when any queue enter
queue.process('emails',// it is name of queue which to be process
function(job,done){
console.log('emails worker is processing a job',job);

commentsMailer.newComment(job.data);
done();
})