import React from 'react';
import {
  Header,
  Left,
  Body,
  Title,
  Button,
  Icon,
  Right,
} from 'native-base';

const HeaderComponent = ({ title = 'Abasteça Me' }) => (
  <Header>
    <Left>
      <Button transparent>
        <Icon name='menu'/>
      </Button>
    </Left>
    <Body>
    <Title>{title}</Title>
    </Body>
    <Right/>
  </Header>
);

export default HeaderComponent;
