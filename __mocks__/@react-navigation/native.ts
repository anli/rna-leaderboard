export const mockNavigate = jest.fn(() => {});
export const mockGoBack = jest.fn(() => {});
export const mockUseRoute = jest.fn(() => {});

export const useNavigation = () => {
  return {
    navigate: mockNavigate,
    goBack: mockGoBack,
  };
};

export const useRoute = mockUseRoute;

export class Native {
  static mockNavigate = mockNavigate;
  static mockGoBack = mockGoBack;
  static mockUseRoute = mockUseRoute;
}
