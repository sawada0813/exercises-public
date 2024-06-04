export const o = {};
o.x = 1;
export const p = Object.create(o);
p.y = 2;
export const q = Object.create(p);
q.z = 3;

export const createFromObject = Object.create(Object);
export const createFromArray = Object.create(Array);
export const createFromDate = Object.create(Date);
export const createFromMap = Object.create(Map);
