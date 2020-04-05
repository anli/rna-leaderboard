import {by, device, element, expect, waitFor} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given any, When I open App, Then I should see plays list', async () => {
    const homeScreenId = by.id('home-screen');
    await waitFor(element(homeScreenId))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('play-create-button').withAncestor(homeScreenId)).tap();

    const playCreateScreenId = by.id('play-create-screen');
    await waitFor(element(playCreateScreenId))
      .toBeVisible()
      .withTimeout(10000);
    await element(
      by.id('title-input').withAncestor(playCreateScreenId),
    ).typeText('E2E_NEW_TITLE');
    await element(
      by.id('winner-input').withAncestor(playCreateScreenId),
    ).typeText('E2E_NEW_WINNER');
    await element(
      by.id('date-input').withAncestor(playCreateScreenId),
    ).typeText('2020-01-01');
    await element(
      by.id('participants-0-input').withAncestor(playCreateScreenId),
    ).typeText('E2E_NEW_PARTICIPANT_1');
    await element(by.id('participants-1-input')).typeText(
      'E2E_NEW_PARTICIPANT_2',
    );
    await element(
      by.id('play-create-button').withAncestor(playCreateScreenId),
    ).tap();

    await waitFor(element(by.text('E2E_NEW_TITLE').withAncestor(homeScreenId)))
      .toHaveText('E2E_NEW_TITLE')
      .withTimeout(10000);
    await expect(
      element(by.text('E2E_NEW_TITLE').withAncestor(homeScreenId)),
    ).toBeVisible();
    await expect(
      element(by.text('E2E_NEW_WINNER').withAncestor(homeScreenId)),
    ).toBeVisible();
    await expect(
      element(by.text('2020-01-01').withAncestor(homeScreenId)),
    ).toBeVisible();
    await expect(
      element(by.text('E2E_NEW_PARTICIPANT_1').withAncestor(homeScreenId)),
    ).toBeVisible();
    await expect(
      element(by.text('E2E_NEW_PARTICIPANT_2').withAncestor(homeScreenId)),
    ).toBeVisible();
  });
});
