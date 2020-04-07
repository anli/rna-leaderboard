import {ReactNativeFirebase} from '@mocks';
import React from 'react';
import {Alert} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import RegisterScreen from './register';

describe('Register Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Given I am at "Register Screen", And I fill data "wrong data", When I press "Register Button", Then I should see "Error Message"', async () => {
    ReactNativeFirebase.Auth.mockCreateUserWithEmailAndPassword.mockImplementation(
      () => Promise.reject({message: 'ERROR_MESSAGE'}),
    );
    const spy = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<RegisterScreen />);

    const values = {email: 'uat_a@email.com', password: '123456'};
    fireEvent(getByTestId('email-input'), 'onChangeText', values.email);
    fireEvent(getByTestId('password-input'), 'onChangeText', values.password);
    await fireEvent.press(getByTestId('register-button'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Given I am at "Register Screen", And I fill data "correct data", When I press "Register Button", Then I should not see "Error Message"', async () => {
    const spy = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<RegisterScreen />);

    const values = {email: 'uat_a@email.com', password: '123456'};
    fireEvent(getByTestId('email-input'), 'onChangeText', values.email);
    fireEvent(getByTestId('password-input'), 'onChangeText', values.password);
    await fireEvent.press(getByTestId('register-button'));

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
