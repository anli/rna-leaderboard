import React from 'react';
import {TextInput} from 'react-native';

interface FormValues {
  title: string;
  winner: string;
  date: string;
  participants: string[];
}

const PlayForm = ({
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

export default PlayForm;

const ParticipantTextInput = ({
  index,
  onChangeText,
  values,
}: {
  index: string;
  onChangeText: (key: string, value: string, arrayProp?: 'participants') => any;
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
