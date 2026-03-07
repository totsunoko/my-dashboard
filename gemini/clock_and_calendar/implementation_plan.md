# ファイル分割とリファクタリング計画

肥大化した `index.html` を適切に分割し、メンテナンス性を向上させます。

## Proposed Changes

### ディレクトリ構成の変更
以下の構成に変更します。
```text
/my-dashboard/
  ├── index.html
  ├── css/
  │    └── style.css
  └── js/
       └── app.js
```

### [NEW] [style.css](file:///home/totsuka/git_repository/my-dashboard/css/style.css)
- `index.html` 内の `<style>` ブロックから全CSSを抽出。

### [NEW] [app.js](file:///home/totsuka/git_repository/my-dashboard/js/app.js)
- `index.html` 内の `<script>` ブロックから全JavaScript（時計、カレンダー、スリープ防止等）を抽出。

### [MODIFY] [index.html](file:///home/totsuka/git_repository/my-dashboard/index.html)
- 内部の `<style>` および `<script>` タグを削除し、外部ファイルとしてリンクするように変更。

## Verification Plan
1. `python3 -m http.server` を使用して、分割後もデザインや機能（時計、アニメーション、スリープ防止）が正常に動作することを確認。
2. ブラウザのデベロッパーツールで外部ファイルが正しくロードされていることを確認。
