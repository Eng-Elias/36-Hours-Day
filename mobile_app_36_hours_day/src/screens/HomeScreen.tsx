import {View} from 'react-native';
import TimePassed, {PassedTimeType} from '../components/TimePassed';
import Clock from '../components/Clock';
import React from 'react';
import DaysOf35HoursUtils from '../utils/days_of_36_hours_utils';
import TextToSpeechUtils from '../utils/text_to_speech_utils';
import store from '../redux/store';

class HomeScreen extends React.Component<
  {route: any},
  Readonly<{passedTime: PassedTimeType}>
> {
  state: Readonly<{passedTime: PassedTimeType}> = {
    passedTime: null,
  };

  constructor(props: any, state: any) {
    super(props, state);
  }

  interval: string | number | NodeJS.Timeout | undefined;

  runClockInterval() {
    const getTime = () => {
      // console.log(store.getState().settings.startHour);
      const startHour = store.getState().settings.startHour;

      const lostTime =
        DaysOf35HoursUtils.calculateTimeLostIn36HoursDay(startHour);
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

  componentDidMount(): void {
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
