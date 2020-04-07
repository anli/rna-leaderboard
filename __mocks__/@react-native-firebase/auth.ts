const mockSignInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
const mockCreateUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));

const auth = () => ({
  onAuthStateChanged: (callback: any) => {
    callback(null);
    return () => jest.fn();
  },
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
});

export default auth;

export class Auth {
  static mockSignInWithEmailAndPassword = mockSignInWithEmailAndPassword;
  static mockCreateUserWithEmailAndPassword = mockCreateUserWithEmailAndPassword;
}
