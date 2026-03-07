# YouTube Musicカードの再設計計画 (URL再生方式)

YouTube Musicの曲やプレイリストのURLを直接貼り付けて、ダッシュボード上で再生できるようにします。

## Proposed Changes

### YouTube Music カードの刷新
- **[MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)**
    - 検索ランチャーを廃止し、URL入力欄と「再生」ボタンを配置します。
    - 入力されたYouTube MusicのURLを、埋め込み可能な `iframe` 用のURLに自動変換する機能を追加します。
    - 変換対象:
        - 曲 (`watch?v=...`) -> `/embed/...`
        - プレイリスト (`playlist?list=...`) -> `/embed/videoseries?list=...`
    - 再生エリア（iframe）をカード内に常設、またはURL入力後に表示するようにします。

## Verification Plan
1. 通常のYouTube Musicの曲URLを貼り付けて「再生」を押し、プレイヤーが表示され再生できるか確認。
2. プレイリストURLを貼り付けて、プレイリストとして読み込まれるか確認。

## Verification Plan

### 手動確認
1.  **ブラウザでの表示確認**: ユーザーに `index.html` を開いてもらい、以下の点を確認してもらいます。
    - プレイヤーが表示されているか。
    - 再生ボタンが動作するか。
    - カード内でプレイヤーが適切なサイズで表示されているか。
