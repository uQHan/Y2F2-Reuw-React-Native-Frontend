import { View, Text, Button, Pressable } from 'react-native'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import React, { useCallback, useContext } from 'react'
import { useAuth } from '../hooks/auth';

export default function Login() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const { login } = useAuth();
  const handleLogin = useCallback(async () => {
    console.log(email, password)
    await login(email, password)
  },[login,email,password]) ;

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <Pressable onPress={handleLogin} style={{ zIndex: 0.5, }}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});