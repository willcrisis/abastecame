import firebase from 'react-native-firebase';
import I18n from '../i18n';

const firestore = firebase.firestore();
const auth = firebase.auth();

let fuelList;
let unsubscribeFuels;
let currentUserInstance;

const init = () => {
  auth.languageCode = I18n.getCurrentLanguage();
  currentUserInstance = auth.currentUser;

  const fuelsRef = firestore.collection('fuels');

  unsubscribeFuels = fuelsRef.onSnapshot(snapshot => {
    fuelList = [];

    snapshot.forEach(fuelRef => {
      fuelList.push({
        translations: fuelRef.data(),
        key: fuelRef.id,
      });
    });
  }, err => console.warn(err));
}

const destroy = () => {
  unsubscribeFuels();
}

const fuels = () => fuelList;
const currentUser = () => currentUserInstance;

export default {
  firestore,
  auth,
  init,
  destroy,
  fuels,
  currentUser,
}
