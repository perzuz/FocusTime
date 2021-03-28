import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Focus } from './src/features/Focus/Focus';
import { Timer } from './src/features/Timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';


export default function App() {

  const [focusSubject, setFocusSubject] = useState("gardening");

  return (
    <View style={styles.container}>
      {focusSubject ?
        <Timer focusSubject={focusSubject} onTimerEnd={() => {
          setFocusSubject(null);
        }}
        />
        :
        <Focus addSubject={setFocusSubject} />}
      <Text>{focusSubject}</Text>
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
