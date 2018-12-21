import { Component } from 'react';
import NavigationService from '../../services/Navigation'

export default class NavigateableComponent extends Component {
  goTo = (route, params) => NavigationService.navigate(route, params);
  goBack = () => NavigationService.goBack();
  getParam = paramName => this.props.navigation.getParam(paramName);
}
