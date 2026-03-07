# 3日間天気予報の統合計画

現在の時刻表示の下に、当日・翌日・翌々日の天気予報を横並びで表示するように拡張します。

## Proposed Changes

### デザインの更新 (CSS)
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - `.weather-info` を拡張し、3つの予報カラムを持つグリッドまたはフレックスボックス形式に変更します。
    - 各カラムには「曜日（または今日/明日）」、「アイコン」、「最高/最低気温」をコンパクトに表示します。

### 天気APIの拡張 (JavaScript)
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - `updateWeather()` のリクエストに `daily=weathercode,temperature_2m_max,temperature_2m_min` パラメータを追加します。
    - 取得した3日分のデータをループ処理してHTMLを生成します。
    - 曜日の判定を行い、「今日」「明日」というラベルを優先的に表示します。

## Verification Plan
1. 時計カード内に3日分（今日・明日・明後日）の予報が表示されているか確認。
2. それぞれのアイコンと気温が正しく表示されているか確認。
