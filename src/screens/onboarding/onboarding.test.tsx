import {ReactNativeFirebase} from '@mocks';
import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';
import OnboardingScreen from './onboarding';

describe('Onboarding Screen', () => {
  it('Given I am at "Onboarding Screen", And I fill form with data, When I press "Continue Button", Then I should see "Home Screen"', async () => {
    const {getByTestId} = render(<OnboardingScreen />);

    fireEvent(getByTestId('name-input'), 'onChangeText', 'E2E_USER_NAME');

    fireEvent.press(getByTestId('continue-button'));

    expect(ReactNativeFirebase.Firestore.mockSet).toBeCalledTimes(1);
    expect(ReactNativeFirebase.Firestore.mockSet).toBeCalledWith({
      name: 'E2E_USER_NAME',
      isOnboarded: true,
    });
  });
});
