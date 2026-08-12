import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/storageKeys";

const AuthContext = createContext(null);

const demoUser = {
  id: "demo-user",
  fullName: "کاربر نمونه",
  email: "demo@laptopstore.ir",
  password: "laptop123",
  phone: "09120000000",
  createdAt: "2026-06-23T12:00:00.000Z",
};

const withoutPassword = ({ password, ...user }) => user;

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(
    STORAGE_KEYS.USERS,
    [demoUser]
  );

  const [currentUser, setCurrentUser] = useLocalStorage(
    STORAGE_KEYS.CURRENT_USER,
    null
  );

  const isAuthenticated = Boolean(currentUser);

  const getUserByEmail = useCallback(
    (email) =>
      users.find(
        (user) =>
          user.email.toLowerCase() === String(email).trim().toLowerCase()
      ),
    [users]
  );

  const register = useCallback(
    (userData) => {
      if (getUserByEmail(userData.email)) {
        return {
          success: false,
          message: "این ایمیل قبلاً ثبت شده است.",
        };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        fullName: userData.fullName.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        phone: userData.phone?.trim() || "",
        createdAt: new Date().toISOString(),
      };

      setUsers((items) => [...items, newUser]);
      setCurrentUser(withoutPassword(newUser));

      return {
        success: true,
        message: "حساب کاربری شما با موفقیت ایجاد شد.",
      };
    },
    [getUserByEmail, setUsers, setCurrentUser]
  );

  const login = useCallback(
    (email, password) => {
      const normalizedEmail = String(email).trim().toLowerCase();

      const user = users.find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail &&
          item.password === password
      );

      if (!user) {
        return {
          success: false,
          message: "ایمیل یا رمز عبور صحیح نیست.",
        };
      }

      setCurrentUser(withoutPassword(user));

      return {
        success: true,
        message: `خوش آمدید ${user.fullName}.`,
      };
    },
    [users, setCurrentUser]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);

    return {
      success: true,
      message: "با موفقیت از حساب کاربری خارج شدید.",
    };
  }, [setCurrentUser]);

  const updateProfile = useCallback(
    (updatedData) => {
      if (!currentUser) {
        return {
          success: false,
          message: "ابتدا وارد حساب کاربری شوید.",
        };
      }

      const nextEmail = updatedData.email.trim().toLowerCase();

      const sameEmailOwner = users.find(
        (user) =>
          user.email.toLowerCase() === nextEmail &&
          user.id !== currentUser.id
      );

      if (sameEmailOwner) {
        return {
          success: false,
          message: "این ایمیل توسط کاربر دیگری استفاده شده است.",
        };
      }

      const updatedUser = {
        ...currentUser,
        fullName: updatedData.fullName.trim(),
        email: nextEmail,
        phone: updatedData.phone?.trim() || "",
      };

      setUsers((items) =>
        items.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                ...updatedUser,
              }
            : user
        )
      );

      setCurrentUser(updatedUser);

      return {
        success: true,
        message: "اطلاعات پروفایل با موفقیت ذخیره شد.",
      };
    },
    [currentUser, users, setUsers, setCurrentUser]
  );

  const value = useMemo(
    () => ({
      currentUser,
      users,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile,
      getUserByEmail,
    }),
    [
      currentUser,
      users,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile,
      getUserByEmail,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود.");
  }

  return context;
}
