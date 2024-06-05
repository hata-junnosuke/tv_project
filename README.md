# Docker,Next.js(14.2.3),Rails(7.1.3)の環境
## クローン後の環境構築
1. フォルダー名の変更（プロジェクトに合わせた形にする）
2. docker compose build --no-cache
3. docker compose up
### フロント設定
1. nextフォルダーのnode_moduleが空であれば削除する
2. docker compose exec next /bin/bash
3. nextコンテナ内で npm i
4. nextコンテナ内で npm run dev→Next.jsトップ画面がlocalhost:8000で確認できる
### バック設定
1. docker compose run --rm rails bundle install
2. docker compose exec rails /bin/bash
3. railsコンテナ内で rails s -b '0.0.0.0'→Railsトップ画面がlocalhost:3000で確認できる

※-b '0.0.0.0'とは

https://qiita.com/Masato338/items/f162394fbc37fc490dfb

## トラブルシューティング
docker logs <<CONTAINER ID>>

## Rails
### テスト実行
1. docker compose exec rails /bin/bash
2. rspec
### リント実行
1. docker compose exec rails /bin/bash
2. rubocop
3. rubocop -Aで自動修正
