import { FirebaseUserAdapter } from ".";
import { firebaseMockData } from "./data";

describe('FirebaseUserAdapter', () => {

  it('Should adapt object from firebase to domain', () => {
    expect(new FirebaseUserAdapter(firebaseMockData)).toEqual({
      id: 'RmCwEpg7YMeU4ihCKTTNYcK1zfN2',
      email: 'john.doe@handtalk.com',
      name: 'John Doe',
    })
  });

  it('Should throw if email is not provided', () => {
    const firebaseData = {
      ...firebaseMockData,
      user: {
        ...firebaseMockData.user,
        email: null, 
      }
    };
    expect(() => new FirebaseUserAdapter(firebaseData)).toThrow()
  });

  it('Should throw if displayName is not provided', () => {
    const firebaseData = {
      ...firebaseMockData,
      user: {
        ...firebaseMockData.user,
        displayName: null, 
      }
    };
    expect(() => new FirebaseUserAdapter(firebaseData)).toThrow()
  });
});