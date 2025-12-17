module.exports = {activateTimes}

function activateTimes(elem, type, n, handler){
    let count = 0
    let newhandler = (e) => {
        count += 1
        if(count === n){
            elem.removeEventListener(type, newhandler)
        }
        elem.addEventListener(type, newhandler)
    }
}

Promise.all([
    Promise.resolve("all ok"),
        new Promise((res, rej) => setTimeout(rej("epic fail"), 1000))
])
.then(console.log)
.catch(console.log)
.then(() => console.log("done"))
.catch(() => console.log("an error occured"))

function swapIdType(id: number | string): number | string {
    if (typeof id === "string") {
        return parseInt(id);
    } else {
        return id.toString();
    }
    }


document.body.addEventListener("click", event => {console.log(e.target.tagName)})
document.querySelector('header').addEventListener('click', event => {console.log(e.currentTarget.tagName)
e.stopPropagation()})

document.querySelector('ul').addEventListener('click', (e) => {console.log(e.currentTarget.tagName)})


const app = express();

app.get('/network_health', async (req, res) => {
    const {timeout, } = req.query;
    const checkCommands = ['ping -c 1 google.com', 'curl -s --head http://example.com'];
    try{
        await Promise.all([checkCommands.map(cmd=> cmd &&)])
    }
})