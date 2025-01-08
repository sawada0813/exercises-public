# 1. 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい

## 標準入力

プログラムが使うデータを受け取るための読み込み元を意味する。主な標準入力として、キーボードなどがある。

## 標準出力 / 標準エラー出力

標準出力とは、プログラムが使うデータの出力先を示す。それに対して標準エラー出力とは、プログラムが使うデータのうち、エラーの出力先を意味する。主な標準出力・標準エラー出力として、コンソール、ディスプレイなどがある。

## リダイレクト

リダイレクトとは、コマンドの出力先を別の出力先 (ファイルなど) に変更することができる仕組み。“>” や “ で表現します。

### 例

```bash
# カレントディレクトリ内のファイル一覧
$ ls
file1
file2
file3

# ファイル一覧をテキストファイルに出力
$ ls > /tmp/file.txt

# file.txt の中身を確認
$ cat /tmp/file.txt
file1
file2
file3
```

## パイプ

パイプラインとは、コマンドの出力を別のコマンドの入力として扱う仕組み。コマンドラインでは“|” で表現する。

### 例

```bash
# テキストファイルの中身
$ cat text.txt
aaa
bbb
ccc

# text.txt の中身を cat して aaa の文字列を grep
$ cat text.txt | grep aaa
aaa
```

## 参考

https://tech-lab.sios.jp/archives/42701

# 2. 以下のコードを `cat.mjs` というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

## `node cat.mjs`

### 予測

```bash
$ node cat.mjs

```

分岐では8行目の処理が走るのみで何も出力されない。

### 結果

```bash
$ node cat.mjs
aaa(標準入力)
aaa(標準出力)
```

予測とは異なり待ち状態で標準入力を受け付け、そのまま標準出力される。

## `echo FOO | node cat.mjs`

### 予測

```bash
$ echo FOO | node cat.mjs
FOO(標準出力)

```

echo コマンドの出力がそのまま node コマンドに標準入力で渡されて8行目の分岐が走りFOOが標準出力される。

### 結果

```bash
$ echo FOO | node cat.mjs
FOO(標準出力)

```

予想と同じ。

## `node cat.mjs > output.txt`

### 予測

```bash
$ node cat.mjs > output.txt
aaa(標準入力)

# output.txt　の中身は aaa となる
```

### 結果

お概ね予想通りだが、標準入力はstreamでファイルに書き込まれるためnodeの実行は終了せず、標準入力をファイルの最下部に常に追加し続ける。

```bash
$ node cat.mjs > output.txt
aaa(標準入力)

# output.txtの中身
# aaa

bbb(標準入力)

# output.txtの中身
# aaa
# bbb
```

## `node cat.mjs file`

### 予測

```bash
$ node cat.mjs file.txt
hoge
fuga
piyo
```

fileをStreamで読み込んで中身を標準出力して終了する。

### 結果

予測と同じ。

```bash
$ node cat.mjs file.txt
hoge
fuga
piyo
```

## `node cat.mjs file > output.txt`

### 予測

```bash
$ node cat.mjs file.txt > output.txt
```

fileの中身がoutput.txtにコピーされる。

### 結果

予測と同じ。

### 予測

## `node cat.mjs invalid-file > output.txt`

```bash
$ node cat.mjs invalid-file.txt > output.txt
```

エラー(invalid-file.txtが見つからない)が発生する。output.txtファイルの中身は実行前と同じ。

### 結果

予測と同じ。

## `node cat.mjs invalid-file 2> error.txt`

### 予測

```bash
$ node cat.mjs invalid-file.txt 1> error.txt
```

標準エラー出力がerror.txtに出力される。

### 結果

予測と同じ。また、コマンドラインにエラーは出力されない。`2>`は標準エラー出力の出力先を指定する。
