import GradientText from '@/components/GradientText/GradientText';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@constants/colors';
import { TaskCard } from '@components/TaskCard/TaskCard';
import TabButton from '@components/TabButton/TabButton';
import { useState } from 'react';

const Tasks = () => {
  const [selectedTab, setSelectedTab] = useState<'todo' | 'done'>('todo');
  return (
    <ScrollView style={styles.container}>
      <GradientText style={styles.heading}>Lista zadań</GradientText>
      <View style={styles.tabButtons}>
        <TabButton
          title='Do zrobienia'
          isSelected={selectedTab === 'todo'}
          onPress={() => setSelectedTab('todo')}
        />
        <TabButton
          title='Wykonane'
          isSelected={selectedTab === 'done'}
          onPress={() => setSelectedTab('done')}
        />
      </View>

      <View style={{ marginBottom: 50 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <TaskCard
            key={item}
            taskTime='4 minuty'
            title='Uzupełnij magazyn przed następną dostawą, która będzie we wtorek'
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.greyDark2,
    marginBottom: 90,
    paddingTop: 30,
    paddingBottom: 30,
  },

  heading: {
    width: '100%',
    textAlign: 'center',
    fontSize: 34,
    color: colors.white,
    marginBottom: 30,
    fontFamily: 'Jost-SemiBold',
  },

  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Tasks;
