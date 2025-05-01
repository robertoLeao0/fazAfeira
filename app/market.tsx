import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { CarrinhoContext } from './_layout';
import { useRouter } from 'expo-router';

export default function MarketScreen() {
  const router = useRouter();
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  const produtos = [
    {
      id: '1',
      nome: 'Morango',
      descricao: 'Descrição do item',
      preco: 8.00,
      imagem: require('../assets/morango.png'),
    },
    {
      id: '2',
      nome: 'Limão',
      descricao: 'Descrição do item',
      preco: 2.50,
      imagem: require('../assets/limao.png'),
    },
    {
      id: '3',
      nome: 'Kiwi',
      descricao: 'Descrição do item',
      preco: 7,
      imagem: require('../assets/kiwi.png'),
    },
    {
      id: '4',
      nome: 'Uva',
      descricao: 'Descrição do item',
      preco: 5,
      imagem: require('../assets/uva.png'),
    },
    {
      id: '5',
      nome: 'Pera',
      descricao: 'Descrição do item',
      preco: 3,
      imagem: require('../assets/pera.png'),
    },
    {
      id: '6',
      nome: 'Maça',
      descricao: 'Descrição do item',
      preco: 4,
      imagem: require('../assets/maca.png'),
    },
    // Adicione mais conforme necessário
  ];

  const adicionar = (produto: any) => {
    const existe = carrinho.find(item => item.id === produto.id);
    if (existe) {
      setCarrinho(carrinho.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item));
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const remover = (produto: any) => {
    const existe = carrinho.find(item => item.id === produto.id);
    if (existe && existe.quantidade > 1) {
      setCarrinho(carrinho.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade - 1 } : item));
    } else {
      setCarrinho(carrinho.filter(item => item.id !== produto.id));
    }
  };

  const quantidadeTotal = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  const valorTotal = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  const sair = () => {
    Alert.alert('Sair', 'Você deseja sair?', [
      { text: 'Cancelar' },
      { text: 'Sim', onPress: () => router.replace('/login') },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>Faz@Feira</Text>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.sairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>


      {/* Carrinho */}
      <View style={styles.carrinhoTopo}>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <Text style={styles.carrinhoTexto}>🛒 Carrinho ({quantidadeTotal})</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const noCarrinho = carrinho.find(prod => prod.id === item.id);
          const quantidade = noCarrinho ? noCarrinho.quantidade : 0;
          return (
            <View style={styles.card}>
              <Image source={item.imagem} style={styles.imagem} />
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <View style={styles.qtdContainer}>
                <TouchableOpacity onPress={() => remover(item)} style={styles.qtdBotao}>
                  <Text style={styles.qtdTexto}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtdNumero}>{quantidade}</Text>
                <TouchableOpacity onPress={() => adicionar(item)} style={styles.qtdBotao}>
                  <Text style={styles.qtdTexto}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total: R$ {valorTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#648e4d', paddingTop: 50 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
  logo: { width: 60, height: 60, resizeMode: 'contain' },
  sair: { backgroundColor: '#ffffff55', padding: 8, borderRadius: 8 },
  sairTexto: { color: '#fff', fontWeight: 'bold' },
  carrinhoTopo: { alignItems: 'center', marginVertical: 10 },
  carrinhoTexto: { color: '#fff', fontSize: 16 },
  lista: { paddingHorizontal: 10 },
  card: {
    backgroundColor: '#ffffffcc',
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  imagem: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 10 },
  nome: { fontWeight: 'bold', fontSize: 14, color: '#333' },
  descricao: { fontSize: 12, color: '#555', marginBottom: 6 },
  preco: { fontSize: 14, color: '#2b5f2e', fontWeight: 'bold' },
  qtdContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtdBotao: {
    backgroundColor: '#2b5f2e',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  qtdTexto: { color: '#fff', fontSize: 18 },
  qtdNumero: { marginHorizontal: 8, fontSize: 16 },
  totalContainer: { padding: 15, backgroundColor: '#fff' },
  totalTexto: { fontSize: 16, fontWeight: 'bold', color: '#2b5f2e', textAlign: 'center' },

  titulo: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  
});
