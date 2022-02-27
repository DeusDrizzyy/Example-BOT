const fs = require('fs');

function searchFiles(s, e = "js") {
    let n = fs.readdirSync(s);
    const t = [], o = [];
    for (const r of n)
        if (1 !== r.split(".").length) r.split(".").pop() === e && o.push(`${s}/${r}`);
        else {
            const n = searchFiles(`${s}/${r}`, e);
            t.push(...n);
        }
    return o.length > 0 && t.push({
        directory: s,
        files: o
    }) && t;
}

module.exports.searchFiles = searchFiles;
