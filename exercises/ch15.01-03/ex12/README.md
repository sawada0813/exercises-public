## リシテアの「打刻理由」に「リモートワーク」を選択させるブックマークレット

```
javascript:document.getElementsByTagName("option")[51].setAttribute("selected", "selected");
```

optionタグの51番目を取得しているのでこの順番が今後変わると動かなくなってしまうのが気になる。
