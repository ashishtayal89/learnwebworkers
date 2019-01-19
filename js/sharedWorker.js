let ports = [];
let i = 0;

this.addEventListener("connect", (e) => {
    console.log(e);
    let port = e.ports[0];
    port.start();
    ports.push(port);
    port.addEventListener("message", (e) => {
        console.log(e.data);
    })
})

setInterval(() => {
    i++;
    for (let port of ports) {
        i < 100 ? port.postMessage(i) : port.close();
    }
}, 1000);