const stats = require("./stats.cjs");
const BisSet = require("./sets.cjs").BisSet;

const s = new BisSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
const average = stats.mean([...s]);

console.log(average);
