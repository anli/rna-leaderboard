import {by, device, element, expect} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I am at "Leaderboard Screen", Then I should see "Leaderboard"', async () => {
    await expect(element(by.text('Leaderboard'))).toBeVisible();
  });
});
