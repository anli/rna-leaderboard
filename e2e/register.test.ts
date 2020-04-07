import {by, device, element, expect} from 'detox';
import {iAmAtScreen$, iFillForm$, iPressButton$} from './helpers';

describe('User Register', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given I am user type "Public", and I am at "Login Screen", and I press "Register Button", and I am at "Register Screen, and I fill form with data, When I press "Register Button", Then I should see "Home Screen"', async () => {
    await iAmAtScreen$('login-screen');
    await expect(element(by.id('login-screen'))).toBeVisible();
    await iPressButton$('register-button', 'login-screen');

    await iAmAtScreen$('register-screen');
    const data = {
      'email-input': 'E2E_NEW@email.com',
      'password-input': '123456',
    };
    await iFillForm$(data, 'register-screen');
    await iPressButton$('register-button', 'register-screen');

    await iAmAtScreen$('home-screen');
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
