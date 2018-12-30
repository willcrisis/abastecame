import React from 'react';
import { FlatList, View } from 'react-native';
import {
  Container,
  ListItem,
  Fab,
  Icon,
  Text,
} from 'native-base';
import I18n from '../../../../i18n';
import RefuellingLine from './components/RefuellingLine';
import styles from './RefuellingList.styles';

export const ROUTE_NAME = 'RefuellingList';

const RefuellingList = ({ screenProps: {
  refuellings,
  reload,
  isReloading,
  goToAddRefuelling,
  goToDetails,
} }) => (
    <Container>
      {refuellings.length ? (
        <FlatList
          data={refuellings}
          renderItem={({ item }) => (
            <ListItem key={item.key} button>
              <RefuellingLine refuelling={item} onPress={goToDetails} />
            </ListItem>
          )}
          refreshing={isReloading}
          onRefresh={reload}
        />
      ) : (
        <View style={styles.container}>
          <Icon type="Entypo" name="emoji-sad" />
          <Text style={styles.noRefuellingsText}>{I18n.t('refuelling.noRefuellings')}</Text>
        </View>
      )}
      <Fab onPress={goToAddRefuelling}>
        <Icon name="add" />
      </Fab>
    </Container>
  );

RefuellingList.navigationOptions = {
  title: I18n.t('screenTitles.refuellings'),
};

export default RefuellingList;
