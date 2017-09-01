# Telegram Bot Starter Kit

Repo ini berisi kit yang saya gunakan untuk membuat telegram bot menggunakan NodeJS denga library 

- telegraf
- sequelize

Tujuan dibuatkan repo ini sebagai bahan untuk pembelajaran tentang penggunaan bot telegram yang sudah terintegrasi dengan MySQL database

## Minimum spesifikasi

- NodeJS 8.x >=
- npm 4.x >=
- Redis 3.x >=
- Mysql Server

## Instruksi

setelah repo berhasil di `clone` silahkan salin `.env.example` ke `.env` lalu modifikasi parameter `BOT_TOKEN` yang sudah diberi oleh `@botfather` pada telegram.

Setelah itu salin file `config/config.example.json` dan modifikasi file `config/config.json` sesuai dengan user database anda.

jika sudah selesai jalankan npm install lalu jalankan

```
$ npm i -g sequelize-cli
$ npm i
$ sequelize db:migrate
$ node index
```

anda dapat mencuba dengan melakukan perintah `/start` atau `/help` pada chat bot anda

## Contributors

- Naudotval