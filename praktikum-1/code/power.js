module.exports = {power}

function power(base, exponent) {
    if(typeof base === 'bigint' && typeof exponent === 'bigint') {
        if (exponent === 0n) {
            return 1n;
        } else {
            if (exponent % 2n === 0n) {
                const halfPower = power(base, exponent / 2n);
                return halfPower * halfPower;
            }else{
                return base * power(base, exponent - 1n);
            }
        }
    }else{
        assert(Number.isInteger(base) && base >= 0, "base should be a non-negative integer");
        assert(Number.isInteger(exponent) && exponent >= 0, "Exponent should be a non-negative integer");
        if (exponent === 0) {
            return 1;
        } else {
            if (exponent % 2 === 0) {
                const halfPower = power(base, exponent / 2);
                return halfPower * halfPower;
            }else{
                return base * power(base, exponent - 1);
            }
        }
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed")
}