# 天気予報アイコンのモノクロ化計画

ダッシュボード全体の「プレミアム感」を高めるため、天気予報のアイコンをカラー絵文字からモノクロ（ホワイトベース）のシンボリックな表現に変更します。

## Proposed Changes

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- `getWeatherIcon` 関数で使用する絵文字を、より記号的なもの（またはCSSでフィルタリングしやすいもの）に変更。
- 例: ☀️ -> ☀, 🌧️ -> ☂ 等。

### [MODIFY] [css/style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- 天気アイコンクラス（`.weather-main-icon`, `.forecast-icon` 等）に CSS フィルタを適用。
- `filter: grayscale(100%) brightness(1.5);` などを活用し、すべてのアイコンを白一色のトーンに統一します。

## Verification Plan
1. ブラウザで開き、天気のアイコンがカラーではなく白黒（白一色）になっていることを確認。
2. 他のカード全体のデザインと調和しているか視覚的に確認。
