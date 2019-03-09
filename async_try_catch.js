async function* gen (data) {
    for (let i=0; i<data.length; i++) {
        yield await data[i];
    }
}

let m = gen([
    (new Promise(r=>r(0))),
    (new Promise(r=>r(1))),
    (new Promise(r=>r(2))),
    (new Promise((r,rej)=>rej( new Error('error') ))),
    (new Promise(r=>r(3))),
    (new Promise(r=>r(4))),
]);

(async()=>{
    try {
        for await (let i of m) {
            console.log(i);        
        }
    } catch (err) {
        console.log(err.message);
    }
})()
