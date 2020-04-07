import {by, device, element, expect, waitFor} from 'detox';
import {HomeScreen, PlayDetailScreen} from './models';

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
    await HomeScreen.iAmAtPlayDetailScreen$();

    const playDetailScreenId = by.id('play-detail-screen');
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

  it('Given I am at "Play Detail Screen" with data Play, And I press "Update Button", And I fill form with new data, When I press "Save Button", Then I am at "Home Screen", and I should see new data', async () => {
    await iAmAtScreen$('home-screen');
    await iPressButton$('play-detail-button-0', 'home-screen');

    await iAmAtScreen$('play-detail-screen');
    await iPressButton$('play-update-button', 'play-detail-screen');

    await iAmAtScreen$('play-update-screen');
    const data = {
      'title-input': 'E2E_UPDATE_TITLE',
      'winner-input': 'E2E_UPDATE_WINNER',
      'date-input': '2020-05-05',
      'participants-0-input': 'E2E_UPDATE_PARTICIPANT_1',
      'participants-1-input': 'E2E_UPDATE_PARTICIPANT_2',
    };
    await iFillForm$(data, 'play-update-screen');
    await iPressButton$('play-update-button', 'play-update-screen');

    await iAmAtScreen$('home-screen');
    await iShouldSeeData$(
      [
        'E2E_UPDATE_TITLE',
        'E2E_UPDATE_WINNER',
        '2020-05-05',
        'E2E_UPDATE_PARTICIPANT_1',
        'E2E_UPDATE_PARTICIPANT_2',
      ],
      'home-screen',
    );
  });

  it('Given I am at "Play Detail Screen" with data Play, When I press "Delete Button", And I press "Confirm Button", Then I am at "Home Screen", and I should not see data', async () => {
    await HomeScreen.iAmAtPlayDetailScreen$();
    await PlayDetailScreen.iPressDeleteButton$();
    await PlayDetailScreen.iPressDeleteConfirmButton$();
    await HomeScreen.iAmAtHomeScreen$();
    await HomeScreen.iShouldNotSeeData$('E2E_NEW_TITLE');
  });
});

const iFillForm$ = async (
  values: {[key: string]: string},
  screenId: string,
) => {
  Object.keys(values).forEach(async (key: string) => {
    const value = values[key];
    await element(by.id(key).withAncestor(by.id(screenId))).replaceText(value);
  });
};

const iShouldSeeData$ = async (values: string[], screenId: string) => {
  values.forEach(async (value: string) => {
    await expect(
      element(by.text(value).withAncestor(by.id(screenId))),
    ).toBeVisible();
  });
};

const iAmAtScreen$ = async (screenId: string) => {
  await waitFor(element(by.id(screenId)))
    .toBeVisible()
    .withTimeout(10000);
};

const iPressButton$ = async (buttonId: string, screenId: string) => {
  await element(by.id(buttonId).withAncestor(by.id(screenId))).tap();
};
