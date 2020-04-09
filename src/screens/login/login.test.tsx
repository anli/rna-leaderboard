import {ReactNativeFirebase} from '@mocks';
import React from 'react';
import {Alert} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import {act} from 'react-test-renderer';
import LoginScreen from './login';
77;

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
    await act(
      async () =>
        await fireEvent(
          getByTestId('email-input'),
          'onChangeText',
          values.email,
        ),
    );
    await act(
      async () =>
        await fireEvent(
          getByTestId('password-input'),
          'onChangeText',
          values.password,
        ),
    );
    await act(async () => await fireEvent.press(getByTestId('login-button')));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Given I am at "Login Screen", And I fill data "correct data", When I press "Login Button", Then I should not see "Error Message"', async () => {
    const spy = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<LoginScreen />);
    const values = {email: 'uat_a@email.com', password: '123456'};
    await act(
      async () =>
        await fireEvent(
          getByTestId('email-input'),
          'onChangeText',
          values.email,
        ),
    );
    await act(
      async () =>
        await fireEvent(
          getByTestId('password-input'),
          'onChangeText',
          values.password,
        ),
    );
    await act(async () => await fireEvent.press(getByTestId('login-button')));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Given I am at "Login Screen", and I press "Register Tab", And I fill data "correct data", When I press "Register Button", Then I should not see "Error Message"', async () => {
    const {getByTestId} = render(<LoginScreen />);
    await fireEvent.press(getByTestId('register-tab-button'));

    await expect(getByTestId('register-tab')).toBeDefined();

    const spy = jest.spyOn(Alert, 'alert');

    const values = {
      email: 'uat_a@email.com',
      password: '123456',
    };
    await act(
      async () =>
        await fireEvent(
          getByTestId('email-input'),
          'onChangeText',
          values.email,
        ),
    );
    await act(
      async () =>
        await fireEvent(
          getByTestId('password-input'),
          'onChangeText',
          values.password,
        ),
    );
    await act(
      async () =>
        await fireEvent(
          getByTestId('password-confirmation-input'),
          'onChangeText',
          values.password,
        ),
    );
    await act(
      async () => await fireEvent.press(getByTestId('register-button')),
    );
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Given I am at "Login Screen", and I press "Register Tab", And I fill data "wrong data", When I press "Register Button", Then I should see "Error Message"', async () => {
    ReactNativeFirebase.Auth.mockCreateUserWithEmailAndPassword.mockImplementation(
      () => Promise.reject({message: 'ERROR_MESSAGE'}),
    );
    const {getByTestId} = render(<LoginScreen />);
    await fireEvent.press(getByTestId('register-tab-button'));

    await expect(getByTestId('register-tab')).toBeDefined();

    const spy = jest.spyOn(Alert, 'alert');

    const values = {
      email: 'uat_a@email.com',
      password: '123456',
    };
    await act(
      async () =>
        await fireEvent(
          getByTestId('email-input'),
          'onChangeText',
          values.email,
        ),
    );
    await act(
      async () =>
        await fireEvent(
          getByTestId('password-input'),
          'onChangeText',
          values.password,
        ),
    );
    await act(
      async () =>
        await fireEvent(
          getByTestId('password-confirmation-input'),
          'onChangeText',
          values.password,
        ),
    );
    await act(
      async () => await fireEvent.press(getByTestId('register-button')),
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Given I am at "Login Screen", And I am at "Sign Up Tab", When I press "Sign In Tab Button", Then I should see "Sign In Tab"', async () => {
    const {getByTestId} = render(<LoginScreen />);
    await fireEvent.press(getByTestId('register-tab-button'));

    await expect(getByTestId('register-tab')).toBeDefined();
    await fireEvent.press(getByTestId('login-tab-button'));
    await expect(getByTestId('login-tab')).toBeDefined();
  });
});
