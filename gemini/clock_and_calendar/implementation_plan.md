# ニュース連携の実装計画

ダッシュボードのニュースカードを、Google ニュースの最新データと連携させます。鉄道情報およびスケジュールの連携は行わず、ニュースに特化して進めます。

## 連携データソース

### ニュース (News)
- **ソース**: Google ニュース RSS (主要ニュース)
- **取得方法**: CORSを回避し、RSSをJSONに変換する公開サービス (`https://api.rss2json.com/v1/api.json?rss_url=...`) を使用します。

## 変更内容

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- 鉄道セクション (`.train-container`) を完全に削除。
- ニュースセクション (`#news-list`) を拡張し、より多くの記事を表示可能にします。

### [MODIFY] [js/app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- `updateNews()` 関数を実装:
    - 指定したRSSフィードから最新の5〜10件を取得。
    - DOM を動的に生成してリストを更新。
- 1時間ごとに自動更新するよう設定。

### [MODIFY] [css/style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- 鉄道セクションがなくなった後の余白を調整。

## Verification Plan
1. ブラウザで開き、ニュースリストが「読み込み中...」から実際のニュースタイトルに切り替わることを確認。
2. 鉄道情報が消え、レイアウトが整っていることを確認。
