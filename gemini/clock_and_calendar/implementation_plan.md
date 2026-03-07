# レスポンシブレイアウトの導入計画

「画面の大きさに応じて調整する」という要望に応え、固定のグリッドレイアウトから、デバイスの幅に合わせて動的に変化するレスポンシブデザインへ刷新します。

## Proposed Changes

### [MODIFY] [css/style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- **Fluid Grid**: `.dashboard` の `grid-template-columns` を固定の `repeat(3, 1fr)` から、最小幅 350px 程度の `repeat(auto-fit, minmax(350px, 1fr))` に変更することを検討します。
- **Media Queries**: 
  - ワイド画面 (1200px〜): 3列レイアウトを維持、ゆったりとした余白。
  - タブレット (768px〜1199px): 2列レイアウトに変更。
  - スマホ (〜767px): 1列レイアウトに変更し、スクロールを縦方向メインに。
- **Dynamic Sizing**: 
  - `height: 100vh` を維持しつつ、画面が小さい場合は `overflow-y: auto` をコンテナに持たせ、スクロールで見れるようにします。
  - 各カードのパディングやフォントサイズに `rem` や `vw` を活用し、スケーリングを改善します。

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- `viewport` メタタグが正しく設定されていることを再確認します。

## Verification Plan
1. ブラウザのデベロッパーツールで、ウィンドウサイズをシームレスに変更し、カードの列数が適切に切り替わるか確認。
2. スマホサイズ（iPhone SE等）で、カードが縦に並び、操作しやすいサイズに収まっているか確認。
3. どのサイズでも、前述の「カードの高さが揃わない」問題が発生しないよう、行の高さ指定を工夫します。
