import React from 'react'
import { Footer, FooterTab, Button, Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native';

const BottomToolbar = () => {
  const navigation = useNavigation();
  return (
    <Footer>
      <FooterTab style={{backgroundColor: 'white'}}>
        <Button onPress={() => navigation.navigate('Home')}>
          <Icon name="home" style={{color: 'blue'}} />
        </Button>
        <Button disabled transparent style={{flex: 2}}></Button>
        <Button onPress={() => navigation.navigate('Basket')}>
          <Icon name="basket" style={{color: 'blue'}}/>
        </Button>
      </FooterTab>
    </Footer>  
  )
}

export default BottomToolbar