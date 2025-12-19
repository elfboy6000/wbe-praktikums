#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

// -------- Helpers ---------------------------------------------------------

function die(msg) {
    console.error(msg);
    process.exit(1);
}

function parseArgs(argv) {
    // argv: ["node", "csv2json.js", "in.csv", "out.json"]
    if (argv.length < 4) {
        die("Usage: node csv2json.js <input.csv> <output.json>");
    }
    const inputPath = argv[2];
    const outputPath = argv[3];
    return { inputPath, outputPath };
}

function ensureNotSameFile(inputPath, outputPath) {
    // Avoid accidentally overwriting input if user messes up arguments
    const inAbs = path.resolve(inputPath);
    const outAbs = path.resolve(outputPath);
    if (inAbs === outAbs) {
        die("Error: input and output path are the same. Refusing to overwrite.");
    }
}

function normalizeNewlines(text) {
    // Handle Windows CRLF
    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function splitCsvLineSimple(line) {
    // Simple CSV split by comma (matches assignment hint about String.split).
    // NOTE: This does not handle commas inside quoted fields.
    return line.split(",").map((s) => s.trim());
}

function csvToObjects(csvText) {
    const clean = normalizeNewlines(csvText).trim();
    if (clean.length === 0) return [];

    const lines = clean.split("\n").filter((l) => l.trim().length > 0);
    if (lines.length === 0) return [];

    const headers = splitCsvLineSimple(lines[0]);
    const objects = [];

    for (let i = 1; i < lines.length; i++) {
        const values = splitCsvLineSimple(lines[i]);
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j] ?? "";
        }
        objects.push(obj);
    }
    return objects;
}

// -------- Main ------------------------------------------------------------

(function main() {
    const { inputPath, outputPath } = parseArgs(process.argv);
    ensureNotSameFile(inputPath, outputPath);

    // 1) Read CSV synchronously + measure time
    const readStart = process.hrtime.bigint();

    let csvBuffer;
    try {
        csvBuffer = fs.readFileSync(inputPath);
    } catch (e) {
        die(`Error reading input file "${inputPath}": ${e.message}`);
    }

    const readEnd = process.hrtime.bigint();
    const readMs = Number(readEnd - readStart) / 1e6;

    // 2) File info (size, last modified)
    let stat;
    try {
        stat = fs.statSync(inputPath);
    } catch (e) {
        die(`Error stat input file "${inputPath}": ${e.message}`);
    }

    const sizeBytes = stat.size;
    const lastModified = stat.mtime;

    // 3) Parse CSV + measure processing time
    const processStart = process.hrtime.bigint();
    const csvText = csvBuffer.toString("utf-8");
    const records = csvToObjects(csvText);
    const processEnd = process.hrtime.bigint();
    const processMs = Number(processEnd - processStart) / 1e6;

    // 4) Print required info
    console.log(`Input file: ${inputPath}`);
    console.log(`Size: ${sizeBytes} bytes`);
    console.log(`Last modified: ${lastModified.toISOString()}`);
    console.log(`Number of records: ${records.length}`);
    console.log(`Time to read file: ${readMs.toFixed(3)} ms`);
    console.log(`Time to process CSV: ${processMs.toFixed(3)} ms`);

    // 5) Write JSON output
    const jsonText = JSON.stringify(records, null, 2);

    try {
        fs.writeFileSync(outputPath, jsonText, "utf-8");
    } catch (e) {
        die(`Error writing output file "${outputPath}": ${e.message}`);
    }

    console.log(`Wrote JSON to: ${outputPath}`);
})();
