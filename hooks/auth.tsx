import { apiUrl, baseHeaders, baseUrl, tokenHeaders } from '@/constants/api';
import { router } from 'expo-router';
import React, {
   createContext,
   useCallback,
   useState,
   useContext,
} from 'react'
import { MMKV, useMMKVString } from 'react-native-mmkv';

export interface User {
   user_id: number;
   email: string;
   email_verified_at: null;
   role: number;
   deactivated: number;
   created_at: string | null;
   updated_at: string | null;
   settings: Settings | null;
}

export interface Settings {
   user_id: number;
   username: string;
   dob: string;
   gender: null | string;
   pfp_url: string;
   bio: null | string;
   website: null | string;
   dark_mode: null;
   block_tags: null;
   created_at: string;
   updated_at: string;
}

interface AuthContextType {
   token: string | undefined;
   getUser: () => Promise<void>;
   currentUser: User | null;
   login: (
      email: string,
      password: string,
   ) => Promise<void>;
   logout: () => Promise<void>;
   signup: (
      email: string,
      password: string,
      passwordConfirm: string,
   ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);

export function AuthProvider(props: React.PropsWithChildren) {
   const [currentUser, setCurrentUser] = useState<User>({} as User);
   const [token, setToken] = useMMKVString('authToken');

   const login = useCallback(async (email: string, password: string) => {
      fetch(apiUrl + "login", {
         method: 'POST',
         headers: baseHeaders,
         body: JSON.stringify({
            loginEmail: email,
            loginPassword: password,
            loginRemember: false
         })
      })
         .then(response => response.json())
         .then(json => {
            setToken(json.token)
            console.log(json.token)
            getUser
            if (currentUser.settings) {
               router.replace('/settings')
            } else {
               router.replace('/')
            }
         })
         .catch(error => {
            console.error(error);
         });
   }, []);

   const logout = useCallback(async () => {
      fetch(apiUrl + "logout", {
         method: 'GET',
         headers: baseHeaders,
      })
         .then(() => {
            setToken('')
         })
         .catch(error => {
            console.error(error);
         });
      setCurrentUser({} as User);
   }, []);

   const signup = useCallback(async (email: string, password: string, passwordConfirm: string) => {
      fetch(apiUrl + "register", {
         method: 'POST',
         headers: baseHeaders,
         body: JSON.stringify({
            registerEmail: email,
            registerPassword: password,
            registerPassword_confirmation: passwordConfirm
         })
      })
         .then(response => response.json())
         .then(json => {
            setToken(json.token)
            console.log(json.token)
            getUser;
            if (currentUser.settings) {
               router.replace('/settings')
            } else {
               router.replace('/')
            }
         })
         .catch(error => {
            console.error(error);
         });
   }, []);


   const getUser = useCallback(async () => {
      if (token) {
         fetch(apiUrl + "user", {
            method: 'GET',
            headers: tokenHeaders(),
         })
            .then(reponse => reponse.json())
            .then(json => {
               setCurrentUser(json.user as User)
            })
            .catch(error => {
               console.error(error);
            });
      }
   }, []);

   if (token) {
      getUser;
   }

   return (
      <AuthContext.Provider value={{ token, getUser, currentUser, login, logout, signup }}>
         {props.children}
      </AuthContext.Provider>
   );
};

export function useAuth(): AuthContextType {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}