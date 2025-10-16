module.exports = { factorial }

function factorial (n) {
    if(typeof n === 'bigint')
        return n<=1n ? 1n : n * factorial(n-1n)
    else
        return n<=1 ? 1 : n * factorial(n-1)
}

function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed")
}