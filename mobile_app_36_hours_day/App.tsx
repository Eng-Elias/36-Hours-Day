/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TimePassed, {PassedTimeType} from './src/components/TimePassed';
import DaysOf35HoursUtils from './src/utils/days_of_36_hours_utils';
import Clock from './src/components/Clock';
import TextToSpeechUtils from './src/utils/text_to_speech_utils';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [startHour, setStartHour] = useState<number>(
    DaysOf35HoursUtils.defaultStartHour,
  );

  useEffect(() => {
    DaysOf35HoursUtils.getStartHourFromStorage()
      .then(startHour => {
        console.log(startHour);
        if (typeof startHour === 'number') {
          setStartHour(startHour);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [passedTime, setPassedTime] = useState<PassedTimeType>(null);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    function getTime() {
      const lostTime =
        DaysOf35HoursUtils.calculateTimeLostIn36HoursDay(startHour);
      setPassedTime(lostTime);

      if (lostTime.lostMinutes === 0 && lostTime.lostSeconds === 0) {
        const hourWord = lostTime.lostHours > 1 ? 'hours' : 'hour';
        TextToSpeechUtils.speakTextWithDucking(`
          ${lostTime.lostHours} ${hourWord} passed, you have ${
          36 - lostTime.lostHours
        } ${hourWord}.
        `);
      }
    }

    interval = setInterval(getTime, 666);
    getTime();

    return () => {
      clearInterval(interval);
    };
  }, [startHour]);

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TimePassed passedTime={passedTime} />
      </View>
      <View style={{flex: 2, justifyContent: 'space-between'}}>
        <Clock passedTime={passedTime} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
