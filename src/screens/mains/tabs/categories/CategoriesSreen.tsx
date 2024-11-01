import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {getCategories} from '../../../../helper/apis/category.api';
import {category} from '../../../../helper/types/category.type';
import {handleSize} from '../../../../utils/handleSize';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamsListCategory} from '../CategoriesStacks';
import {useNavigation} from '@react-navigation/native';

type stackProps = StackNavigationProp<
  StackParamsListCategory,
  'CategorisScreen'
>;

const CategoriesSreen = () => {
  const navigation = useNavigation<stackProps>();
  const {data, isLoading, error} = useQuery({
    queryKey: ['getCategoriesParent', ''],
    queryFn: getCategories,
  });

  const [categoryParent, setcategoryParent] = useState<Array<category>>([]);
  const [categoryChildrent, setcategoryChildrent] = useState<Array<category>>(
    [],
  );
  const [idCategoryParentChoose, setidCategoryParentChoose] =
    useState<string>('');
  const [nameCateParentChoose, setnameCateParentChoose] = useState<string>('');

  useEffect(() => {
    if (data?.metadata.categories) {
      setcategoryParent(data.metadata.categories);
      setidCategoryParentChoose(data.metadata.categories[0]._id);
      setnameCateParentChoose(data.metadata.categories[0].name_category)
    }
  }, [data?.metadata.categories]);

  const asyncGetCateogriesChildrent = async (parent_id: string) => {
    const categories = await getCategories({queryKey: ['', parent_id]});
    if (categories) setcategoryChildrent(categories.metadata.categories);
  };

  useEffect(() => {
    if (idCategoryParentChoose) {
      asyncGetCateogriesChildrent(idCategoryParentChoose);
    }
  }, [idCategoryParentChoose]);

  return (
    <ContainerComponent
      isHeader
      back
      title="Categories"
      rightIcon={
        <FontAwesome5
          name="search"
          size={handleSize(20)}
          color={colors.Text_Color}
        />
      }
      styleHeader={styles.header}
      style={styles.container}>
      <SpaceComponent height={7} />
      <SectionComponent flex={0}>
        <FlatList
          data={categoryParent}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemCategoryParent}
              onPress={() => {
                setidCategoryParentChoose(item._id);
                setnameCateParentChoose(item.name_category);
              }}>
              <TextComponent
                text={item.name_category}
                font={fontFamilies.semiBold}
              />
              <SpaceComponent
                height={3}
                style={[
                  styles.underLine,
                  {
                    backgroundColor:
                      item._id === idCategoryParentChoose
                        ? colors.Primary_Color
                        : colors.White_Color,
                  },
                ]}
              />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SectionComponent>
      <SpaceComponent height={16} />
      <FlatList
        data={categoryChildrent}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductsToCategoryScreen', {
                parent_id: item._id,
                name_category_parent: `${item.name_category}`,
              });
            }}>
            <RowComponent flex={0} style={styles.itemCategoryChildrent}>
              <TextComponent
                text={item.name_category}
                size={18}
                font={fontFamilies.semiBold}
                style={styles.nameCateChildrent}
              />
              <Image
                source={{uri: item.image_category.url}}
                style={styles.imageCateChildrent}
              />
            </RowComponent>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.listCategoryChildren}
        ItemSeparatorComponent={() => <SpaceComponent height={16} />}
      />
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  imageCateChildrent: {
    height: '100%',
    width: '50%',
    borderTopEndRadius: handleSize(8),
    borderBottomEndRadius: handleSize(8),
  },
  nameCateChildrent: {
    flex: 1,
    marginLeft: handleSize(23),
  },
  itemCategoryChildrent: {
    backgroundColor: colors.White_Color,
    width: '100%',
    height: handleSize(100),
    borderRadius: handleSize(8),
  },
  listCategoryChildren: {
    paddingHorizontal: handleSize(16),
  },
  underLine: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  itemCategoryParent: {
    paddingVertical: handleSize(11),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.White_Color,
    height: handleSize(44),
    width: handleSize(125),
  },
  container: {
    paddingHorizontal: 0,
  },
  header: {
    backgroundColor: colors.White_Color,
    elevation: 5,
  },
});

export default CategoriesSreen;
