const pt = {
  screenTitles: {
    refuellings: 'Abastecimentos',
    newRefuelling: 'Novo Abastecimento',
    refuellingDetails: 'Detalhes',
    selectVehicle: 'Veículos',
    newVehicle: 'Novo Veículo',
  },
  login: {
    email: 'Email',
    password: 'Senha',
    forgotPassword: 'Esqueceu a senha?',
    connectWith: 'ou entre com',
    dontHaveAnAccount: 'Não tem uma conta?',
    genericError: 'Houve um erro ao efetuar seu login. Tente novamente em alguns minutos. Se o erro persistir, entre em contato.',
  },
  register: {
    name: 'Nome',
    email: 'Email',
    password: 'Senha',
    confirmation: 'Confirme a senha',
    registerWith: 'ou cadastre-se com',
    alreadyHaveAnAccount: 'Já tem uma conta?',
    passwordsMustMatch: 'A senha e a confirmação de senha devem ser iguais.'
  },
  social: {
    google: 'Google',
    facebook: 'Facebook',
  },
  vehicle: {
    name: 'Nome',
    model: 'Modelo',
    manufacturer: 'Marca',
    fuels: 'Combustíveis',
    image: 'Imagem',
    noVehicles: 'Você ainda não possui veículos cadastrados. Use o botão abaixo para cadastrar seu primeiro veículo.',
  },
  refuelling: {
    date: 'Data',
    fuel: 'Combustível',
    fullTank: 'Tanque Cheio',
    odometer: 'Odômetro',
    price: 'Preço',
    liters: 'Litros',
    total: 'Valor Total',
    notes: 'Notas',
    performance: 'Rendimento',
    distance: 'Distância',
    averageDailyDistance: 'Média Diária de Km',
    costPerKm: 'Custo por Km',
    noRefuellings: 'Você ainda não abasteceu seu veículo. Use o botão abaixo para cadastrar seu primeiro abastecimento.',
  },
  dateInput: {
    title: 'Selecione uma data'
  },
  picker: {
    initialValue: 'Selecione...',
  },
  actions: {
    save: 'Salvar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    login: 'Login',
    register: 'Cadastre-se'
  },
  validation: {
    required: 'Preencha os seguintes campos: %s',
  },
  firebase: {
    'auth/user-not-found': 'Verifique o email e senha informados.',
    'auth/invalid-email': 'Email inválido.',
    'auth/user-disabled': 'Sua conta foi desabilitada. Por favor ente em contato por email.',
    'auth/account-exists-with-different-credential': 'Você já possui uma conta com este email. Tente logar com um desses métodos: %s',
    'auth/wrong-password': 'Verifique o email e senha informados.',
    'auth/email-already-in-use': 'Este email já está sendo usado por outra conta.',
    'auth/weak-password': 'Você informou uma senha fraca. Tente adicionar algumas letras maiúsculas, caracteres especiais ou números a ela.',
  }
}

export default pt;
