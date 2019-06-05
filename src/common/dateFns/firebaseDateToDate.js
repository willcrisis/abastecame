const firebaseDateToDate = (firebaseDate) =>
  new Date(firebaseDate.seconds * 1000);
export default firebaseDateToDate;
