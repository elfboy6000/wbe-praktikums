interface Colored {
    color?: string;
}

interface Circle {
    radius?: number;
    visible: "yes" | "no";
}

interface ColoredCircle extends Colored, Circle {}


function makeCircle(c: ColoredCircle): ColoredCircle {
    return {
        color: c.color || "blue",
        radius: c.radius || 50,
        visible: c.visible
    };
}

const base: ColoredCircle = {radius: 10, visible: "yes"};
const circle = ColoredCircle = {color: "red"}
const hidden: ColoredCircel = makeCircle({visible: "no"});
const positioned: ColoredCircle = makeCircle({radius:10, x:20, y:20)

