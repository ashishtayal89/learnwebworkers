importScripts("helper.js") // URl relative to this file

this.addEventListener("message", (e)=>{
    console.log(e.data);
    console.log(e);
})

let i = 0;
setTimeout(()=>{
    this.postMessage(`counter ${i++}`);
},500);