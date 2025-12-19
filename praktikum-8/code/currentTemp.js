"use strict";

const https = require("https");

const place = process.argv.slice(2).join(" ").trim();

if (!place) {
    console.error("Usage: node currentTemp.js <place>");
    process.exit(1);
}

// wttr.in JSON format
const url = `https://wttr.in/${encodeURIComponent(place)}?format=j1`;

https
    .get(url, (res) => {
        let data = "";

        // Collect stream chunks
        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            try {
                const json = JSON.parse(data);

                // wttr.in format: current_condition is an array with one object
                const current = json?.current_condition?.[0];
                const tempC = current?.temp_C;

                if (tempC === undefined) {
                    console.error("Could not read temperature from API response.");
                    process.exit(1);
                }

                // Output exactly like the assignment examples: 11°
                process.stdout.write(`${tempC}°\n`);
            } catch (err) {
                console.error("Error parsing JSON:", err.message);
                process.exit(1);
            }
        });
    })
    .on("error", (err) => {
        console.error("HTTPS request failed:", err.message);
        process.exit(1);
    });
