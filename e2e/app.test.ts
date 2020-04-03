import {by, device, element, expect, waitFor} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I open App, Then I should see plays list', async () => {
    const title = element(by.text('E2E_PLAY_TITLE_A'));
    await waitFor(title)
      .toHaveText('E2E_PLAY_TITLE_A')
      .withTimeout(10000);
    await expect(title).toBeVisible();

    await expect(element(by.text('E2E_PLAY_WINNER_A'))).toBeVisible();
    await expect(element(by.text('2020-04-01'))).toBeVisible();
    await expect(element(by.text('E2E_PLAY_PARTICIPANT_A'))).toBeVisible();
    await expect(element(by.text('E2E_PLAY_PARTICIPANT_B'))).toBeVisible();
  });
});
