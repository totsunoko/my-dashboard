# 新宿の天気予報の実装計画

ダッシュボードの天気予報を大阪から新宿に変更し、Open-Meteo API を使用してリアルタイムのデータを表示するように実装します。

## Proposed Changes

### 1. 座標の更新
- 対象地点: 新宿区 (緯度: 35.6895, 経度: 139.6917)

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- 地名タグを "大阪市" から "新宿" に変更。
- 天気情報の各要素（アイコン、気温、予報）に ID を付与し、JavaScript から更新できるようにします。

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- `updateWeather()` 関数を実装:
    - Open-Meteo API (`https://api.open-meteo.com/v1/forecast`) を叩き、新宿の現在の天気と3時間おきの予報を取得します。
    - 取得したデータを DOM に反映させます。
    - 1時間ごとに自動更新されるように設定します。

## Verification Plan
1. ブラウザで開き、地名が「新宿」になっていることを確認。
2. コンソールに API 取得成功のログが出ていることを確認。
3. 表示される気温や天気が現在の新宿の状況（気象庁などのサイトと比較）と概ね一致していることを確認。
