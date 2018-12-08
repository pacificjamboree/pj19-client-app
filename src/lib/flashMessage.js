import { GET_FLASH_MESSAGES } from '../graphql/queries';

const pushFlashMessage = (cache, { message, kind, autoDismiss }) => {
  const { messages } = cache.readQuery({
    query: GET_FLASH_MESSAGES,
  });

  const id = btoa(`${Date.now()}:::${kind}:::${message}`);
  const newMessages = [
    {
      id,
      kind,
      message,
      __typename: 'FlashMessage',
    },
    ...messages,
  ];

  cache.writeData({
    data: {
      messages: newMessages,
    },
  });

  // setTimeout(() => {
  //   popFlashMessage(cache, id);
  // }, 5000);
};

const popFlashMessage = (cache, id) => {
  console.log('popmessage');
  const { messages } = cache.readQuery({
    query: GET_FLASH_MESSAGES,
  });

  const newMessages = messages.filter(m => m.id !== id);
  console.log(newMessages);
  cache.writeData({
    data: {
      messages: newMessages,
    },
  });
};

export { pushFlashMessage, popFlashMessage };
