## Versuche auf der REPL

```js
.help
let x = 7
x * x - x
_
_ % 10
0.1 + 0.2
1 / 0
2n ** 128n
typof 0.5
typeof "wbe"
"wbe"[0]
`half of 100 is ${100 / 2}`
(x => x * x)(7)
typeof(x => x * x)
console.log(2 ** 6 > 100)
console.clear()

let student1 = { name: "Bob", age: 21, grades: [4.5, 5.0, 4.5, 5.5] }
let student2 = Object.assign({}, student1)
let student3 = student1
let student4 = {...student1}
[student1===student2, student1===student3, student1===student4]
[typeof student1, typeof student1.grades, Array.isArray(student1.grades)]
student1.age = 25
[student1, student2, student3, student4].map(s => s.age)
student1.grades[3] = 6.0
[student1, student2, student3, student4].map(s => s.grades)
student4.grades[6] = 3.0
student4.grades.length
const birthday = (stud) => ({...stud, age: stud.age+1})
birthday(student3)
student3 = birthday(student3)
```