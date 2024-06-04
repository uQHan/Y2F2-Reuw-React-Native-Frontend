import { apiUrl } from '@/constants/api';
import React, {
   createContext,
   useCallback,
   useState,
   useContext,
} from 'react'
import { MMKV, useMMKVString } from 'react-native-mmkv';

interface User {
   id: number;
   name: string;
   email: string;
   dob: string | null;
   gender: string | null;
   pfpUrl: string;
   bio: string | null;
   website: string | null;
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
}

const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);

export function AuthProvider(props: React.PropsWithChildren) {
   const [currentUser, setCurrentUser] = useState<User>({} as User);
   const [token, setToken] = useMMKVString('authToken');

   const login = useCallback(async (email: string, password: string) => {
      fetch(apiUrl + "login", {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            loginEmail: email,
            loginPassword: password,
            loginRemember: false
         })
      })
         .then(response => response.json())
         .then(json => {
            setToken(json.token)
            console.log(json.token);
         })
         .catch(error => {
            console.error(error);
         });
   },[]);

   const logout = useCallback(async () => {
      
      fetch(apiUrl + "logout", {
         method: 'GET',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         }
      })
         .then(reponse => reponse.json())
         .then(json => {

            setToken('')
            console.log(json.data);
         })
         .catch(error => {
            console.error(error);
         });
      setCurrentUser({} as User);
   },[]);

   const getUser = useCallback(async () => {
      if (token){
         fetch(apiUrl + "user", {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: token,
            }
         })
            .then(reponse => reponse.json())
            .then(json => {
               setCurrentUser(json as User);
               console.log(currentUser);
            })
            .catch(error => {
               console.error(error);
            });
      }
   },[]);

   if (token) {
      getUser;
   }

   return (
      <AuthContext.Provider value={{ token, getUser, currentUser, login, logout }}>
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