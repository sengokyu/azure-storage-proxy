import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getUserId } from "./ms-graph-helper";
import { getEntity, upsertEntity } from "./table-helper";

/**
 * main
 */
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let userId: string;

  try {
    userId = await getUserId(req.headers.authorization);
  } catch (err: any) {
    context.res = err;
    return;
  }

  const tableName = context.bindingData.tableName;
  const pKey = userId;
  const rowKey = context.bindingData.rowKey;

  try {
    switch (req.method) {
      case "POST":
        await upsertEntity(tableName, pKey, rowKey, req.body);
        context.res = { body: "OK" };
        break;
      case "GET":
        const body = await getEntity(tableName, pKey, rowKey);
        context.res = { body };
        break;
      default:
        context.res = { status: 400 };
        break;
    }
  } catch (err: any) {
    if ("statusCode" in err && typeof err.statusCode === "number") {
      context.res = { status: err.statusCode, body: err };
    } else {
      context.res = { status: 500, body: err };
    }
  }
};

export default httpTrigger;
