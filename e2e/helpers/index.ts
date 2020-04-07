import {by, element, expect, waitFor} from 'detox';

export const iFillForm$ = async (
  values: {[key: string]: string},
  screenId: string,
) => {
  Object.keys(values).forEach(async (key: string) => {
    const value = values[key];
    await element(by.id(key).withAncestor(by.id(screenId))).replaceText(value);
  });
};

export const iShouldSeeData$ = async (values: string[], screenId: string) => {
  values.forEach(async (value: string) => {
    await expect(
      element(by.text(value).withAncestor(by.id(screenId))),
    ).toBeVisible();
  });
};

export const iAmAtScreen$ = async (screenId: string) => {
  await waitFor(element(by.id(screenId)))
    .toBeVisible()
    .withTimeout(10000);
};

export const iPressButton$ = async (buttonId: string, screenId: string) => {
  await element(by.id(buttonId).withAncestor(by.id(screenId))).tap();
};
