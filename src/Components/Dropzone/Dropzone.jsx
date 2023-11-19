import axios from 'axios';
import { useState } from 'react';
import { Group, Text, useMantineTheme, rem, Button } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import styles from './Dropzone.module.css';

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const CONVERSION_1Mb_TO_BYTE = 1000000;
const NO_IMAGE = { name: '', data: '' };

export function DropzoneContainer({ setContent }) {
  const [image, setImage] = useState(NO_IMAGE);
  const [showFileSizeError, setFileSizeError] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const convertImageToText = async (imageData) => {
    try {
      const response = await axios.post(
        'https://australia-southeast2-translate-ebook.cloudfunctions.net/ocrExtractTextFromImg',
        { base64Data: imageData },
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        },
      );

      const data = response.data.data;
      setContent(data);
      setHasContent(true);
    } catch (error) {
      console('error', error);
    }
  };

  const handleFileChange = async (files) => {
    const file = files[0];
    if (file.size >= CONVERSION_1Mb_TO_BYTE) {
      setFileSizeError(true);
      return;
    }
    setFileSizeError(false);

    const base64 = await convertBase64(file);
    setImage({
      data: base64,
      name: file.name,
    });

    await convertImageToText(base64);
  };

  const removeImage = () => {
    setImage(NO_IMAGE);
    setHasContent(false);
    setContent('');
  };

  return !image.name ? (
    <Dropzone
      onDrop={handleFileChange}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={CONVERSION_1Mb_TO_BYTE}
      accept={IMAGE_MIME_TYPE}
    >
      <Group justify="center" gap="xl" style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto style={{ width: rem(20), height: rem(20), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="m" inline>
            Drag <span className={styles.textStrong}>images </span>here or click to select files
          </Text>
        </div>
      </Group>
    </Dropzone>
  ) : (
    <Group justify="center" gap="xl">
      <Text size="m" inline>
        <span className={styles.textStrong}>Seleted image: </span>
        {image.name}
      </Text>
      <Button
        leftSection={<IconPhoto size={14} />}
        fullWidth
        variant="gradient"
        gradient={{ from: 'rgba(158, 207, 153, 1)', to: 'cyan', deg: 90 }}
        onClick={removeImage}
        disabled={!hasContent}
      >
        Change image
      </Button>
    </Group>
  );
}
