import {by, device, element, expect, waitFor} from 'detox';

describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Given I am at "Home Screen", and I press "Create Play Button", and I fill form with data, When I press "Save Button", Then I should see data', async () => {
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

  it('Given data and I am at "Home Screen", When I press "Play", Then I am at "Play Detail Screen", and I should see data', async () => {
    await waitFor(element(by.id('play-detail-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('play-detail-button')).tap();

    const playDetailScreenId = by.id('play-detail-screen');
    await waitFor(element(playDetailScreenId))
      .toBeVisible()
      .withTimeout(10000);
    await expect(
      element(by.text('E2E_NEW_TITLE').withAncestor(playDetailScreenId)),
    ).toBeVisible();
    await expect(
      element(by.text('E2E_NEW_WINNER').withAncestor(playDetailScreenId)),
    ).toBeVisible();
    await expect(
      element(by.text('2020-01-01').withAncestor(playDetailScreenId)),
    ).toBeVisible();
    await expect(
      element(
        by.text('E2E_NEW_PARTICIPANT_1').withAncestor(playDetailScreenId),
      ),
    ).toBeVisible();
    await expect(
      element(
        by.text('E2E_NEW_PARTICIPANT_2').withAncestor(playDetailScreenId),
      ),
    ).toBeVisible();
  });
});
