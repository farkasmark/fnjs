// https://www.linkedin.com/pulse/function-data-structures-javascript-basics-kevin-greene
// https://en.wikipedia.org/wiki/Church_encoding
// https://gist.github.com/arian/9fa076e037334bf195da
// http://matt.might.net/articles/js-church/

const succ = (num) => (fn, x) => fn(num(fn, x))

const zero = (fn, x) => x
const one = succ(zero);
const two = succ(one);
const three = succ(two);
const four = succ(three);
const five = succ(four);
const six = succ(five);
const seven = succ(six);
const eight = succ(seven);
const nine = succ(eight);
const ten = succ(nine);

const toNumber = (num) => num((acc) => acc + 1, 0)

// Addition of two Church Numerals
const add = (m, n) => m(fn => succ(fn, one), n)
const mul = (m, n) => m(fn => add(fn, n), zero)

console.log(toNumber(add(five, four))); // -> 9
console.log(toNumber(add(ten, two))); // -> 12
console.log(toNumber(mul(ten, two))); // -> 20

const toBoolean = (bool) => bool(true, false)

const True = (trueValue, _) => trueValue
const False = (_, falseValue) => falseValue

const not = (bool) => bool(False, True)
const and = (left, right) => left(right, left)
const or = (left, right) => left(left, right)

console.log(toBoolean(True)); // -> true
console.log(toBoolean(False)); // -> false

console.log('not')
console.log(toBoolean(not(True))); // -> false
console.log(toBoolean(not(False))); // -> true

console.log('and')
console.log(toBoolean(and(False, False))); // -> false
console.log(toBoolean(and(True, False))); // -> false
console.log(toBoolean(and(False, True))); // -> false
console.log(toBoolean(and(True, True))); // -> true

console.log('or')
console.log(toBoolean(or(False, False))); // -> false
console.log(toBoolean(or(True, False))); // -> true
console.log(toBoolean(or(False, True))); // -> true
console.log(toBoolean(or(True, True))); // -> true