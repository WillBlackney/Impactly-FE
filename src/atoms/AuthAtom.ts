import { atom } from "recoil";

export interface AuthState {
  loggedInUser: UserData | null;
}

export type UserData = {
    userName: string;
}

const defaultState: AuthState = {
  loggedInUser: null,
};

export const authModalState = atom<AuthState>({
  key: "authState",
  default: defaultState,
});