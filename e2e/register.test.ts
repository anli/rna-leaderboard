import {by, device, element, expect} from 'detox';
import {iAmAtScreen$, iFillForm$, iPressButton$} from './helpers';

describe('User Register', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given I am user type "Public", and I am at "Login Screen", and I press "Register Button", and I am at "Register Screen, and I fill form with data, When I press "Register Button", Then I should see "Onboarding Screen"', async () => {
    await iAmAtScreen$('login-screen');
    await expect(element(by.id('register-tab-button'))).toBeVisible();
    await element(by.id('register-tab-button')).tap();

    await expect(element(by.id('register-tab'))).toBeVisible();
    const data = {
      'email-input': 'E2E_NEW@email.com',
      'password-input': '123456',
      'password-confirmation-input': '123456',
    };
    await iFillForm$(data, 'register-tab');
    await iPressButton$('register-button', 'register-tab');

    await iAmAtScreen$('onboarding-screen');
    await expect(element(by.id('onboarding-screen'))).toBeVisible();
  });

  it('Given I am user type "New", and I am at "Onboarding Screen", and I fill data, When I press "Continue Button", Then I should see "Home Screen"', async () => {
    await iAmAtScreen$('onboarding-screen');
    const data = {
      'name-input': 'e2e_new_name',
    };

    await element(
      by.id('name-input').withAncestor(by.id('onboarding-screen')),
    ).typeText(data['name-input']);
    await iPressButton$('continue-button', 'onboarding-screen');

    await iAmAtScreen$('home-screen');
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
