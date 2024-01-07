import { useState } from 'react';

import { MantineProvider, Button } from '@mantine/core';

import ConversationHistory from './Components/ConversationHistory/ConversationHistory';

import { InteractionModal } from './Components/InteractionModal/InteractionModal';

function App() {
  const [content, setContent] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [history, setHistory] = useState([]);

  const handleTextSelect = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  const handleButtonClick = async () => {
    const response = await (await fetch('/api/httptrigger1')).json();
    console.log('response', response);
  };

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Lusitana',
        fontFamilyMonospace: 'Bitter',
        headings: { fontFamily: 'Bitter' },
      }}
    >
      <InteractionModal history={history} setHistory={setHistory} />
      <ConversationHistory history={history} />
      <Button onClick={handleButtonClick}>Button to click on</Button>
    </MantineProvider>
  );
}

export default App;
