import { memo, useEffect, useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { InfoCard } from './InfoCard';

interface InfoCardAsyncProps {
  title: string;
  fetchValue: () => Promise<string>;
  styleForValue: TextStyle;
  style: ViewStyle;
}

const InfoCardAsync: React.FC<InfoCardAsyncProps> = memo(
  ({ title, fetchValue, styleForValue, style }) => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
      const fetchAndUpdateValue = async () => {
        const fetchedValue = await fetchValue();
        setValue(fetchedValue);
      };

      fetchAndUpdateValue();
      const intervalId = setInterval(fetchAndUpdateValue, 1000);

      return () => clearInterval(intervalId);
    }, [fetchValue]);

    return <InfoCard title={title} value={value} styleForValue={styleForValue} style={style} />;
  },
);

export { InfoCardAsync };
