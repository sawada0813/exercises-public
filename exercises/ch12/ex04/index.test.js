import { seiveOfEratosthenes } from "./index.js";

test("seiveOfEratosthenes", () => {
  const generator = seiveOfEratosthenes();
  expect(generator.next().value).toBe(2);
  expect(generator.next().value).toBe(3);
  expect(generator.next().value).toBe(5);
  expect(generator.next().value).toBe(7);
  expect(generator.next().value).toBe(11);
  expect(generator.next().value).toBe(13);
  expect(generator.next().value).toBe(17);
  expect(generator.next().value).toBe(19);
  expect(generator.next().value).toBe(23);
  expect(generator.next().value).toBe(29);
  expect(generator.next().value).toBe(31);
  expect(generator.next().value).toBe(37);
  expect(generator.next().value).toBe(41);
  expect(generator.next().value).toBe(43);
  expect(generator.next().value).toBe(47);
  expect(generator.next().value).toBe(53);
  expect(generator.next().value).toBe(59);
  expect(generator.next().value).toBe(61);
  expect(generator.next().value).toBe(67);
  expect(generator.next().value).toBe(71);
  expect(generator.next().value).toBe(73);
  expect(generator.next().value).toBe(79);
  expect(generator.next().value).toBe(83);
  expect(generator.next().value).toBe(89);
  expect(generator.next().value).toBe(97);
  expect(generator.next().value).toBe(101);
  expect(generator.next().value).toBe(103);
  expect(generator.next().value).toBe(107);
  expect(generator.next().value).toBe(109);
  expect(generator.next().value).toBe(113);
  expect(generator.next().value).toBe(127);
  expect(generator.next().value).toBe(131);
  expect(generator.next().value).toBe(137);
  expect(generator.next().value).toBe(139);
  expect(generator.next().value).toBe(149);
  expect(generator.next().value).toBe(151);
  expect(generator.next().value).toBe(157);
  expect(generator.next().value).toBe(163);
  expect(generator.next().value).toBe(167);
  expect(generator.next().value).toBe(173);
  expect(generator.next().value).toBe(179);
  expect(generator.next().value).toBe(181);
  expect(generator.next().value).toBe(191);
  expect(generator.next().value).toBe(193);
});