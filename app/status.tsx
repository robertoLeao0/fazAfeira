import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CarrinhoContext } from './_layout';

const etapas = [
  {
    texto: 'Seu pedido foi recebido.',
    imagem: require('../assets/pedido.png'),
  },
  {
    texto: 'Seus produtos estão com o motoboy para entrega.',
    imagem: require('../assets/motoboy.png'),
  },
  {
    texto: 'Seu produto foi entregue.',
    imagem: require('../assets/entregue.png'),
  },
];

export default function StatusScreen() {
  const router = useRouter();
  const { setCarrinho } = useContext(CarrinhoContext);
  const [etapa, setEtapa] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const [mostrarInput, setMostrarInput] = useState(false);
  const [avaliacao, setAvaliacao] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEtapa((prev) => {
        if (prev < 2) return prev + 1;
        clearInterval(interval);
        setMostrarInput(true);
        return prev;
      });
    }, 5000);

    Animated.timing(progress, {
      toValue: 100,
      duration: 15000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(interval);
  }, []);

  const enviarAvaliacao = () => {
    if (avaliacao.trim() === '') return;
    setEnviado(true);
    setTimeout(() => {
      setCarrinho([]);
      router.replace('/market');
    }, 2000);
  };

  const widthInterpolada = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acompanhamento do Pedido</Text>

      {etapas.map((e, index) => (
        <View key={index} style={styles.etapa}>
          <Image source={e.imagem} style={styles.img} />
          <View style={styles.textoArea}>
            <Text
              style={[
                styles.texto,
                etapa >= index ? styles.textoAtivo : styles.textoInativo,
              ]}
            >
              {e.texto}
            </Text>
            {etapa === index && etapa === 2 && (
              <Text style={styles.check}>✔</Text>
            )}
          </View>
        </View>
      ))}

      <View style={styles.barra}>
        <Animated.View style={[styles.preenchido, { width: widthInterpolada }]} />
      </View>

      {mostrarInput && !enviado && (
        <View style={styles.avaliacaoBox}>
          <Text style={styles.label}>Avaliação</Text>
          <TextInput
            value={avaliacao}
            onChangeText={setAvaliacao}
            placeholder="Digite sua opinião..."
            style={styles.input}
          />
          <TouchableOpacity style={styles.botao} onPress={enviarAvaliacao}>
            <Text style={styles.botaoTexto}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}

      {enviado && (
        <Text style={styles.enviado}>✅ Avaliação enviada com sucesso!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#648e4d',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  etapa: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  textoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  texto: {
    fontSize: 16,
    flexShrink: 1,
  },
  textoAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoInativo: {
    color: '#ccc',
  },
  check: {
    marginLeft: 10,
    fontSize: 18,
    color: 'lightgreen',
  },
  barra: {
    width: '100%',
    height: 15,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 10,
  },
  preenchido: {
    height: '100%',
    backgroundColor: 'lightgreen',
  },
  avaliacaoBox: {
    marginTop: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#2b5f2e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  enviado: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
