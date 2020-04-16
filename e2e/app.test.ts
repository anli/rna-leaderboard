import {by, device, element, expect} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I am at "Leaderboard Screen", Then I should see "Leaderboard", And I should see "Filters" And I should see "Players Rank List"', async () => {
    await expect(element(by.text('Leaderboard'))).toBeVisible();

    await expect(element(by.text('Scythe'))).toBeVisible();
    await expect(element(by.text('Agricola'))).toBeVisible();
    await expect(element(by.text('Clank!'))).toBeVisible();

    await expect(element(by.text('1'))).toBeVisible();
    await expect(element(by.text('John'))).toBeVisible();
    await expect(element(by.text('40 Wins 10 Losses'))).toBeVisible();

    await expect(element(by.text('1'))).toBeVisible();
    await expect(element(by.text('Mary'))).toBeVisible();
    await expect(element(by.text('10 Wins 2 Losses'))).toBeVisible();

    await expect(element(by.text('3'))).toBeVisible();
    await expect(element(by.text('Jane'))).toBeVisible();
    await expect(element(by.text('50 Wins 20 Losses'))).toBeVisible();
  });
});
