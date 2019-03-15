import React, { PureComponent, Fragment } from 'react'
import { View, Text, TextInput, Alert, Image, ImageBackground, AsyncStorage, Animated, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from '../components/common'
import axios from 'react-native-axios'
import styles from '../style/Login'
import { Actions } from 'react-native-router-flux'
import Loading from '../components/common/Loading'
import Moment from 'moment'
import DeviceInfo from 'react-native-device-info'
import Padrao from '../services/padroes'

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // usuario: '',
      // senha: '',
      // macAdress: '',
      usuario: 'dev@demonstracao',
      senha: 'smartdev',
      macAdress: 'ds513a5s4',
      error: '',
      tokeTabl: '',
      macTabl: '',
      fadeValue: 0,
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  fadeIn() {
    Animated.timing(this.state.fadeValue, {
      toValue: 0,
      duration: 5000,
    }).start()
  }


  loginUser = async () => {

    this.setState({ fadeValue: 1 })

    const { usuario, senha, macAdress } = this.state;

    this.setState({ error: '', loading: true });

    axios.post(`${apiURL}/loginapp114`, {
      usuario: usuario,
      senha: senha,
      macAdress: macAdress
    })
      .then((response) => {
        AsyncStorage.setItem('token', response.data.tokeTabl)
        AsyncStorage.setItem('macTabl', response.data.macTabl)
        AsyncStorage.setItem('usuarioLogado', usuario)

        //REQUISIÇÕES PARA GRAVAR TODOS OS DADOS NO STORAGE
        //PEGA O TOKEN DO USUÁRIO SALVO NA REQUISIÇÃO DE LOGIN
        AsyncStorage.getItem('token')
          .then((res_token) => {
            //PEGA O MAC DO PC SALVO NA REQUISIÇÃO DE LOGIN
            AsyncStorage.getItem('macTabl')
              .then((res_mac) => {

                //REQUISIÇÃO ITENS INICIAIS DA TELA HOME
                axios.post(`${apiURL}/dadostablet/listitensacesso114`, {
                  tokeTabl: res_token,
                  macTabl: res_mac
                }).then((itens_inicio) => {
                  //REQUISIÇÃO TURMAS E ALUNOS
                  axios.post(`${apiURL}/turmaaluno/list114`, {
                    tokeTabl: res_token,
                    macTabl: res_mac
                  }).then((turmas_alunos) => {

                    let convertArray = turmas_alunos.data
                    convertArray.map((aluno) => {
                        let addSts = aluno
                        addSts.status = false
                    })

                    //REQUISIÇÃO PARA SALVAR TODOS ITENS
                    axios.post(`${apiURL}/dadostablet/listitens114`, {
                      tokeTabl: res_token,
                      macTabl: res_mac
                    }).then((todos_itens) => {

                      let convertArrayComp = todos_itens.data
                      convertArrayComp.map((todos) => {
                          let addSts = todos
                          addSts.status = false
                      })
                      axios.post(`${apiURL}/app/responsaveis/list`, {
                        tokeTabl: res_token,
                        macTabl: res_mac
                      }).then((todos_responsaveis) => {
                        AsyncStorage.setItem('itensIniciais', JSON.stringify(itens_inicio.data))
                        AsyncStorage.setItem('turmasAlunos', JSON.stringify(turmas_alunos.data))
                        AsyncStorage.setItem('todosItens', JSON.stringify(todos_itens.data))
                        AsyncStorage.setItem('responsaveis', JSON.stringify(todos_responsaveis.data))
                        AsyncStorage.setItem('dataAcesso', Moment().format('DD/MM/YY'))

                        TOKEN_KEY = "@RocketSeat:token";
                        AsyncStorage.setItem(TOKEN_KEY, "true");

                        Actions.Home()
                        console.log(todos_itens.data)

                      }).catch((error) => {
                        console.log(error)
                      })
                    })
                  }).catch((error) => {
                    console.log(error)
                  })
                }).catch((error) => {
                  console.log(error)
                })

              }).catch((error) => {
                console.log(error)
              })
          }).catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error);
        console.log("usuario: " + usuario + " | ", "Senha: " + senha + " | ", "macAdress: " + macAdress);
        this.onLoginFail();
      });
  }

  onLoginFail() {
    Alert.alert(
      'Usuário ou senha inválidos!'
    )
    this.setState({
      loading: false,
      fadeValue: 0
    });
  }

  render() {
    const { usuario, senha, macAdress, error, loading } = this.state;

    return (
      <Fragment>
        <Loading fadeValue={this.state.fadeValue} />
        <ImageBackground source={require('../../assets/img/back-login.jpg')} style={{ width: '100%', height: '100%' }}>
          <KeyboardAvoidingView style={[styles.form, styles.container]} behavior="padding" enabled>
            <View>
              <Image style={styles.imgResponsive} source={require("../../assets/img/logo.png")} />
            </View>
            <View>
              <Text style={styles.fontTitulo}>Faça seu login!</Text>
            </View>
            <View style={styles.section}>
              <TextInput
                placeholder="Seu usuário"
                label="Email"
                value={usuario}
                onChangeText={usuario => this.setState({ usuario })} keyboardType="email-address" style={styles.input}
              />
            </View>

            <View style={styles.section}>
              <TextInput
                secureTextEntry
                placeholder="Sua senha"
                label="senha"
                value={senha}
                onChangeText={senha => this.setState({ senha })} style={styles.input}
              />
            </View>

            <View style={[styles.section, styles.hidden]}>
              <TextInput
                placeholder="token"
                label="Token"
                value={macAdress}
                onChangeText={
                  this.setState(
                    {
                      // macAdress: Platform.OS == 'ios' ? DeviceInfo.getUniqueID() : DeviceInfo.getMACAddress
                      macAdress: 'ds513a5s4'
                    }
                  )
                }
              />
            </View>

            <Button onPress={this.loginUser}>Acessar</Button>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Fragment>
    )
  }
}

export { Login };