import { SendMessageInterface } from ".";
import { APPID, SERVERAPI } from "../config";

export const useMessagesApi = () => {
  const sendMessageApi = async ({ channel, body }: SendMessageInterface) => {
    const res: Response = await fetch(
      `${SERVERAPI}/message?appID=${APPID}&channel=${channel}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body }),
      }
    );
    return res.status == 200;
  };

  return {
    sendMessageApi,
  };
};
