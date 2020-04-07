import {ReactNativeFirebase} from '@mocks';
import React from 'react';
import {Alert} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import {mockNavigate} from '__mocks__/@react-navigation/native';
import LoginScreen from './login';

describe('Login Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Given I am at "Login Screen", And I fill data "wrong data", When I press "Login Button", Then I should see "Error Message"', async () => {
    ReactNativeFirebase.Auth.mockSignInWithEmailAndPassword.mockImplementation(
      () => Promise.reject({message: 'ERROR_MESSAGE'}),
    );
    const spy = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<LoginScreen />);

    const values = {email: 'uat_a@email.com', password: '123456'};
    fireEvent(getByTestId('email-input'), 'onChangeText', values.email);
    fireEvent(getByTestId('password-input'), 'onChangeText', values.password);
    await fireEvent.press(getByTestId('login-button'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Given I am at "Login Screen", And I fill data "correct data", When I press "Login Button", Then I should not see "Error Message"', async () => {
    const spy = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<LoginScreen />);

    const values = {email: 'uat_a@email.com', password: '123456'};
    fireEvent(getByTestId('email-input'), 'onChangeText', values.email);
    fireEvent(getByTestId('password-input'), 'onChangeText', values.password);
    await fireEvent.press(getByTestId('login-button'));

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Given I am at "Login Screen", When I press "Register Button", Then I should see "Register Screen', async () => {
    const {getByTestId} = render(<LoginScreen />);

    await fireEvent.press(getByTestId('register-button'));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith('RegisterScreen');
  });
});
