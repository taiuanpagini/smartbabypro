import React, { PureComponent, Fragment } from 'react'
import { View, Alert, Text, Image, AsyncStorage, ScrollView, TouchableOpacity, NetInfo } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Loading from '../components/common/Loading'
import Moment from 'moment'
import axios from 'react-native-axios'
import Padrao from '../services/padroes'
import { Table, Row } from 'react-native-table-component'
import CheckBox from 'react-native-check-box'
import Toast, { DURATION } from 'react-native-easy-toast'
import Padroes from '../services/padroes'
// const FastSpeedtest = require("fast-speedtest-api")

export default class Sincronizacao extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            todosItens: [],
            fadeValue: 0,
            dataAcesso: '',
            totalLancamentos: 0,
            lancamentosPendentes: 0,
            lancamentosSincronizados: 0,
            medicamento: false,
            chat: false,
            sincmanual: false,
            ultimaSinc: '',
            tableHead: ['Apontamento', 'Berçário'],
        }
    }

    sair() {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('macTabl')
        AsyncStorage.removeItem('itensIniciais')
        AsyncStorage.removeItem('turmasAlunos')
        AsyncStorage.removeItem('todosItens')
        AsyncStorage.removeItem('lancamentos')
        AsyncStorage.removeItem('ultimaSincronizacao')
        AsyncStorage.removeItem('lancamentosSincronizados')
        AsyncStorage.removeItem('ultimaSincronizacao')
        AsyncStorage.removeItem('lancamentosSincronizados')
        AsyncStorage.removeItem('todosMateriais')
        AsyncStorage.removeItem('medicamentos')
        TOKEN_KEY = "@RocketSeat:token"
        AsyncStorage.removeItem(TOKEN_KEY)
        Actions.Login()
    }

    suporte() {
        Alert.alert(
            'Suporte',
            'Enviar mensagem de erro para o suporte?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed')
                },
                { text: 'Enviar', onPress: () => console.log('OK Pressed') },
            ]
        )
    }

    sincronizar() {
        this.setState({ fadeValue: 1 })
        AsyncStorage.getItem('token')
            .then((res_token) => {
                //PEGA O MAC DO PC SALVO NA REQUISIÇÃO DE LOGIN
                AsyncStorage.getItem('macTabl')
                    .then((res_mac) => {
                        AsyncStorage.getItem('lancamentos')
                            .then((lancamentos) => {
                                // console.log(lancamentos)
                                var sinc = {};
                                var gl90tabl = {};
                                const convertApontamentos = JSON.parse(lancamentos)
                                // let autenticacao = JSON.stringify({ tokeTabl: res_token, macTabl: res_mac })
                                gl90tabl.tokeTabl = res_token
                                gl90tabl.macTabl = res_mac
                                sinc.gl90Tabl = gl90tabl
                                sinc.arrayEs00Apon = convertApontamentos[0].arrayEs00Apon
                                sinc.arrayPendenciaMedicamento = convertApontamentos[0].arrayPendenciaMedicamento
                                console.log(JSON.stringify(sinc))
                                axios.post(`${apiURL}/app/processamentodados/processa`, sinc)
                                    .then((response) => {
                                        console.log(response)
                                        AsyncStorage.setItem('lancamentosSincronizados', JSON.stringify(response.data.arrayEs00Apon))
                                        AsyncStorage.setItem('ultimaSincronizacao', Moment().format('DD/MM/YYYY') + ' às ' + Moment().format('H:mm:ss'))
                                        Actions.reset('Sincronizacao')
                                        if (this._willMount === true) {
                                            this.setState({ fadeValue: 0 })
                                        }
                                    }).catch((error) => {
                                        console.log(error)
                                        if (this._willMount === true) {
                                            this.setState({ fadeValue: 0 })
                                        }
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
    }

    componentWillUnmount() {
        Actions.refresh('root')
        this._willMount = false
    }

    componentWillMount() {
        // let speedtest = new FastSpeedtest({
        //     token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
        //     verbose: false, // default: false
        //     timeout: 10000, // default: 5000
        //     https: true, // default: true
        //     urlCount: 5, // default: 5
        //     bufferSize: 8, // default: 8
        //     unit: FastSpeedtest.UNITS.Mbps // default: Bps
        // });
        // speedtest.getSpeed().then(s => {
        //     console.log(`Speed: ${s} Mbps`);
        // }).catch(e => {
        //     console.error(e.message);
        // });

        // alert("chat: " + this.state.chat)
        // alert("medicamentos: " + this.state.medicamento)
        // alert("sinc manual: " + this.state.sincmanual)

        AsyncStorage.getItem('lancamentos')
            .then((lancamentos) => {
                AsyncStorage.getItem('lancamentosSincronizados')
                    .then((lancamentosSincronizados) => {
                        //DATA DA ULTIMA SINCRONIZAÇÃO
                        AsyncStorage.getItem('ultimaSincronizacao')
                            .then((ultimaSinc) => {
                                //VERIFICA SE O USUÁRIO ESTA LOGADO
                                AsyncStorage.getItem('usuarioLogado')
                                    .then((usuarioLogado) => {
                                        this.setState({ usuarioLogado: usuarioLogado })
                                        this.setState({ ultimaSinc: ultimaSinc })
                                        const arrayOriginal = JSON.parse(lancamentos)
                                        // console.log(JSON.parse(lancamentosSincronizados))
                                        const totalLancamentos = arrayOriginal[0].arrayEs00Apon.length
                                        const varLancamentosSincronizados = lancamentosSincronizados == null ? 0 : JSON.parse(lancamentosSincronizados).length
                                        const lancamentosPendentes = totalLancamentos - varLancamentosSincronizados

                                        if (lancamentos == null) {
                                            this.setState({ totalLancamentos: 0 })
                                            this.setState({ lancamentosPendentes: 0 })
                                            this.setState({ lancamentosSincronizados: 0 })
                                        } else {
                                            this.setState({ totalLancamentos: totalLancamentos })
                                            this.setState({ lancamentosPendentes: lancamentosPendentes })
                                            this.setState({ lancamentosSincronizados: varLancamentosSincronizados })
                                        }

                                        AsyncStorage.getItem('dataAcesso')
                                            .then((dataAcesso) => {
                                                if (this._willMount === true) {
                                                    dataAcesso = dataAcesso
                                                }
                                                const dataAtual = Moment().format('DD/MM/YY')
                                                if (dataAtual != dataAcesso) {
                                                    AsyncStorage.removeItem('lancamentos')
                                                    AsyncStorage.removeItem('ultimaSincronizacao')
                                                    AsyncStorage.removeItem('lancamentosSincronizados')
                                                    AsyncStorage.setItem('dataAcesso', dataAtual)
                                                }
                                            })
                                    })
                            })
                    }).catch((error) => {
                        console.log(error)
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        setInterval(() => {
            //INFORMA SE O USUÁRIO ESTA CONECTADO A INTERNET
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected === true) {
                    this.setState({ stsConec: true })
                } else {
                    this.setState({ stsConec: false })
                }
            })
        }, 5000)
        return (
            <Fragment>
                <Loading fadeValue={this.state.fadeValue} />
                <Header />
                <View style={styles.breadSinc}>
                    <View style={styles.lancamentos}>
                        <Text>Total:</Text>
                        <Text style={styles.textYellow}>{this.state.totalLancamentos}</Text>
                        <Text>Env:</Text>
                        <Text style={styles.textGreen}>{this.state.lancamentosSincronizados}</Text>
                        <Text>Pend:</Text>
                        <Text style={styles.textPink}>{this.state.lancamentosPendentes}</Text>
                    </View>
                    <View style={styles.botoesSinc}>
                        <TouchableOpacity onPress={() => this.state.stsConec === true ? this.sincronizar() : this.refs.toast.show('Sem acesso a internet, verifique!', 3000, () => { })} style={styles.viewBtnSincronizar}><Text style={styles.btnSincronizar}>Sincronizar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.suporte()}><Image style={styles.iconesSinc} source={require('../../assets/img/icones/icone_atencao.png')}></Image></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sair()}><Image style={styles.iconesSinc} source={require('../../assets/img/icones/icone_sairsobre.png')}></Image></TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={[styles.rowContainer, styles.rowContainerSinc]}>
                        <View style={styles.containerDadosSinc}>
                            <Text style={styles.textApontBlue}>TODOS OS APONTAMENTOS DO MEU TABLET</Text>
                            <View style={styles.tableApont}>
                                <Table borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }}>
                                    <Row data={this.state.tableHead} textStyle={[styles.textHeadBlack]} />
                                    <ScrollView style={styles.scrollTableApontamentos}>
                                        <Row data={['Alimentação', `${alimentacao}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Artes Marciais', `${artesMarciais}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Atividades', `${numAtividades}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Avaliação', `${avaliacao}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Banho', `${banho}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Entrada/Saída', `${entradaSaida}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Esportes', `${esportes}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Frutas', `${frutas}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Horário', `${horario}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Línguas', `${linguas}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Mamada', `${mamada}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Material', `${material}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Matérias', `${materias}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Síntomas', `${sintomas}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Soninho', `${soninho}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Tarefas', `${tarefas}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['Troca', `${troca}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                        <Row data={['To Chegando', `${toChegando}`]} textStyle={styles.textBodyBlack} borderStyle={{ borderWidth: 0, borderColor: '#FFFFFF' }} />
                                    </ScrollView>
                                </Table>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.parametrosSinc}>
                    <View style={styles.containerParams}>
                        <Text style={styles.textParametro}>PARÂMETROS</Text>
                        <CheckBox
                            onClick={() => { this.setState({ chat: !this.state.chat }) }}
                            isChecked={this.state.chat}
                            rightText={"Habilitar alerta sonoro de chat"}
                            rightTextStyle={{ color: '#333333', fontSize: 9, fontWeight: 'bold', marginLeft: 0 }}
                            uncheckedCheckBoxColor={"#666666"}
                            checkedCheckBoxColor={"#15b2f3"}
                        />
                        <CheckBox
                            onClick={() => { this.setState({ medicamento: !this.state.medicamento }) }}
                            isChecked={this.state.medicamento}
                            rightText={"Habilitar alerta sonoro de medicamentos"}
                            rightTextStyle={{ color: '#333333', fontSize: 9, fontWeight: 'bold', marginLeft: 0 }}
                            uncheckedCheckBoxColor={"#666666"}
                            checkedCheckBoxColor={"#15b2f3"}
                        />
                        <CheckBox
                            onClick={() => { this.setState({ sincmanual: !this.state.sincmanual }) }}
                            isChecked={this.state.sincmanual}
                            rightText={"Sincronização manual"}
                            rightTextStyle={{ color: '#333333', fontSize: 9, fontWeight: 'bold', marginLeft: 0 }}
                            uncheckedCheckBoxColor={"#666666"}
                            checkedCheckBoxColor={"#15b2f3"}
                        />
                    </View>
                    <View style={styles.containerParams}>
                        <Text style={styles.textParametro}>SOBRE O APLICATIVO</Text>
                        <Text style={styles.textInfo}>Usuário logado: {this.state.usuarioLogado}</Text>
                        <Text style={styles.textInfo}>Informações do dispositivo: {dimensoes}</Text>
                        <Text style={styles.textInfo}>Versão: {versao}</Text>
                    </View>
                    <View style={[styles.containerParams, styles.containerParamsFull]}>
                        <Text style={styles.textParametro}>MINHA CONEXÃO</Text>
                        <Text style={styles.textInfo}>Status da conexão: {this.state.stsConec === true ? 'Conectado (Online)' : 'Não Conectado (Offline)'}</Text>
                        <Text style={styles.textInfo}>Última Sincronização: {!this.state.ultimaSinc ? 'Nenhuma sincronização realizada hoje' : this.state.ultimaSinc}</Text>
                    </View>
                </View>
                <Toast
                    ref='toast'
                    style={{ borderRadius: 20, paddingRight: 20, paddingLeft: 20, backgroundColor: '#000000' }}
                    position='bottom'
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.6}
                    textStyle={{ color: '#FFFFFF', fontSize: 11 }}
                />
            </Fragment >
        )
    }
}

export { Sincronizacao }