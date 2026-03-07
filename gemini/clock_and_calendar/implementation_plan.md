# 天気予報取得エラーと機能不足の修正計画

天気予報の取得ロジックを修正し、以前リクエストのあった「3日間予報」と「降水確率」を統合します。

## 修正内容
1. **APIデータの拡充**:
    - `forecast_days=3` に変更（日付跨ぎに対応）。
    - `hourly` に `precipitation_probability` を追加。
    - `daily` の最高/最低気温と天気コードを取得。
2. **ロジックの修正**:
    - 日付を跨いでも正しく「現在時刻からの未来」を表示できるよう、インデックス計算を修正。
3. **UIの改善**:
    - 現在の天気に「降水確率」を追加。
    - 時間別予報（3時間ごと）を継続し、降水確率も併記。
    - その下に「コンパクトな3日間予報（今日・明日・明後日）」を追加。

## Proposed Changes

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- APIリクエストURLの更新。
- `updateWeather()` 内で「時間別予報」と「3日間予報」の両方を生成・反映。

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- 3日間予報を表示するためのコンテナ ID (`#weather-daily-list`) を追加。
- 降水確率表示用の要素 (`#weather-rain`) を追加。

## Verification Plan
1. ブラウザで「新宿」の天気が表示され、時間別予報が 18:00, 21:00, 0:00... と未来の時間になっていることを確認。
2. 3日間予報が表示されていることを確認。
3. 降水確率が表示されていることを確認。
