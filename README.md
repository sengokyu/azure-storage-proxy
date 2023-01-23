# Azure Function to accessing Azure Storage Table

## What is this ?

(TODO:)

## Getting Started

Start storage emulator. And create a table.

```console
docker-compose up -d
```

Get an access token from some where.

Start local function.

```console
npm install
cp local.settings.sample.json local.setting.json
npm run start
```

Call the function.

```console
curl -X POST -d '{"foo":123}' --oauth2-bearer 'Your access token' http://localhost:7071/api/table/Your_table_name/Your_row_key
curl --oauth2-bearer 'Your access token' http://localhost:7071/api/table/Your_table_name/Your_row_key
```
