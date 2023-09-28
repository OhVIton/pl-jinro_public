# pl-jinro
ネットワーク対戦型人狼ゲーム  


## 初期設定  
Dockerをインストールしたあと、Dockerを起動して
```bash
    docker-compose up
```
自動でサーバーが立ち上がります  
以下のようにFirebase EmulatorとNuxtが起動したところまで行けたら、Ctrl + Cして終了しても大丈夫です  
```bash
pl-jinro-db-1     | ┌─────────────────────────────────────────────────────────────┐
pl-jinro-db-1     | │ ✔  All emulators ready! It is now safe to connect your app. │
pl-jinro-db-1     | │ i  View Emulator UI at http://0.0.0.0:4000                  │
pl-jinro-db-1     | └─────────────────────────────────────────────────────────────┘
pl-jinro-db-1     | 
pl-jinro-db-1     | ┌────────────────┬────────────────┬──────────────────────────────┐
pl-jinro-db-1     | │ Emulator       │ Host:Port      │ View in Emulator UI          │
pl-jinro-db-1     | ├────────────────┼────────────────┼──────────────────────────────┤
pl-jinro-db-1     | │ Authentication │ 0.0.0.0:9099   │ http://0.0.0.0:4000/auth     │
pl-jinro-db-1     | ├────────────────┼────────────────┼──────────────────────────────┤
pl-jinro-db-1     | │ Database       │ 0.0.0.0:9000   │ http://0.0.0.0:4000/database │
pl-jinro-db-1     | ├────────────────┼────────────────┼──────────────────────────────┤
pl-jinro-db-1     | │ Hosting        │ localhost:5000 │ n/a                          │
pl-jinro-db-1     | └────────────────┴────────────────┴──────────────────────────────┘
pl-jinro-db-1     |   Emulator Hub running at localhost:4400
pl-jinro-db-1     |   Other reserved ports: 4500
pl-jinro-db-1     | 
pl-jinro-db-1     | Issues? Report them at https://github.com/firebase/firebase-tools/issues and attach the *-debug.log files.
pl-jinro-db-1     |  
pl-jinro-jinro-1  | ✔ Client
pl-jinro-jinro-1  |   Compiled successfully in 7.65s
pl-jinro-jinro-1  | 
pl-jinro-jinro-1  | ✔ Server
pl-jinro-jinro-1  |   Compiled successfully in 6.32s
pl-jinro-jinro-1  | 
pl-jinro-jinro-1  | ℹ Waiting for file changes
pl-jinro-jinro-1  | ℹ Memory usage: 424 MB (RSS: 544 MB)
pl-jinro-jinro-1  | ℹ Listening on: http://172.20.0.3:3000/
```


## サーバーの起動
```bash
    docker-compose start
```
で起動します  
10数秒まてば起動します

## サーバーの停止
```bash
    docker-compose stop
```


## Dockerを使わない場合

### 初期設定
Node.js v17未満か、 v17以上ならexport NODE_OPTIONS=--openssl-legacy-provider (Unix系のみ、Windowsはv17未満使ったほうが早いかも) してください  
```bash
    npm install
    npm install -g firebase-tools
```  
あと、Windowsの場合はfirebase.jsonの "host"の値を以下のように消してください
```json
{
  "database": {
    "rules": "database.rules.json"
  },
  "emulators": {
    "auth": {
      //"host": "0.0.0.0",
      "port": 9099
    },
    "database": {
      //"host": "0.0.0.0",
      "port": 9000
    },
    "ui": {
      "enabled": true,
      //"host": "0.0.0.0",
      "port": 4000
    }
  },
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```


### 起動
以下のコマンドを同時に2つ起動してください
```bash
    firebase emulators:start
    npm run dev
```

## 遊び方  
人狼ゲーム  
http://localhost:3000  
  
DB  
http://localhost:4000
