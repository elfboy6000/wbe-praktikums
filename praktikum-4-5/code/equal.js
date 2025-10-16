module.exports = {equal}

function equal(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a != "object" || typeof b != "object") return false;

    let keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || a[key] !== b[key]) return false;
    }

    return true;
}
