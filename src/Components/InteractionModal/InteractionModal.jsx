import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Grid, Modal, Button } from '@mantine/core';
import AskAnything from '../AskAnything/AskAnything';
import { DropzoneContainer } from '../Dropzone/Dropzone';
import PictureUploader from '../PictureUploader/PictureUploader';
import QuickAsk from '../QuickAsk/QuickAsk';

import styles from './InteractionModal.module.css';

export function InteractionModal({ history, setHistory }) {
  const [content, setContent] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelect = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Ask your question here"
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <Grid gutter="sm">
          <DropzoneContainer setContent={setContent} />
          <Grid.Col>
            <PictureUploader
              selectedText={selectedText}
              setContent={setContent}
              handleTextSelect={handleTextSelect}
              content={content}
            />
          </Grid.Col>
          <Grid.Col className={styles.quickAskGrid}>
            <QuickAsk selectedText={selectedText} setHistory={setHistory} />
          </Grid.Col>
          <Grid.Col>
            <AskAnything history={history} setHistory={setHistory} />
          </Grid.Col>
        </Grid>
      </Modal>

      <Button onClick={open} fullWidth>
        Open modal
      </Button>
    </>
  );
}
