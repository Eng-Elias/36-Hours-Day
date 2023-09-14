import React from 'react';
import {View} from 'react-native';
import {Text, Card, useTheme} from 'react-native-paper';

export type PassedTimeType = {
  lostHours: number;
  lostMinutes: number;
  lostSeconds: number;
} | null;

function TimePassed({passedTime}: {passedTime: PassedTimeType}) {
  const theme = useTheme();

  if (!passedTime) return null;

  return (
    <View style={{margin: 16}}>
      <Card>
        <Card.Content
          style={{
            alignItems: 'center',
            backgroundColor: theme.colors.onBackground,
          }}>
          <Text
            style={{
              fontFamily: 'digital-7 (mono)',
              fontSize: 30,
              textAlign: 'center',
              color: theme.colors.backdrop,
            }}>
            {`${passedTime.lostHours}:${passedTime.lostMinutes}:${passedTime.lostSeconds}`}
          </Text>
          <Text
            style={{
              fontFamily: 'digital-7 (mono)',
              fontSize: 20,
              color: theme.colors.backdrop,
            }}>
            passed of 36 hours
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

export default TimePassed;
