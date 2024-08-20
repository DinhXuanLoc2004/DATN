import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import ItemReviewComponent from './src/components/layouts/ItemReviewComponent';
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <StatusBar />
      <ItemReviewComponent 
        userImage='https://tse2.mm.bing.net/th?id=OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8&pid=Api&P=0&h=180'
        userName='Tri'
        rating={4}
        reviewDate={new Date(2024, 8, 19)}
        reviewText='kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
        arrImage={[
          'http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-62_044135376.jpg',
          'https://tse3.mm.bing.net/th?id=OIP.94-AotN7wmEJEpbouOzJ3QHaHa&pid=Api&P=0&h=180',
          'https://tse3.mm.bing.net/th?id=OIP.XCjrfn_FZqjIVVQBwiZQvgHaEo&pid=Api&P=0&h=180'
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;