## Versuche auf der REPL

```js
let F = function (n) { this.a = n }
let f = function () { return this.a }
let fs = function () { "use strict"; return this.a }
let value = new F(12)
value.a
f()
fs()
fs.call({ a: 11, b: 22 })
F(99)
a
let obj = Object.create({ f })
obj
obj.a = "yeah"
obj
obj.f()

Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
```

## Ergänzungen

```js
let student1 = { name: "Bob", age: 21, grades: [4.5, 5.0, 4.5, 5.5] }
let student2 = Object.assign({}, student1)
let student3 = student1
let student4 = {...student1}
[student1===student2, student1===student3, student1===student4]
```

Wie sind die Ergebnisse der Vergleiche der verschiedenen student-Objekte zu erklären? Beachten Sie, sowohl in student2 als auch in student4 neue Objekte erzeugt werden.