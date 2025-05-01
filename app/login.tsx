import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [texto, setTexto] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Ilustração */}
      <Image source={require('../assets/personagem.png')} style={styles.ilustracao} />

      {/* Entrar */}
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/market')}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      {/* Inscrever-se */}
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/register')}>
        <Text style={styles.textoBotao}>Inscreva-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#648e4d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  ilustracao: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#7ea36b',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
