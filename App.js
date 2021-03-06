import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/Focus/Focus';
import { FocusHistory } from './src/features/Focus/FocusHistory';
import { Timer } from './src/features/Timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2
}

export default function App() {

  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }])
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    }
    catch (e) {
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ?
        <Timer focusSubject={focusSubject} onTimerEnd={() => {
          addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE)
          setFocusSubject(null);
        }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED)
            setFocusSubject(null)
          }}
        />
        :
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      }
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
