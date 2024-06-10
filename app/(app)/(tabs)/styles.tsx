import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
   headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
   },
   container: {
      flexDirection: 'row',
      gap: 8,
   },
   titleContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',

      margin: 10,
   },
   textContainer: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
   },
   postImageCotainer: {
      width: 50,
      height: 50,
   },
   profileImageCotainer: {
      width: 200,
      height: 200,
      zIndex: 5,
      alignSelf: 'center',
      alignItems: 'center',
   },
   pfpImage: {
      borderRadius: 100,
      width: 200,
      height: 200,
      resizeMode: 'cover'
   }
})