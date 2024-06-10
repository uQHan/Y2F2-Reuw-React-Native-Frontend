import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { Link } from 'expo-router'
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/hooks/auth'


export default function Signup() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirm, onChangePasswordConfirm] = React.useState('');
  const { token, signup } = useAuth();
  const handleSignup = useCallback(async () => {
    await signup(email, password, passwordConfirm)
  }, [signup, email, password]);
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
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangePasswordConfirm(text)}
        value={password}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Link href={'/login'} style={{marginHorizontal: 15, marginVertical: 4}}>
        <ThemedText type='link'>
          Already have an account? Log In!
        </ThemedText>
      </Link>
      <Pressable onPress={handleSignup} style={{ zIndex: 0.5, alignItems: 'center', backgroundColor: 'cornflowerblue', height: 40, justifyContent: 'center', marginHorizontal: 100 }}>
        <ThemedText type='subtitle'>Signup</ThemedText>
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