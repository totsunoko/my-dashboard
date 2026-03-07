# YouTube Musicカードの再設計計画

特定のプレイリストを固定で表示するのではなく、YouTube Musicを便利に起動・検索できるインターフェースに変更します。

## Proposed Changes

### YouTube Music カードの刷新
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - 既存の `iframe` を削除します。
    - 検索ボックス（input）と「YouTube Musicで開く」ボタン、および主要なカテゴリ（Music, Relax, Focusなど）へのクイックリンクボタンを追加します。
    - カードのデザインを、他のコントロールカード（Smart Home Controlなど）と調和するように調整します。
    - 検索ボックスにキーワードを入力してEnterを押すと、YouTube Musicの検索結果ページが別タブで開くようにします。

## Verification Plan

### 手動確認
1.  **ブラウザでの表示確認**: ユーザーに `index.html` を開いてもらい、以下の点を確認してもらいます。
    - プレイヤーが表示されているか。
    - 再生ボタンが動作するか。
    - カード内でプレイヤーが適切なサイズで表示されているか。
