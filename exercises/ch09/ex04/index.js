export function Warrior(atk) {
  this.atk = atk;
}

Warrior.prototype.attack = function () {
  return this.atk * 2;
};

export function MagicWarrior(mgc, atk) {
  this.atk = atk;
  this.mgc = mgc;
}

MagicWarrior.prototype = Object.create(Warrior.prototype);
MagicWarrior.prototype.attack = function () {
  return this.mgc + this.atk;
};

export class WarriorClass {
  constructor(atk) {
    this.atk = atk;
  }
  attack() {
    return this.atk * 2;
  }
}

export class MagicWarriorClass extends WarriorClass {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }
  attack() {
    return this.mgc + this.atk;
  }
}
