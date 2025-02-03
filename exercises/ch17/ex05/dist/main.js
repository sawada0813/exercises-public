(() => {
  "use strict";
  function e(e, t, n, l, o) {
    for (let c = 0; c < t; c++)
      for (let t = 0; t < n; t++) {
        const n = e[c][t];
        l.beginPath(),
          l.rect(t * o, c * o, o, o),
          (l.fillStyle = n ? "black" : "white"),
          l.fill(),
          l.stroke();
      }
  }
  const t = document.querySelector("#screen"),
    n = t.getContext("2d"),
    l = document.querySelector("#start"),
    o = document.querySelector("#pause");
  (t.width = 500), (t.height = 500);
  let c = null;
  const r = new Audio("/ch17/ex05/src/decision1.mp3");
  let i = new Array(50)
    .fill(null)
    .map(() =>
      new Array(50).fill(null).map(() => !!Math.floor(2 * Math.random())),
    );
  function a() {
    (i = (function (e) {
      const t = e.map((e) => [...e]);
      for (let n = 0; n < 50; n++)
        for (let l = 0; l < 50; l++) {
          let o = 0;
          for (let t = -1; t <= 1; t++)
            for (let c = -1; c <= 1; c++)
              n + t < 0 ||
                l + c < 0 ||
                (0 === t && 0 === c) ||
                (!0 === e[n + t]?.[l + c] && o++);
          let c = !1;
          0 == e[n][l] && 3 == o
            ? (c = !0)
            : 1 == e[n][l] &&
              (o < 2 || 3 < o ? (c = !1) : (2 !== o && 3 !== o) || (c = !0)),
            (t[n][l] = c);
        }
      return t;
    })(i)),
      e(i, 50, 50, n, 10),
      (c = requestAnimationFrame(a));
  }
  t.addEventListener("click", function (n) {
    const l = t.getBoundingClientRect(),
      o = n.clientX - l.left,
      c = n.clientY - l.top,
      a = Math.floor(c / 10),
      u = Math.floor(o / 10);
    (i[a][u] = !i[a][u]), r.cloneNode().play(), e(i, 50);
  }),
    l.addEventListener("click", () => {
      c || a();
    }),
    o.addEventListener("click", () => {
      c && (cancelAnimationFrame(c), (c = null));
    }),
    e(i, 50, 50, n, 10);
})();
