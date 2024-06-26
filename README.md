# amplify-template

🏺🏺🏺 Amplify Frameworkを使用したサーバーレスアプリケーションのテンプレートです！  

- Auth
  - ![Auth](./fruits/auth.gif)
- Api
  - ![Api](./fruits/api-1.gif)
  - ![Api](./fruits/api-2.gif)
  - ![Api](./fruits/api-3.gif)
- Storage
  - ![Storage](./fruits/storage.gif)
- Function
  - ![Function](./fruits/function.gif)

## 準備方法

```shell
# `Amplify CLI`をインストール
yarn global add @aws-amplify/cli

# Amplifyの認証
amplify configure

# プロジェクトの初期化
amplify init

# プロジェクトにホスティング機能を追加
amplify add hosting

# プロジェクトに認証機能を追加  
amplify add auth

# プロジェクトをプッシュ
amplify push

# プロジェクトを公開
amplify publish

# -----

# モジュールをインストール
yarn install

# ローカルサーバーを起動
yarn dev
```

## デプロイ

`v-*`という形式のタグをつけると、GitHub Actionsで自動的にデプロイされます。  
GitHub Actionsのシークレット情報として以下の情報を設定してください。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキー |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | AWSのリージョン |
