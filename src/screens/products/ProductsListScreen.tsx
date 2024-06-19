import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../../store/products/productsSlice';
import { AppDispatch, RootState } from '../../store/store';

export const ProductsListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, currentPage } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const onPressItem = (id: number) => {
    navigation.navigate('Product', {id});
  }

  const renderItem = ({ item }: { item: { id: number, title: string, brand: string } }) => (
    <Pressable onPress={() => onPressItem(item.id)}>
      <View style={styles.item}>
        <Text>Id: {item.id}</Text>
        <Text>Nombre: {item.title}</Text>
        <Text>Marca: {item.brand}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
        />
        <Text>{currentPage}</Text>
        <Button
          title="Next"
          onPress={() => dispatch(setPage(currentPage + 1))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
