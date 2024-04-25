# DockerとNext.jsを使った開発の基礎
日々改善していく！
## 設定していること
- eslint設定
- GitHub ActionsでのCI
## クローン後にすること
1. フォルダー名の変更（プロジェクトに合わせた形にする）
2. docker compose build --no-cache
3. docker compose up
4. nextフォルダーのnode_moduleが空であれば削除する
5. docker compose exec next /bin/bash
6. npm i
7. npm run dev→トップ画面がlocalhost:8000で確認できる
