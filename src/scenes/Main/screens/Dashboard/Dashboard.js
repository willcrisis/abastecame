import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Fab,
  Icon,
} from 'native-base';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import styles from './Dashboard.styles';

export const ROUTE_NAME = 'Dashboard';

class Dashboard extends Component {
  static navigationOptions = ({ screenProps: { vehicle: { name} }}) => ({
    title: name
  });

  render() {
    const { goToAddRefuelling, vehicle } = this.props.screenProps;

    return (
      <Container>
        <View style={styles.container}>
          {vehicle.imageUrl
            ? <Image source={{ uri: vehicle.imageUrl }} style={styles.image} />
            : <ImagePlaceholder />
          }
        </View>
        <Content padder>
          <Text>Dashboard</Text>
        </Content>
        <Fab onPress={goToAddRefuelling}>
          <Icon name="add" />
        </Fab>
      </Container>
    )
  }
}

export default Dashboard;
