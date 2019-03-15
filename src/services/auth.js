import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = "@RocketSeat:token";

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? true : false;
};