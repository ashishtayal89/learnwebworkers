# Web Workers
A step by step guide to web workers

## Introduction

Since the user has processor which are of multiple core so web application take advantage of this and use web workers which help is using the core or the user system. Every worker starts a new process which needs a CPU core to start. Every worker has its own memory allocation and processing power.

1. Create a `index.html` file
2. Run `npm start`.

### Sending Message

#### Copy
1. Generaly the data send to the webworker is the copy of the object being used in the main thread.
2. This is important because we can't have 2 threads working on the same object.

`worker.postMessage(ab);`

#### Transfer
1. If you want to explicitly pass/transfer the same object to the worker then you need to specify that in an array.
2. In this case the main thread will no longer have the reference to that object.
3. Eg : If you pass an object of `let ab = new ArrayBuffer(32)` then the ArrayBuffer would be cleared out and you would get `ab.byteLength` as 0.
4. Although transfering is much faster but the only objects that can be transfered at the moment are ArrayBuffer and MessagePorts.

`worker.postMessage(ab, [ab]);`

### Message Types
Types of data that can be send to a worker are :
1. **primite**
2. **json objects**
3. **file**
4. **blow**
5. **ArrayBuffer**

**Note** : Functions are not allowed to be passed to the workers so we need to create a workaround for that.

### Worker API

1. Stardard API like JSON, setTimeout, Math, Object etc
2. WebSockets
3. XHR and fetch 
4. Promise 
5. IndexDB
6. location(Partially)
7. navigator(Partially)
 
 ### Adding Additional Scripts

 Provide the relative path for the script as `importScript("js/helper.js")`. This url is relative to the script in which they are called.

 ### Worker Types

1. **Dedicated Workers** 
    1. They are dedicated a single page/tab.
    2. They can be created using `new Worker()`.
    3. Works in single exection context.
2. **Share Workers**
    1. Share accross multiple execution context. 
    2. Like we can have a shared worker b/w an app and an iframe, 2 tabs or 2 individual workers.
    3. It acts as a singleton and everything in that browser session can access it.

### Dedicated worker lifecycle

1. Create ---> Destroy
2. Create is done using `new Worker()`
3. Destroy is done using `close()` inside the worker or `worker.terminate()` outside the worker.
4. **Note** : There is no way to find out if the worker has been distroyed. So the application should be able to handle the state when there is no worker.

### Shared worker lifecycle

1. Create ---> Connect ---> Start ---> Destroy
2. Create is done using `new SharedWorker()`
3. Connect is done using the `connect` listner of SharedWorker.
4. Start is done using the `start` method of port.
5. Destroy is done using `close` method of worker.

**Note** : To inspect or see the logs of shared worker you would need to go to `chrome://inspect`

### RPC(Remote Procedure Calls)

 <img width="526" alt="screenshot 2019-01-19 at 8 34 38 pm" src="https://user-images.githubusercontent.com/46783722/51428453-cbcda680-1c29-11e9-8320-87ac9c3f1f26.png">

### Copying Functions

**Steps :**
1. Convert function to string.
2. Get the function arguments and body using regex.
3. Use `Function` constructor function to create new function using the function arguments and body.

### Error Handling

**Steps :**
1. Don't return an error form the worker but handle it in the worket itself.
2. Wrap it inside a common response object.
3. Post it to the main thread.
4. Other than this a error event is also fired from the worker which can be listened in the main thread.
