const mockSignInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
const auth = () => ({
  onAuthStateChanged: (callback: any) => {
    callback(null);
    return () => jest.fn();
  },
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
});

export default auth;

export class Auth {
  static mockSignInWithEmailAndPassword = mockSignInWithEmailAndPassword;
}
