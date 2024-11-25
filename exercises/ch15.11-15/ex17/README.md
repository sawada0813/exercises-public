## 三菱UFJ銀行のページで確認

ログイン後に開発者ツールからネットワークタブを開き、任意のリクエストのヘッダーから参照ポリシーを確認する。参照ポリシーはすべて「strict-origin-when-cross-origin」だった。

## strict-origin-when-cross-origin とは

クロスオリジン リクエストの場合は、プロトコル セキュリティ レベルが同じ場合 (HTTPS → HTTPS) にのみ送信します。（HTTP→HTTPSは送信しない）
