import { Bonus } from '@/types/Bonus.type';
import BonusBox from '@components/BonusBox/BonusBox';
import GradientText from '@components/GradientText/GradientText';
import { colors } from '@constants/colors';
import { StyleSheet } from 'react-native';

interface BonusBoxProps {
  bonuses: Bonus[];
  title: string;
}

const BonusesAndPenalties = ({ bonuses, title }: BonusBoxProps) => {
  return (
    <>
      <GradientText style={[styles.heading, { marginBottom: 15 }]}>{title}</GradientText>
      {bonuses.map((bonus) => (
        <BonusBox
          title={bonus.description}
          amount={bonus.amount.toString() + ' zł'}
          date={bonus.createdAt}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 34,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Jost',
  },
});

export default BonusesAndPenalties;
