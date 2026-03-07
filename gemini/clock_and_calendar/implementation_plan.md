# 天気アイコンのピクトグラム化計画

現在の「絵文字＋CSSフィルタ」による天気アイコンを、よりプロフェッショナルで洗練された「Lucide Icons」のピクトグラム（SVG）へ置き換えます。

## Proposed Changes

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- Lucide Icons 専用の CDN スクリプトを追加。
- メインの天気アイコンエリアのマークアップを調整。

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- `getWeatherIcon` 関数の戻り値を Lucide のアイコン名（`sun`, `cloud-rain` 等）に変更。
- `updateWeather` の中で DOM 更新後、`lucide.createIcons()` を実行して SVG を描画する処理を追加。

### [MODIFY] [css/style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- アイコンのサイズと配色（`stroke: white`）を定義。
- これまで使用していた絵文字用の CSS フィルタを削除。

## Verification Plan
1. ブラウザで開き、天気のアイコンが「絵文字」ではなく「線画のピクトグラム」になっていることを確認。
2. 3時間ごとの予報や3日間予報のアイコンもすべて統一されたスタイルで表示されているか確認。
