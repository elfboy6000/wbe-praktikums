## Versuche auf der REPL

```js
let factorial = (n) => n<=1 ? 1 : n * factorial(n-1)
factorial(20)
factorial.doc = "Fakultätsfunktion" 
factorial.created = "26.08.2021"
factorial
factorial(5, 10, 20)
let param = (a, b, c) => [a, b, c]
param(1)
param(1, 2, 3, 4)
let data = [10, 11, 12, 13, 14]
param(42, ...data)
let divmod = (m, n) => [Math.floor(m/n), m%n]
let [div, rest] = divmod(17, 7)
div + rest
```

## Pure Funktionen

```js
let student1 = { name: "Bob", age: 21, grades: [4.5, 5.0, 4.5, 5.5] }
const birthday = (stud) => ({...stud, age: stud.age+1})
birthday(student3)
student3 = birthday(student3)
```

Welche Anforderungen müssen vom Argument der birthday-Funktion erfüllt werden, damit die Funktion wie erwartet arbeitet (nehmen wir an, dass die Erwartungen auch ohne weitere Spezifikation der Funktion ähnlich sind)?	

Noch ein Hinweis zur birthday-Funktion: die Funktion verändert das Argument nicht, sie erzeugt ein neues Objekt. Daher muss das Ergebnis zugewiesen werden. 

## Funktionale Programmierung

```js
const bindRest = (f, ...rest) => (...start) => f(...start, ...rest.reverse())
const parseIntBin = bindRest(parseInt, 2)
parseIntBin('101010')
```

Wie könnte man beschreiben, was die Funktion bindRest macht?


