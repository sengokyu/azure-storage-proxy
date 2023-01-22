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
  const userId = await getUserId(req.headers.authorization);

  if (!userId) {
    context.res = {
      status: 400,
      body: "Cannot retrieve user info. Invalid access token ?",
    };
    return;
  }

  switch (req.method) {
    case "POST":
      await upsertEntity(
        context.bindingData.tableName,
        userId,
        context.bindingData.rowKey,
        req.body
      );
      context.res = { body: "OK" };
      break;
    case "GET":
      const body = await getEntity(
        context.bindingData.tableName,
        userId,
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
