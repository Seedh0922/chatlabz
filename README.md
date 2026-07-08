# Chatlabz — AIチャットボット構築プラットフォーム

ポートフォリオ動画をもとに制作した **Chatlabz** のデモサイトです。

## ページ構成

| ページ             | ファイル             | 内容                                        |
| --------------- | ---------------- | ----------------------------------------- |
| ランディングページ + FAQ | `index.html`     | ヒーローセクション、機能紹介、FAQアコーディオン、ログインモーダル        |
| ダッシュボード         | `dashboard.html` | データソース管理（Files / Text / Website / Notion） |
| 料金プラン           | `pricing.html`   | Free / Pro / Enterprise プラン               |

## プレビュー

ブラウザで `index.html` を直接開いてご確認いただけます。

```text
chatlabz/index.html
```

または、ローカルサーバーを起動して確認することもできます。

```bash
cd chatlabz
npx serve .
```

## 主な機能（デモ）

* **FAQアコーディオン** — 動画内の質問一覧を反映
* **ログインモーダル** — Google / Email ログインUIからダッシュボードへ遷移
* **ファイルアップロード** — ドラッグ＆ドロップ対応（PDF / DOCX / TXT / CSV）
* **Webサイトクロール** — URL入力によるリンク一覧の追加
* **文字数カウンター** — 上限11,000,000文字を表示
* **「Create Chatbot」ボタン**

## 技術スタック（オリジナルプロジェクト）

* React + TypeScript + Vite
* React Query（`@tanstack/react-query`）
* Tailwind CSS

> 本デモは、ポートフォリオ向けに作成した静的な HTML / CSS / JavaScript 版です。

## ディレクトリ構成

```text
chatlabz/
├── index.html
├── dashboard.html
├── pricing.html
├── css/
│   └── style.css
└── js/
    └── main.js
```
