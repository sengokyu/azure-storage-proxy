import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";

const url = process.env["STORAGE_ACCOUNT_URL"]!;
const account = process.env["ACCOUNT"]!;
const accountKey = process.env["ACCOUNT_KEY"]!;
const credential = new AzureNamedKeyCredential(account, accountKey);

const createClient = (tableName: string): TableClient =>
  new TableClient(url, tableName, credential, {
    allowInsecureConnection: url.startsWith("http://"),
  });

export const upsertEntity = (
  tableName: string,
  partitionKey: string,
  rowKey: string,
  value: object
) => createClient(tableName).upsertEntity({ ...value, partitionKey, rowKey });

export const getEntity = (
  tableName: string,
  partitionKey: string,
  rowKey: string
) => createClient(tableName).getEntity(partitionKey, rowKey);
