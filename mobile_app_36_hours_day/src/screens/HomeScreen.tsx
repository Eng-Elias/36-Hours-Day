import {View} from 'react-native';
import {Text} from 'react-native-paper';
import TimePassed, {PassedTimeType} from '../components/TimePassed';
import Clock from '../components/Clock';
import React, {useEffect, useState} from 'react';
import DaysOf35HoursUtils from '../utils/days_of_36_hours_utils';
import TextToSpeechUtils from '../utils/text_to_speech_utils';

class HomeScreen extends React.Component<
  {passedTime: PassedTimeType},
  {startHour: number; passedTime: PassedTimeType}
> {
  state: Readonly<{startHour: number; passedTime: PassedTimeType}> = {
    startHour: DaysOf35HoursUtils.defaultStartHour,
    passedTime: null,
  };

  constructor(props: any, state: any) {
    super(props, state);
  }

  interval: string | number | NodeJS.Timeout | undefined;

  runClockInterval() {
    const getTime = () => {
      const lostTime = DaysOf35HoursUtils.calculateTimeLostIn36HoursDay(
        this.state.startHour,
      );
      this.setState({passedTime: lostTime});

      if (lostTime.lostMinutes === 0 && lostTime.lostSeconds === 0) {
        const hourWord = lostTime.lostHours > 1 ? 'hours' : 'hour';
        TextToSpeechUtils.speakTextWithDucking(`
              ${lostTime.lostHours} ${hourWord} passed, you have ${
          36 - lostTime.lostHours
        } ${hourWord}.
            `);
      }
    };

    this.interval = setInterval(getTime, 666);
    getTime();
  }

  updateStartHourFromLocalStorage() {
    DaysOf35HoursUtils.getStartHourFromStorage()
      .then(startHour => {
        if (typeof startHour === 'number') {
          this.setState({startHour});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount(): void {
    this.updateStartHourFromLocalStorage();
    this.runClockInterval();
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TimePassed passedTime={this.state.passedTime} />
        </View>
        <View style={{flex: 2, justifyContent: 'space-between'}}>
          <Clock passedTime={this.state.passedTime} />
        </View>
      </View>
    );
  }
}

export default HomeScreen;
