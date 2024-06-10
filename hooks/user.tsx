import { apiUrl, tokenHeaders } from "@/constants/api";
import { User, useAuth } from "./auth";
import { MMKV } from "react-native-mmkv";


export async function getUserProfile(user_id: string) {
   const { token } = useAuth()
   fetch(apiUrl + "profile/" + user_id, {
      method: 'GET',
      headers: tokenHeaders(token ?? ''),
   })
      .then(reponse => reponse.json())
      .then(json => {
         console.log(json);
         return json;
      })
      .catch(error => {
         console.error(error);
      });
}