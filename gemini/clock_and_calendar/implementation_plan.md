# 降水確率の表示追加計画

3日間天気予報に、各日の降水確率（最大値）を表示するように拡張します。

## Proposed Changes

### デザインの更新 (CSS)
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - `.forecast-item` 内に降水確率用のスタイル（`.forecast-prob`）を追加します。
    - 傘のアイコン（☔）や青いテキストを使用して、直感的に「雨」の情報であることを示します。

### JavaScript の更新
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - `updateWeather()` のAPIリクエストに `daily` パラメータとして `precipitation_probability_max` を追加します。
    - 取得した確率データをHTML生成ループ内で各カラムに挿入します。

## Verification Plan
1. 3日間予報の各セクションに「☔ 30%」のような形式で降水確率が表示されているか確認。
2. APIから正しいデータが取得され、描画されているか確認。
