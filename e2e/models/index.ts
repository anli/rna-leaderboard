import {by, element, expect, waitFor} from 'detox';

export class PlayDetailScreen {
  static iPressDeleteButton$ = async () => {
    const button = element(by.id('play-delete-button'));
    await waitFor(button)
      .toBeVisible()
      .withTimeout(10000);
    await button.tap();
    return;
  };

  static iPressDeleteConfirmButton$ = async () => {
    const button = element(by.text('Confirm'));
    await waitFor(button)
      .toBeVisible()
      .withTimeout(10000);
    await button.tap();
    return;
  };
}

export class HomeScreen {
  static iAmAtPlayDetailScreen$ = async () => {
    const button = element(by.id('play-detail-button-0'));
    await waitFor(button)
      .toBeVisible()
      .withTimeout(10000);
    await button.tap();

    const playDetailScreenId = by.id('play-detail-screen');
    await waitFor(element(playDetailScreenId))
      .toBeVisible()
      .withTimeout(10000);
    return;
  };

  static iAmAtHomeScreen$ = async () => {
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(10000);
  };

  static iShouldNotSeeData$ = async (text: string) => {
    await expect(
      element(by.text(text).withAncestor(by.id('home-screen'))),
    ).toBeNotVisible();
  };
}
