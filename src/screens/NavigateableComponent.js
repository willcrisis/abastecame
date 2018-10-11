import { Component } from 'react';

export default class NavigateableComponent extends Component {
  goTo = (route, params) => this.props.navigation.navigate(route, params);
  goBack = () => this.props.navigation.goBack();
  getParam = paramName => this.props.navigation.getParam(paramName);
}
