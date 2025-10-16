module.exports = { scriptOfSample }

function scriptOfSample(sample, scripts) {
    for (let script of scripts) {
        if (script.ranges.some(([from, to]) => {
            let code = sample.codePointAt(0);
            return code >= from && code < to;
        })) {
            return script.name;
        }
    }
    return "unknown";
}
