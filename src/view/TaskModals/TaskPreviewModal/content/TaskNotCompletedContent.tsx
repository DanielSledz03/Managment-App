import { Task } from '@/types/Task.type';
import GradientButton from '@components/Button/GradientButton/GradientButton';
import { colors } from '@constants/colors';
import { StyleSheet, Text } from 'react-native';

interface Props {
  task: Task;
  date: string | null;
  handleTaskComplete: () => any;
}

const TaskNotCompletedContent = ({ task, date, handleTaskComplete }: Props) => (
  <>
    <Text style={styles.title}>{task.title}</Text>
    <Text style={styles.description}>{task.description}</Text>
    <Text style={styles.createdAt}>
      <Text style={{ fontWeight: 'bold' }}>Dodano:</Text> {date}
    </Text>
    <GradientButton
      title='Wykonane'
      onPress={handleTaskComplete}
      containerStyle={styles.submitButton}
      textStyle={{ fontSize: 16 }}
      gradientStyle={{ borderRadius: 10 }}
      gradientColors={[colors.greenBright, colors.greenBright]}
    />
    <GradientButton
      title='Przepisz'
      onPress={() => null}
      containerStyle={styles.submitButton}
      textStyle={{ fontSize: 16 }}
      gradientStyle={{ borderRadius: 10 }}
    />
    <GradientButton
      title='Odrzuć'
      onPress={() => null}
      containerStyle={styles.submitButton}
      textStyle={{ fontSize: 16 }}
      gradientStyle={{ borderRadius: 10 }}
      gradientColors={[colors.redBright, colors.redBright]}
    />
  </>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.black,
    marginBottom: 10,
  },

  description: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Jost',
    color: colors.greyDark8,
    marginBottom: 20,
  },

  createdAt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Jost',
    color: colors.darkSlate,
    marginBottom: 10,
  },

  submitButton: {
    width: '48%',
    marginBottom: 0,
  },
});

export default TaskNotCompletedContent;
