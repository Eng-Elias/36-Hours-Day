import * as React from 'react';
import {
  HelperText,
  IconButton,
  Drawer as PaperDrawer,
  TextInput,
} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DaysOf35HoursUtils from '../utils/days_of_36_hours_utils';
import store, {changeStartHour} from '../redux/store';

const Drawer = createDrawerNavigator();

export const screens = {
  home: 'Home',
};

function DrawerContent() {
  const [text, setText] = React.useState(
    store.getState().settings.startHour.toString(),
  );
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    DaysOf35HoursUtils.getStartHourFromStorage()
      .then(startHour => {
        if (typeof startHour === 'number') {
          store.dispatch(changeStartHour(startHour));
          setText(startHour.toString());
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleTextChange = (input: string) => {
    // Remove any non-numeric characters
    const numericInput = input.replace(/[^0-9]/g, '');

    const numericValue = parseInt(numericInput, 10);

    // If input is empty or a valid integer between 0 and 23, update the state
    if (
      numericInput === '' ||
      (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23)
    ) {
      setText(numericInput);
      if (!isNaN(numericValue)) {
        store.dispatch(changeStartHour(numericValue));
        DaysOf35HoursUtils.storeStartHourInStorage(numericValue);
      }
      setError(false); // Clear the error if input is valid
    } else {
      setError(true); // Set error to true if input is invalid
    }
  };

  return (
    <PaperDrawer.Section title="Start Hour">
      <TextInput
        label="Start Hour"
        mode="outlined"
        outlineColor="#3771e0"
        activeOutlineColor="white"
        textColor="#3771e0"
        value={text}
        onChangeText={handleTextChange}
        inputMode="numeric"
        keyboardType="numeric"
      />
      <HelperText type="error" visible={error}>
        Please enter a valid integer between 0 and 23.
      </HelperText>
    </PaperDrawer.Section>
  );
}

const SettingsDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: props => (
          <IconButton
            icon={'wrench-clock'}
            iconColor="#3771e0"
            onPress={navigation.toggleDrawer}
          />
        ),
        drawerStyle: {
          backgroundColor: Colors.darker,
        },
      })}
      initialRouteName={screens.home}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name={screens.home} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default SettingsDrawer;
