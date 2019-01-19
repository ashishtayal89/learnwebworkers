// DEDICATED WORKER
let worker = new Worker("js/worker.js");
worker.postMessage("hello");
console.log("Main Thread");
worker.addEventListener("message", (e) => {
    console.log(e);
})
setTimeout(() => {
    console.log("Main End");
    worker.terminate();
}, 550);


// SHARED WORKER
let sharedWorker = new SharedWorker("js/sharedWorker.js");
sharedWorker.port.postMessage("Hi");
sharedWorker.port.start();
sharedWorker.port.addEventListener("message",(e)=>{
    console.log(e.data);
})