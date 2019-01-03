import React from 'react';
import { Image } from 'react-native';
import styles from './ImagePlaceholder.styles';
import placeholder from '../../../assets/placeholder.jpg';

const ImagePlaceholder = ({ style }) => (
  <Image source={placeholder} style={[styles.image, style]} />
);

export default ImagePlaceholder;
