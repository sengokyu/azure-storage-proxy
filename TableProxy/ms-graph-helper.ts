import fetch from "node-fetch";

const GRAPH_URL = "https://graph.microsoft.com/v1.0/me?$select=id";

interface UserInfo {
  id: string;
}

const isUserInfo = (x: any): x is UserInfo =>
  typeof x === "object" && "id" in x && typeof x.id === "string";

export const getUserId = async (
  authorization: string
): Promise<string | undefined> => {
  const response = await fetch(GRAPH_URL, {
    headers: { authorization },
  });

  if (response.ok) {
    const json = await response.json();
console.log(json);

    if (isUserInfo(json)) {
      return json.id;
    }
  }
};