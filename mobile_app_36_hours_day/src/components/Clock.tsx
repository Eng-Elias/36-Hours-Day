import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PassedTimeType} from './TimePassed';
import {Card, Text, useTheme} from 'react-native-paper';

function Clock({passedTime}: {passedTime: PassedTimeType}) {
  const theme = useTheme();

  if (!passedTime) return null;

  return (
    <View style={{margin: 16}}>
      <Card>
        <Card.Content
          style={{
            alignItems: 'center',
            backgroundColor: '#3771e0',
          }}>
          <Text
            style={{
              fontFamily: 'digital-7 (mono)',
              fontSize: 35,
              color: theme.colors.scrim,
            }}>
            You have
          </Text>
          <Text
            style={{
              fontFamily: 'digital-7 (mono)',
              fontSize: 70,
              textAlign: 'center',
              color: theme.colors.scrim,
            }}>
            {`${35 - passedTime.lostHours}:${60 - passedTime.lostMinutes}:${
              60 - passedTime.lostSeconds
            }`}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Clock;
