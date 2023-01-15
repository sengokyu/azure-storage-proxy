import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getEntity, upsertEntity, verifyAuth } from "./table-heler";

/**
 * main
 */
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
context.log(req.headers)    ;
  if (!(await verifyAuth(req.headers.authorization))) {
    context.res = { status: 401, body: "Invalid authorization header." };
    return;
  }

  switch (req.method) {
    case "POST":
      await upsertEntity(
        context.bindingData.tableName,
        context.bindingData.partitionKey,
        context.bindingData.rowKey,
        req.body
      );
      context.res = { body: "OK" };
      break;
    case "GET":
      const body = await getEntity(
        context.bindingData.tableName,
        context.bindingData.partitionKey,
        context.bindingData.rowKey
      );
      context.res = { body };
      break;
    default:
      context.res = { status: 400 };
      break;
  }
};

export default httpTrigger;
