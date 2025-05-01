import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CarrinhoContext } from './_layout';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const router = useRouter();

  const remover = (id: string) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const aumentar = (id: string) => {
    setCarrinho(carrinho.map(item =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    ));
  };

  const diminuir = (id: string) => {
    setCarrinho(carrinho.map(item =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    ));
  };

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>Carrinho</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.fechar}>
          <Text style={styles.fecharTexto}>✖</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de itens */}
      <FlatList
        data={carrinho}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imagem} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)} x {item.quantidade}</Text>
              <View style={styles.controles}>
                <TouchableOpacity onPress={() => diminuir(item.id)} style={styles.botao}>
                  <Text style={styles.botaoTexto}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtd}>{item.quantidade}</Text>
                <TouchableOpacity onPress={() => aumentar(item.id)} style={styles.botao}>
                  <Text style={styles.botaoTexto}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remover(item.id)} style={styles.remover}>
                  <Text style={styles.removerTexto}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Total */}
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      {/* Botões de ação */}
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.limpar} onPress={limparCarrinho}>
          <Text style={styles.botaoTextoGeral}>🧹 Limpar Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finalizar} onPress={() => router.push('/status')}>
          <Text style={styles.botaoTextoGeral}>✅ Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#648e4d',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -35 }],
  },
  fechar: {
    padding: 5,
  },
  fecharTexto: {
    fontSize: 22,
    color: '#fff',
  },
  lista: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  imagem: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  preco: {
    fontSize: 14,
    marginVertical: 5,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#2b5f2e',
    padding: 6,
    borderRadius: 6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  qtd: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  remover: {
    marginLeft: 10,
  },
  removerTexto: {
    color: 'red',
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  botoes: {
    gap: 10,
  },
  limpar: {
    backgroundColor: '#a32f2f',
    padding: 12,
    borderRadius: 10,
  },
  finalizar: {
    backgroundColor: '#2b5f2e',
    padding: 12,
    borderRadius: 10,
  },
  botaoTextoGeral: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
