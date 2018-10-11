import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Text,
  Body,
  Icon,
  Right,
  Card,
  CardItem,
} from 'native-base';
import firebase from 'react-native-firebase';

export default class VehicleCard extends Component {

  constructor(props) {
    super(props);

    this.storageRef = firebase.storage();
    this.state = {
      imageUrl: '',
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  loadImage = async () => {
    const {vehicle: { id }} = this.props;
    if (!id) return;
    const image = this.storageRef.ref(`${id}.jpg`);
    try {
      const imageUrl = await image.getDownloadURL();
      this.setState({
        imageUrl
      });
    } catch(err) {
      if (err.code !== 'storage/object-not-found') console.warn(err);
    }
  };

  render() {
    const {
      icon,
      vehicle: {
        name,
        manufacturer,
        model,
      },
      onPress
    } = this.props;

    const {
      imageUrl = ''
    } = this.state;

    const imageToDisplay = imageUrl.length
      ? { uri: imageUrl }
      : require('../../assets/placeholder.png');

    return (
      <Card>
        <CardItem button={!!onPress} onPress={onPress} cardBody style={styles.cardImage}>
          {icon
            ? <Icon type="Entypo" name={icon || 'image'} style={styles.icon}/>
            : <Image source={imageToDisplay} style={styles.image}/>
          }
        </CardItem>
        <CardItem button={!!onPress} onPress={onPress}>
          <Body>
          <Text>
            {name}
          </Text>
          <Text note>
            {manufacturer} {model}
          </Text>
          </Body>
          <Right/>
        </CardItem>
      </Card>
    )
  }
};

const styles = StyleSheet.create({
  cardImage: {
    height: 200,
    display: 'flex',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 200,
    width: null,
    flex: 1
  },
  icon: {
    width: null,
    fontSize: 60
  }
});
