import { Global } from '@mantine/core';
import Bitter from '../assets/Bitter/Bitter-Bold.ttf';
import Lusitana from '../assets/Lusitana/Lusitana-Regular.ttf';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Bitter',
            src: `url('${Bitter}') format("ttf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Lusitana',
            src: `url('${Lusitana}') format("ttf")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}
