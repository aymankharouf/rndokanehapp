import React from 'react'
import { Button } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'
import { randomColors } from '../data/config'
import { iCategory } from '../data/interfaces'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'

const Categories = (props: any) => {
  const { state } = React.useContext(StoreContext)
  const [categories, setCategories] = React.useState<iCategory[]>([])
  React.useEffect(() => {
    setCategories(() => {
      const categories = state.categories.filter(c => c.parentId === props.route.params.id)
      return categories.sort((c1, c2) => c1.ordering - c2.ordering)
    })
  }, [state.categories, props.id])
  const renderItem = (item: iCategory, index: number) => {
    return (
      <Button
        fullWidth
        label={item.name}
        style={{margin: 5, backgroundColor: randomColors[index]}}
        key={index}
        onPress={() => props.navigation.navigate('Categories', {id: item.id})}
      />
    )
  }

  let i = 0
  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <FlatList 
          data={categories} 
          renderItem={({ item, index }) => renderItem(item, index)} 
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}


export default Categories
