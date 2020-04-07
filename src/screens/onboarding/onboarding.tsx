import firestore from '@react-native-firebase/firestore';
import {useAuth} from '@utils';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

const OnboardingScreen = () => {
  const {user} = useAuth();
  const {onChangeText, values, create$} = useOnboardingScreen(user?.uid);

  const onContinue = async () => {
    await create$(values);
  };

  return (
    <>
      <View testID="onboarding-screen">
        <Text>OnboardingScreen</Text>
        <TextInput
          placeholder="Name"
          testID="name-input"
          onChangeText={data => onChangeText('name', data)}
          value={values.name}
        />
        <TouchableOpacity testID="continue-button" onPress={onContinue}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OnboardingScreen;

const INITIAL_FORM_VALUES = {
  name: '',
};

interface FormValues {
  name: string;
}

const useOnboardingScreen = (id?: string) => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);

  const onChangeText: onChangeTextProps = (key: string, value: string) => {
    return setValues({...values, [key]: value});
  };

  const create$ = async (data: FormValues) => {
    await firestore()
      .doc(`users/${id}`)
      .set({...data, isOnboarded: true});
  };

  return {values, onChangeText, create$};
};

type onChangeTextProps = (key: string, value: string) => any;
