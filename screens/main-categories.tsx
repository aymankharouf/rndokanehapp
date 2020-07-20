import React from 'react'
import { Button } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'
import { randomColors } from '../data/config'
import labels from '../data/labels'
import { FlatList, Text } from 'react-native'
import { iCategory } from '../data/interfaces'

const MainCategories = () => {
  const { state } = React.useContext(StoreContext)
  const [categories, setCategories] = React.useState<iCategory[]>([])
  React.useEffect(() => {
    setCategories(() => {
      const categories = state.categories.filter(c => c.parentId === '0')
      return categories.sort((c1, c2) => c1.ordering - c2.ordering)  
    })
  }, [state.categories])
  const renderItem = (item: iCategory, index: number) => {
    return (
      <Button
          fullWidth
          label={item.name}
          style={{margin: 5, backgroundColor: randomColors[index]}}
          key={index}
        />
    )
  }
  let i = 0
  return (
    <React.Fragment>
      {categories.length === 0 ?
        <Text>{labels.noData}</Text>
      : <FlatList 
          data={categories} 
          renderItem={({ item, index }) => renderItem(item, index)} 
          keyExtractor={item => item.id}
        />
      }
    </React.Fragment>
  )

}
export default MainCategories

