export const counterGroup = () => {
  const counterList = [];
  return {
    newCounter: () => {
      let n = 0;
      const id = counterList.length;
      return {
        count: function () {
          const result = n;
          counterList[id] = result;
          n += 1;
          return result;
        },
        reset: function () {
          counterList[id] = 0;
          n = 0;
        },
      };
    },
    total: function () {
      return counterList.reduce((a, b) => a + b, 0);
    },
    average: function () {
      if (counterList.length === 0) {
        throw new TypeError();
      }
      return this.total() / counterList.length;
    },
    variance: function () {
      if (counterList.length < 2) {
        throw new TypeError();
      }
      let result = 0;
      counterList.forEach((n) => {
        result += Math.pow(n - this.average(), 2);
      });
      return result / counterList.length;
    },
  };
};
