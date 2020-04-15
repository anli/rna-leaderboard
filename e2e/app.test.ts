import {by, device, element, expect} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I am at "Leaderboard Screen", Then I should see "Leaderboard", And I should see "Filters"', async () => {
    await expect(element(by.text('Leaderboard'))).toBeVisible();

    await expect(element(by.text('Scythe'))).toBeVisible();
    await expect(element(by.text('Agricola'))).toBeVisible();
    await expect(element(by.text('Clank!'))).toBeVisible();
  });
});
