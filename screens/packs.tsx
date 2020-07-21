import React from 'react'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import { sortByList, randomColors } from '../data/config'
import { getChildren, productOfText } from '../data/actions'
import { iPack } from '../data/interfaces'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import { Button } from 'react-native-ui-lib'

const Packs = (props: any) => {
  const { state } = React.useContext(StoreContext)
  const [packs, setPacks] = React.useState<iPack[]>([])
  const [category] = React.useState(() => state.categories.find(category => category.id === props.id))
  const [sortBy, setSortBy] = React.useState('v')
  const sortList = React.useRef<Actions>(null)
  React.useEffect(() => {
    setPacks(() => {
      const children = props.type === 'a' ? getChildren(props.id, state.categories) : [props.id]
      let packs = state.packs.filter(p => !props.id || (props.type === 'f' && state.userInfo?.favorites?.includes(p.productId)) || children.includes(p.categoryId))
      return packs.sort((p1, p2) => p1.weightedPrice - p2.weightedPrice)
    })
  }, [state.packs, state.userInfo, props.id, props.type, state.categories])
  const handleSorting = (sortByValue: string) => {
    setSortBy(sortByValue)
    switch(sortByValue){
      case 'p':
        setPacks([...packs].sort((p1, p2) => p1.price - p2.price))
        break
      case 's':
        setPacks([...packs].sort((p1, p2) => p2.sales - p1.sales))
        break
      case 'r':
        setPacks([...packs].sort((p1, p2) => p2.rating - p1.rating))
        break
      case 'o':
        setPacks([...packs].sort((p1, p2) => (p2.isOffer || p2.offerEnd ? 1 : 0) - (p1.isOffer || p1.offerEnd ? 1 : 0)))
        break
      case 'v':
        setPacks([...packs].sort((p1, p2) => p1.weightedPrice - p2.weightedPrice))
        break
      default:
    }
  }
  const renderItem = (item: iPack, index: number) => {
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
  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <FlatList 
          data={packs} 
          renderItem={({ item, index }) => renderItem(item, index)} 
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Packs