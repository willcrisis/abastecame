const en = {
  screenTitles: {
    refuellings: 'Refuellings',
    newRefuelling: 'New Refuelling',
    refuellingDetails: 'Details',
    selectVehicle: 'Vehicles',
    newVehicle: 'New Vehicle',
  },
  login: {
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    connectWith: 'or connect with',
    dontHaveAnAccount: 'Don\'t have an account? Register',
    genericError: 'Unable to perform your login. Try again in a few minutes. If the error persist, please email us.',
  },
  register: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmation: 'Password Confirmation',
    registerWith: 'or register with',
    alreadyHaveAnAccount: 'Already have an account?',
    passwordsMustMatch: 'Password and Password Confirmation must match.'
  },
  social: {
    google: 'Google',
    facebook: 'Facebook',
  },
  vehicle: {
    name: 'Name',
    model: 'Model',
    manufacturer: 'Manufacturer',
    fuels: 'Fuels',
    image: 'Image',
    noVehicles: 'You still don\'t have any vehicle. Use the button below to add your first one.',
  },
  refuelling: {
    date: 'Date',
    fuel: 'Fuel',
    fullTank: 'Full Tank',
    odometer: 'Odometer',
    price: 'Fuel Price',
    liters: 'Liters',
    total: 'Total Value',
    notes: 'Notes',
    performance: 'Performance',
    distance: 'Distance',
    averageDailyDistance: 'Average Daily Distance',
    costPerKm: 'Cost per Km',
    noRefuellings: 'You still didn\'t refuel. Use the button below to add your first refuelling.',
  },
  dateInput: {
    title: 'Pick a date'
  },
  picker: {
    initialValue: 'Select one...',
  },
  actions: {
    save: 'Save',
    confirm: 'Confirm',
    cancel: 'Cancel',
    login: 'Login',
    register: 'Sign up',
  },
  validation: {
    required: 'Please fill the following fields: %s',
  },
  firebase: {
    'auth/user-not-found': 'Wrong email or password',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'Your account was disabled. Please contact us via email.',
    'auth/account-exists-with-different-credential': 'You already have an account with this email address. Try logging in with one of these methods: %s',
    'auth/wrong-password': 'Wrong email or password',
    'auth/email-already-in-use': 'This email is already in use for another account.',
    'auth/weak-password': 'You provided a weak password. Try add some upper case, special characters or numbers to it.',
  },
}

export default en;
