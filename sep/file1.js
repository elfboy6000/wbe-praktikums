console.log(Object.values({a:1,b:2,c:3}).map(n=>n-2)[1] === 0)
console.log(Array.from({0:1,1:2,2:3,length:3}).length === 3)
console.log(typeof((a,b,c)=>a+b-c) === typeof((n=>n)(42)))
console.log((typeof([]) === 'object') && Array.isArray([]))


code 7
function objAssign(){
    cons obj = {a:[], b:10}
    const other = Object.assign({a:1, c:2}, obj)

    console.log("1.", Object.keys(other).length)
    console.log("2.", other.a.length === 0)
    console.log("3.", obj == other)
    console.log("4.", obj.a === other.a)
}

localStorage.setItem(('info', '[{"a":1,"b":2,"length":5,"items":["foo", "bar"]}]'))
localStorage.setItem(('data', {name: "John", age: 28}))

typeof localStorage.data
localStorage.getItem('data')?.age
JSON.parse(localStorage.info)[0]['length']
JSON.parse(localStorage.info).length


code 6
function foo(m,n){
    return [m,n]
}
function bar([m,n]){
    return [n,m]
}
function baz([m,n]){
    return m % n +1
}

code 12
const iterate = (init=0, fn=(n=>n+1)) => {
    let value = init;
    return () => {
        const res = value
        value = fn(value)
        return res
    }
}

const funA = iterate(4)
const funB = iterate(4, n => 2*n)

console.log(funA()) // 4
console.log(funA()) // 5
console.log(funB()) // 4
console.log(funB()) // 8

code 5
const argLen = (...args) => args.length

const argLog = (...args) => {

    console.log(argLen(args))
    console.log(argLen(...args))
    console.log(argLen(args[0]))
}

console.log(argLen(6, 9, 12)) // 0
console.log(argLen(15)) // 3


if({a:1} == {a:1}){
    console.log("Equal")
}
if((()=>0) == (()=>0)){
    console.log("Equal 2")
}


for(i=0; i<10000; i++){
    setTimeout(() => console.log("timeout"), 0)
}
setImmediate(() => console.log("immediate"))

code 14
Array.prototype.string = function() {
    return "[" + this.toString() + "]";
}
String.prototype.string = function() {
    return this.valueOf()
}
Object.prototype.string = function() {
    return JSON.stringify(this)
}

code 15
// Variante A
function Person(name){
    this.name = name
}
Person.prototype.toString = function() {
    return `Person: ${this.name}`;
}
// Variante B
function Person(name){
    this.name = name
    this.toString = function(){
        return `Person: ${this.name}`;
    }
}

code 9
function attachDelagatedEvent(type, node, selector, callback) {
    node.addEventListener(type, (evt) => {
        let selected = evt.target.closest(selector)
        if(selected){
        callback(selected, evt)}
    }
    )
}

const fs = require('fs');
let result = '';

fs.readFile('script.js', () => {
    result += 'A';
    setTimeout(() => {
        result += 'B';
    }, 0);
    setImmediate(() => {
        result += 'C';
        console.log(result);
    })
    result += 'D';
})

const MyInput = ({init="0"}) => {
    let [text, setText] = useState(init)

    const updateValue = e => {
        const n = Number(e.target.value)
        if(n>=0 && n<=100) setText(n.toString())
    }
    return ( <input onInput={updateValue} value={{text}} /> )
}

const App = () => {<MyInput/>}

let node = document.createElement('p');
node.appendChild(document.createTextNode('WBE'))
let addition = document.createElement('span');
addition.appendChild(document.createTextNode('(HS25)'))
node.appendChild(addition)

code 20
function elt (type, attrs, ...children) {
    let node = document.createElement(type)
    Objects.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key])})
    for(let child of children){
        if(['string', 'number'].includes(typeof child){
            node.appendChild(document.createTextNode(child))
        }else{
            node.appendChild(child)
        }
    }
    return node
}

code 21
const createNode = tagName => (first, ...rest) => {
    if(typeof first == 'undefined') {
        return elt(tagName, {})
    }else if(typeof(first) === 'object' && first.nodeType === undefined){
        return elt(tagName, first, ...rest)
    }else{
        return elt(tagName, {}, first, ...rest)
    }
}

code 22
    const TAG_NAMES = ['a', 'body', 'button', ...]

    let domScirpt = () => {
        const results = {}
        TAG_NAMES.forEach(tag => {
            results[tag] = createNode(tag)
        })
        return results
    }


import {useEffect} from "../mini-projekt/code-6/public/lib/suiweb/suiweb-0.3.4";

function fetchData(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({msg: "Components Loaded"});
        }, 2000)})

    const Home = ({start}) => {
        let [state, setState] = React.useState(null);
        useEffect(() => {
            fetchData().then(data => setState(data));}, []);

        return (
            <p>{state ? state?.msg : start}
            </p>
        );
    }
    const App = () => (<Home start="Loading..."/>);
}