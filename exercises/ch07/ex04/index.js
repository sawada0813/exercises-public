const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点: 530
let sum = 0;
data.forEach((value) => {
  sum += value.math;
});
console.log(sum); // 530

// クラスAのchemistryの平均点: 49.44
let average = 0;
data.forEach((value) => {
  average += value.chemistry / data.length;
});
console.log(average); // 49.44444444444444

// 3科目合計点のクラスC内での平均点: 53.15
let classAverage = 0;
data.forEach((value) => {
  classAverage += value.math / data.length / 3;
  classAverage += value.chemistry / data.length / 3;
  classAverage += value.geography / data.length / 3;
});
console.log(classAverage); // 53.14814814814815

// 3科目合計点が最も高い人のname
let nameOfFirstPlace = "";
let maxScore = 0;
data.forEach((value) => {
  const total = value.math + value.chemistry + value.geography;
  if (maxScore < total) {
    nameOfFirstPlace = value.name;
    maxScore = total;
  }
});
console.log(nameOfFirstPlace); // Frank

// 全体のgeographyの標準偏差
let sqrtGeography = 0;
data.forEach((value) => {
  sqrtGeography += value.geography / data.length;
  if (data.indexOf(value) === data.length - 1) {
    // 最後だけ平方根を計算する
    sqrtGeography = Math.sqrt(sqrtGeography);
  }
});
console.log(sqrtGeography); // 7.149203529842406
