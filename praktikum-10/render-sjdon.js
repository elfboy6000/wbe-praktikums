function renderSJDON(node, parent) {
    // If it's null/undefined/false -> render nothing
    if (node === null || node === undefined || node === false) return;

    // If it's a string/number -> create text node
    if (typeof node === "string" || typeof node === "number") {
        parent.appendChild(document.createTextNode(String(node)));
        return;
    }

    // If it's an array -> ["tag", (optional attrs), ...children]
    if (Array.isArray(node)) {
        if (node.length === 0) return;

        const tag = node[0];
        const el = document.createElement(tag);

        let startIndex = 1;

        // Optional attributes object at position 1
        const maybeAttrs = node[1];
        if (
            maybeAttrs &&
            typeof maybeAttrs === "object" &&
            !Array.isArray(maybeAttrs)
        ) {
            for (const [key, value] of Object.entries(maybeAttrs)) {
                if (value === null || value === undefined) continue;
                el.setAttribute(key, String(value));
            }
            startIndex = 2;
        }

        // Render children
        for (let i = startIndex; i < node.length; i++) {
            renderSJDON(node[i], el);
        }

        parent.appendChild(el);
        return;
    }

    // Any other type -> ignore (or could render as text)
}
