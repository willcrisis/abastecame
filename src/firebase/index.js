import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

let fuelList;
let unsubscribeFuels;

const init = () => {
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

export default {
  firestore,
  init,
  destroy,
  fuels,
}
