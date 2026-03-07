# 時計と天気の統合計画

時計カードを拡張し、現在の時刻とともにリアルタイムな天気情報を表示するように変更します。

## Proposed Changes

### デザインの更新 (CSS)
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - 時計カードのレイアウトを調整し、時計の下に天気アイコン、気温、予報がバランスよく配置されるようにします。
    - 天気アイコン（絵文字または簡易アイコン）のアニメーションやスタイルを追加します。

### 天気APIの導入 (JavaScript)
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - `updateWeather()` 関数を新規作成し、[Open-Meteo API](https://open-meteo.com/) を使用して天気を取得します。
    - 東京（緯度: 35.6895, 経度: 139.6917）をデフォルト設定とします。
    - 取得したデータ（気温、天気コード）を対応するHTML要素に反映します。
    - 1時間ごとに天気情報を自動更新するようにタイマーを設定します。

## Verification Plan
1. ブラウザで開き、現在の気温と天気が正しく表示されることを確認。
2. APIリクエストが正常に行われ、エラー時にフォールバック（デフォルト値の表示）が機能するか確認。
