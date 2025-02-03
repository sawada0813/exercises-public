// Life Game のルールに従ってセルを更新する
export function updateGrid(grid, ROWS, COLS) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  // 1. 近傍の生存セル数が2個未満の場合、そのセルは死ぬ
  // 2. 近傍の生存せるが2or3個の場合、そのセルは生き続ける
  // 3. 近傍の生存セルが3以上の場合、そのセルは死ぬ
  // 4. 近傍の生存セルが３つの生存セルの場合、その死んだ細胞は生き返る

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (row + i < 0 || col + j < 0 || (i === 0 && j === 0)) continue;
          if (grid[row + i]?.[col + j] === true) {
            count++;
          }
        }
      }

      // 割り当て
      let isAlive = false;
      if (grid[row][col] == false && count == 3) {
        isAlive = true;
      } else if (grid[row][col] == true) {
        if (count < 2 || 3 < count) {
          isAlive = false;
        } else if (count === 2 || count === 3) {
          isAlive = true;
        }
      }
      nextGrid[row][col] = isAlive;
    }
  }
  return nextGrid;
}
