FROM node:16-alpine

WORKDIR /app

# 依存関係のインストール
COPY package.json package-lock.json* ./
RUN npm install

# ソースコードのコピー
COPY . .

# 開発モードで起動
CMD ["npm", "run", "dev"]
