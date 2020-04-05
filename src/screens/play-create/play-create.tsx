import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const PlayCreateScreen = () => {
  const {values, onChangeText, create$} = usePlayCreateScreen();

  const {goBack} = useNavigation();

  const onSave$ = async () => {
    await create$(values);
    goBack();
  };

  return (
    <View testID="play-create-screen">
      <Form values={values} onChangeText={onChangeText} />

      <TouchableOpacity testID="play-create-button" onPress={onSave$}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayCreateScreen;

const Form = ({
  values,
  onChangeText,
}: {
  values: FormValues;
  onChangeText: (key: string, value: string, arrayProp?: 'participants') => any;
}) => {
  return (
    <>
      <TextInput
        placeholder="Title"
        testID="title-input"
        onChangeText={data => onChangeText('title', data)}
        value={values.title}
      />
      <TextInput
        placeholder="Winner"
        testID="winner-input"
        onChangeText={data => onChangeText('winner', data)}
        value={values.winner}
      />
      <TextInput
        placeholder="Date Played"
        testID="date-input"
        onChangeText={data => onChangeText('date', data)}
        value={values.date}
      />
      <ParticipantTextInput
        index="0"
        onChangeText={onChangeText}
        values={values}
      />
      <ParticipantTextInput
        index="1"
        onChangeText={onChangeText}
        values={values}
      />
    </>
  );
};

interface FormValues {
  title: string;
  winner: string;
  date: string;
  participants: string[];
}

const INITIAL_FORM_VALUES = {
  title: '',
  winner: '',
  date: '',
  participants: [],
};
const usePlayCreateScreen = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);

  const onChangeText: onChangeTextProps = (
    key: string,
    value: string,
    arrayProp?: 'participants',
  ) => {
    if (!arrayProp) {
      return setValues({...values, [key]: value});
    }

    const participants = [...values[arrayProp]];
    participants[Number(key)] = value;

    return setValues({...values, participants});
  };

  const create$ = async (data: FormValues) => {
    await firestore()
      .collection('plays')
      .add(data);
  };

  return {values, onChangeText, create$};
};

const ParticipantTextInput = ({
  index,
  onChangeText,
  values,
}: {
  index: string;
  onChangeText: onChangeTextProps;
  values: FormValues;
}) => {
  return (
    <TextInput
      placeholder="Participant"
      testID={`participants-${index}-input`}
      onChangeText={data => onChangeText(index, data, 'participants')}
      value={values.participants[Number(index)]}
    />
  );
};

type onChangeTextProps = (
  key: string,
  value: string,
  arrayProp?: 'participants',
) => any;
