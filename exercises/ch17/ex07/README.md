## tsc

TypeScriptでコーディングする場合は tsc を使用して次の流れで開発することが一般的でした。

1. 型チェック（静的解析）
2. TypeScriptをJavaScriptにトランスパイル
3. 必要でれば型定義ファイルを生成する

### 型定義ファイルとは

型定義ファイルとは、型のないJavascriptのライブラリーをTypeScriptで使えるようにするためのファイルで、「どの変数が何の型なのか」を定義する。拡張子は「.d.ts」。

#### 参考

- https://qiita.com/namakemono_no_ahiru/items/0d976001a08c42a8cb1c

## @babel/preset-typescript

Babelのプリセットとして登場した @babel/preset-typescript によってトランスパイルだけであれば行うことができるようになった。

## 違い

babelはトランスパイルを行うが型チェックと型定義ファイルの生成はできない。そのため型チェックにはtscを使用する必要がある。

## 参考

- https://qiita.com/nacam403/items/edf3e2c8ff364aff910f
