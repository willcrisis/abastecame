import React from 'react';
import { Image } from 'react-native';
import styles from './ImagePlaceholder.styles';
import placeholder from '../../../../../../assets/placeholder.jpg';

const ImagePlaceholder = () => (
  <Image source={placeholder} style={styles.image} />
);

export default ImagePlaceholder;
