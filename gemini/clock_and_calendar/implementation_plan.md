# 時計と天気カードの融合計画

ダッシュボードの顔となる「時計」と「天気」を1つの高機能なマスターカードに統合し、より情報の密度と美しさを高めます。

## Proposed Changes

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- **統合カードの作成**: `clock-card` と `weather-card` を結合。
  - 左半分: 大きなデジタル時計と日付。
  - 右半分: 現在の天気アイコン、気温、降水確率。
  - 下部: 3時間ごと・3日間の予報を横並びまたは整理して配置。
- **グリッドの再編**: 統合カードが上段の大きなスペースを占有するように調整（例: `grid-column: span 2`）。

### [MODIFY] [css/style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- **統合デザインの定義**: 
  - `.fused-info-card` のような新クラスを作成。
  - 時刻と天気のバランスを Flexbox で調整。
  - 予報エリアを折りたたみ、または洗練されたリスト形式で表示。
- **レスポンシブ対応**: 画面が狭い場合は、時刻の下に天気が来るように縦並びへ自動切り替え。

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- 統合された DOM 構造に合わせて、要素の取得 ID や更新タイミングを微調整。

## Verification Plan
1. ブラウザで開き、時刻と天気が1つのカード内で美しく調和していることを確認。
2. 予報部分の情報が欠けたり、重なったりしていないか確認。
3. ウィンドウサイズを変更し、統合カードが適切にリサイズ・リフローされるか確認。
