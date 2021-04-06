import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Focus } from './src/features/Focus/Focus';
import { Timer } from './src/features/Timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';


export default function App() {

  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    if(focusSubject){
      setFocusHistory([...focusHistory, focusSubject])
    } 
  }, [focusSubject])


  console.log(focusHistory)
  return (
    <View style={styles.container}>
      {focusSubject ?
        <Timer focusSubject={focusSubject} onTimerEnd={() => {
          setFocusSubject(null);
        }}
        clearSubject={() => setFocusSubject(null)}
        />
        :
        <Focus addSubject={setFocusSubject} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    backgroundColor: colors.darkBlue
  },
});
