import { MMKV, useMMKVString } from "react-native-mmkv";

export const apiUrl = "http://127.0.0.1:8000/api/"
export const baseUrl = "http://127.0.0.1:8000/"
export const baseHeaders = {
   Accept: 'application/json',
   'Content-Type': 'application/json',
}

export function tokenHeaders(token?: string) {
   const storage = new MMKV();
   const AuthToken = token ?? storage.getString('authToken')
   return (
      {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + AuthToken,
      }
   )
}

export function mediaHeaders(token?: string) {
   const storage = new MMKV();
   const AuthToken = token ?? storage.getString('authToken')
   return (
      {
         Accept: 'application/json',
         'Authorization': 'Bearer ' + AuthToken,
         charset: 'utf-8'
      }
   )
}