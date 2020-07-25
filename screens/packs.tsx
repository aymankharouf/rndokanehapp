import React from 'react'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import { sortByList, randomColors } from '../data/config'
import { getChildren, productOfText } from '../data/actions'
import { iPack } from '../data/interfaces'
import { TouchableWithoutFeedback, Keyboard, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActionSheet, AnimatableManager, ListItem, Text, ThemeManager, Colors, BorderRadiuses } from 'react-native-ui-lib'
import * as Animatable from 'react-native-animatable';

const Packs = (props: any) => {
  const { state } = React.useContext(StoreContext)
  const [packs, setPacks] = React.useState<iPack[]>([])
  const [category] = React.useState(() => state.categories.find(category => category.id === props.id))
  const [sortBy, setSortBy] = React.useState('v')
  const sortList = React.useRef<ActionSheet>(null)
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
  const renderItem = (item: iPack) => {
    return (
      <Animatable.View key={item.id} {...AnimatableManager.presets.fadeIn}>
        <ListItem
          height={80}
          containerStyle={styles.border}
          onPress={() => props.navigation.navigate('ProductPacks', {id: item.id})}
        >
          <ListItem.Part left>
            <Animatable.Image
              source={{uri: item.imageUrl}}
              style={styles.image}
            />
          </ListItem.Part>
          <ListItem.Part containerStyle={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14}}>{item.name}</Text>
            {item.productAlias ? <Text style={{fontSize: 12, color: 'red'}}>{item.productAlias}</Text> : null}
            <Text style={{fontSize: 12, color: 'green'}}>{productOfText(item.trademark, item.country)}</Text>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    )
  }
  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <FlatList 
          data={packs} 
          renderItem={({ item }) => renderItem(item)} 
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})
export default Packs