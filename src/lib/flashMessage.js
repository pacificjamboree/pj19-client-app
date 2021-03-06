import { GET_FLASH_MESSAGES } from '../graphql/queries';
import { utoa } from './base64';
const pushFlashMessage = (
  client,
  { message, kind, error = null, autoDismiss }
) => {
  const { cache } = client;
  const { messages } = cache.readQuery({
    query: GET_FLASH_MESSAGES,
  });

  const id = utoa(`${Date.now()}:::${kind}:::${message}`);
  const newMessages = [
    {
      id,
      kind,
      message,
      error,
      __typename: 'FlashMessage',
    },
    ...messages,
  ];

  cache.writeData({
    data: {
      messages: newMessages,
    },
  });

  if (kind === 'success') {
    setTimeout(() => {
      popFlashMessage(client, id);
    }, 5000);
  }
  client.queryManager.broadcastQueries();
};

const popFlashMessage = (client, id) => {
  const { messages } = client.cache.readQuery({
    query: GET_FLASH_MESSAGES,
  });
  const newMessages = messages.filter(m => m.id !== id);
  const data = {
    messages: newMessages,
  };
  client.cache.writeData({ data });
  client.queryManager.broadcastQueries();
};

export { pushFlashMessage, popFlashMessage };
