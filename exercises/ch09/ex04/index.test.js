import {
  Warrior,
  MagicWarrior,
  WarriorClass,
  MagicWarriorClass,
} from "./index.js";

describe("Prototype", () => {
  it("Warrior", () => {
    const warrior = new Warrior(10);
    expect(Object.hasOwn(warrior, "atk")).toBe(true);
    expect(warrior.attack()).toBe(20);
  });
  it("MagicWarrior", () => {
    const magicWarrior = new MagicWarrior(30, 20);
    expect(Object.hasOwn(magicWarrior, "mgc")).toBe(true);
    expect(magicWarrior.attack()).toBe(50);
  });
});

describe("Class", () => {
  it("Warrior", () => {
    const warrior = new WarriorClass(10);
    expect(Object.hasOwn(warrior, "atk")).toBe(true);
    expect(warrior.attack()).toBe(20);
  });
  it("MagicWarrior", () => {
    const magicWarrior = new MagicWarriorClass(30, 20);
    expect(Object.hasOwn(magicWarrior, "mgc")).toBe(true);
    expect(magicWarrior.attack()).toBe(50);
  });
});
