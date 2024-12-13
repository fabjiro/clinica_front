/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserDataEntity } from "../../domain/entity/user/IUserDataEntity";
import { queryClient } from "../../config/query.config";
import { useBillingStore } from "../screens/Billing/store/billing.store";

export interface IAuthStore {
  setUserData: (data: IUserDataEntity) => void;
  logOut: () => void;
  isAuth: () => boolean;
  userData?: IUserDataEntity;
}

const billisStore = useBillingStore.getState();


export const useAuthStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      setUserData: (data: IUserDataEntity) =>
        set({
          userData: data,
        }),
      logOut: () => {
        set({ userData: undefined });
        queryClient.clear();
        billisStore.clearCart();
      },
      isAuth: () => {
        return !!get().userData?.token;
      },
    }),
    {
      name: "auth",
    }
  )
);
