/*
TypeScript-Funktion (auskommentiert)

function findTag(s: string): string | undefined {
  let start = -1;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "<") {
      start = i + 1;

      for (let j = start; j < s.length; j++) {
        if (s[j] === "<") {
          // Neues '<' vor einem '>' => vorheriger Tag ist ungültig,
          // wir starten ab dem neuen '<' erneut
          start = j + 1;
          continue;
        }

        if (s[j] === ">") {
          const tag = s.slice(start, j);

          // Tag darf keine Leerzeichen enthalten und nicht leer sein
          if (tag.length === 0) return undefined;
          if (tag.includes(" ")) return undefined;

          return tag;
        }
      }

      // Wir hatten ein '<', aber kein passendes '>' mehr gefunden
      return undefined;
    }
  }

  return undefined;
}
*/

// ---------------------------------------------------------------------
// Generiertes JavaScript (entspricht obiger TS-Funktion, ohne Typen)

function findTag(s) {
    let start = -1;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "<") {
            start = i + 1;

            for (let j = start; j < s.length; j++) {
                if (s[j] === "<") {
                    start = j + 1;
                    continue;
                }

                if (s[j] === ">") {
                    const tag = s.slice(start, j);

                    if (tag.length === 0) return undefined;
                    if (tag.includes(" ")) return undefined;

                    return tag;
                }
            }

            return undefined;
        }
    }

    return undefined;
}

module.exports = { findTag };
