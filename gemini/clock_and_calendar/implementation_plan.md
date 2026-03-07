# カレンダーとスケジュールの融合計画

「日付」と「予定」という密接に関係する情報を1つのマスターカードに統合し、利便性とデザイン性を向上させます。

## Proposed Changes

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- **イベント統合カードの作成**: `calendar-card` と `schedule-section` を結合。
  - 左半分/上部: 7列のコンパクトなカレンダーグリッド。
  - 右半分/下部: 「今日の予定」リストをスクロール可能に配置。
- **グリッドの再編**: 時計・天気の統合カードの下に、この「イベント統合カード」が大きく配置されるよう調整します。

### [MODIFY] [css/style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- **統合デザインの定義**: 
  - `.fused-event-card` クラスを作成。
  - カレンダーと予定リストを Flexbox または Grid で横並びに配置（デスクトップ時）。
  - 予定リストの高さをカレンダーと合わせることで、整然とした見た目を実現。
- **レスポンシブ対応**: 幅が狭い場合は縦に積み上げ、スマホでも見やすくします。

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- 構造変更に合わせて、カレンダー描画ロジックとスケジュール描画ロジックの ID 指定やコンテナ指定を更新。

## Verification Plan
1. ブラウザで開き、カレンダーとスケジュールが1つのカード内でバランスよく表示されているか確認。
2. 今日の日付の強調（カレンダー側）と、今日の予定（リスト側）が矛盾なく表示されているか確認。
3. レスポンシブ化により、スマホサイズでも両方の情報が欠けずに閲覧できるか確認。
