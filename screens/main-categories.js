import React from 'react'
import { Button, Text } from 'native-base'
import { StoreContext } from '../data/store'
import { randomColors } from '../data/config'
import labels from '../data/labels'
import { FlatList, StyleSheet } from 'react-native'
import { AppLoading } from 'expo';

const MainCategories = () => {
  const { state } = React.useContext(StoreContext)
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    setCategories(() => {
      const categories = state.categories.filter(c => c.parentId === '0')
      return categories.sort((c1, c2) => c1.ordering - c2.ordering)  
    })
  }, [state.categories])
  const renderItem = ({item, index}) => {
    return (
      <Button block style={{backgroundColor: randomColors[index], margin: 10}}> 
        <Text>{item.name}</Text>
      </Button>
    )
  }
  let i = 0
  if (state.categories.length === 0) return <AppLoading />
  return (
    <React.Fragment>
      {categories.length === 0 ?
        <Text>{labels.noData}</Text>
      : <FlatList 
          data={categories} 
          renderItem={renderItem} 
          keyExtractor={item => item.id}
        />
      }
    </React.Fragment>
  )

}
export default MainCategories

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    margin: 10
  },
});
