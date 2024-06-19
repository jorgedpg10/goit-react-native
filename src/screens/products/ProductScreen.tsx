import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux";

export const ProductScreen = ({ route }) => {
  const { id } = route.params;
  const { items } = useSelector((state: any) => state.products);
  const [item, setItem] = useState({})


  useEffect(() => {
   setItem(items[id - 1])
  }, [])
  

  return (
    <View style={styles.container}>
          <Text>id: {item.id}</Text>
          <Text>Nombre: {item.title}</Text>
          <Text>Precio: {item.price}</Text>
          <Text>SKU: {item.sku}</Text>
          <Text>Marca: {item.brand}</Text>
          {item.thumbnail ? (
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
          ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

