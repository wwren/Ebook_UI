import { useState } from 'react';

import { MantineProvider } from '@mantine/core';

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
    </MantineProvider>
  );
}

export default App;
