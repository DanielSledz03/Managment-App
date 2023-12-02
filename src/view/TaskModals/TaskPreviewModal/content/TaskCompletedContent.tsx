import GradientButton from '@components/Button/GradientButton/GradientButton';
import { colors } from '@constants/colors';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Task } from '@/types/Task.type';

interface Props {
  task: Task;
  date: string | null;
  handleTaskComplete: () => any;
}

const TaskCompletedContent = ({ task, date, handleTaskComplete }: Props) => {
  return (
    <>
      <View style={styles.taskCompleted}>
        <Image
          style={styles.taskCompletedIcon}
          source={require('../../../../assets/icons/taskCompleted.png')}
        />
        <Text style={styles.taskCompletedText}>Wykonane</Text>
      </View>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.createdAt}>
        <Text style={{ fontWeight: 'bold' }}>Dodano:</Text> {date}
      </Text>
      <GradientButton
        title='Przywróć zadanie'
        onPress={handleTaskComplete}
        containerStyle={styles.restoreButton}
        textStyle={{ fontSize: 16 }}
        gradientStyle={{ borderRadius: 10 }}
      />
    </>
  );
};

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

  taskCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  taskCompletedIcon: {
    width: 24,
    height: 24,
  },

  taskCompletedText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Jost',
    color: colors.green,
    marginLeft: 2,
  },

  restoreButton: {
    width: '60%',
    marginBottom: 0,
  },
});

export default TaskCompletedContent;
