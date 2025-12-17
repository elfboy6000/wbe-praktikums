module.exports = { parseToProto };

function parseToProto(json, proto) {
    const obj = JSON.parse(json);
    Object.setPrototypeOf(obj, proto);
    return obj;
}