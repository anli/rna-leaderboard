export const mockNavigate = jest.fn(() => {});
export const mockGoBack = jest.fn(() => {});

export const useNavigation = () => ({
  navigate: mockNavigate,
  goBack: mockGoBack,
});

export class Native {
  static mockNavigate = mockNavigate;
  static mockGoBack = mockGoBack;
}
