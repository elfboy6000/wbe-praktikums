const { parseToProto } = require('../parse-to-proto');

describe('parseToProto', () => {
    it('parses JSON and keeps object properties', () => {
        const proto = { category: 'animal' };
        const obj = parseToProto(
            '{"type":"cat","name":"Mimi","age":3}',
            proto
        );

        expect(obj.type).toBe('cat');
        expect(obj.name).toBe('Mimi');
        expect(obj.age).toBe(3);
    });

    it('links the object to the given prototype', () => {
        const proto = { category: 'animal' };
        const obj = parseToProto('{"age":3}', proto);

        expect(obj.category).toBe('animal');
    });

    it('uses proto as prototype (not copy)', () => {
        const proto = { category: 'animal' };
        const obj = parseToProto('{}', proto);

        expect(Object.getPrototypeOf(obj)).toBe(proto);
    });
});
