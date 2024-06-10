import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import React, { useCallback } from 'react'
import { useAuth } from '../hooks/auth';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

export default function Login() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const { token, login } = useAuth();
  const handleLogin = useCallback(async () => {
    console.log(email, password)
    await login(email, password)
  }, [login, email, password]);

  return (
    <SafeAreaView>
      <Header/>
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
      <Link href={'/signup'} style={{marginHorizontal: 15, marginVertical: 4}}>
        <ThemedText type='link'>
          Don't have an account? Singup
        </ThemedText>
      </Link>
      <Pressable onPress={handleLogin} style={{ zIndex: 0.5, alignItems: 'center', backgroundColor: '#e6e6e6', height: 40, justifyContent: 'center', marginHorizontal: 100 }}>
        <ThemedText type='subtitle'>LOGIN</ThemedText>
      </Pressable>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
  },
});