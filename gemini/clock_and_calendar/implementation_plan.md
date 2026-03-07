# スリープ防止機能の実装計画

ダッシュボードが常に表示されるよう、ブラウザの `Screen Wake Lock API` を利用して画面のスリープを抑制します。

## Proposed Changes

### JavaScript (index.html)
- **Wake Lock の取得**: ページ読み込み時に `navigator.wakeLock.request('screen')` を実行。
- **再取得ロジック**: タブの切り替えや最小化から復帰した際（`visibilitychange` イベント）に、Wake Lock が解除されていれば再度取得するように実装。
- **エラーハンドリング**: APIが未対応のブラウザや、ユーザー設定により拒否された場合の対応。

## Verification Plan
1. ブラウザのコンソールログで Wake Lock が正常に取得されたことを確認。
2. ページを放置しても設定上のスリープ時間で画面が消えないことを（ユーザーに提示して）確認。
