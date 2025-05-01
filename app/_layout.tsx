import React, { useState } from 'react';
import { Slot } from 'expo-router';

type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem: any;
};

type ItemCarrinho = Produto & { quantidade: number };

export const CarrinhoContext = React.createContext<{
  carrinho: ItemCarrinho[];
  setCarrinho: React.Dispatch<React.SetStateAction<ItemCarrinho[]>>;
}>({
  carrinho: [],
  setCarrinho: () => {},
});

export default function Layout() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      <Slot />
    </CarrinhoContext.Provider>
  );
}
