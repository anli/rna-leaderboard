import {by, device, element, expect} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I open App, Then I should see "Home"', async () => {
    await expect(element(by.text('Home'))).toBeVisible();
  });
});
