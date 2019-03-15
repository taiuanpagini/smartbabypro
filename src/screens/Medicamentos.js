import React, { PureComponent, Fragment } from 'react'
import {
    View,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Loading from '../components/common/Loading'
import Toast, { DURATION } from 'react-native-easy-toast'
import Padrao from '../services/padroes'
import axios from 'react-native-axios'
import Padroes from '../services/padroes'

export default class Medicamentos extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            medicamentos: [],
            alunos: [],
            fadeValue: 0,
            dataAcesso: '',
            item: [],
            visibleModalMedical: null
        }
    }

    componentWillUnmount() {
        Actions.refresh('root')
        this._willMount = false
    }

    componentWillMount() {
        this._willMount = true
        var medicamentos = this.state.medicamentos

        AsyncStorage.getItem('medicamentos')
            .then((medicamentos) => {
                AsyncStorage.getItem('turmasAlunos')
                    .then((todosAlunos) => {
                        if (this._willMount === true) {
                            // const result = [];
                            // const map = new Map();
                            // for (const item of JSON.parse(medicamentos)) {
                            //     if (!map.has(item.co00Apme)) {
                            //         map.set(item.co00Apme, true);    // set any value to Map
                            //         result.push({
                            //             gl90Tabl: item.gl90Tabl,
                            //             linkRece: item.linkRece,
                            //             co01Apme: item.co01Apme,
                            //             co90Alun: item.co90Alun,
                            //             co00Apme: item.co00Apme,
                            //             horaApme: item.horaApme,
                            //             nomeApme: item.nomeApme,
                            //             dosaApme: item.dosaApme,
                            //             viadApme: item.viadApme,
                            //             obsApme: item.obsApme,
                            //             situApme: item.situApme,
                            //             dhapApme: item.dhapApme
                            //         });
                            //     }
                            // }



                            // console.log(result)
                            this.setState({ alunos: JSON.parse(todosAlunos) })
                            var arr = JSON.parse(medicamentos)

                            var pendentes = arr.filter(function (medicamento) {
                                return medicamento.situApme == STATUS_APLICACAO_MEDICAMENTO_PENDENTE
                            })

                            var aplicados = arr.filter(function (medicamento) {
                                return medicamento.situApme == STATUS_APLICACAO_MEDICAMENTO_APLICADO
                            })

                            var result = []
                            arr.map(function (item) {
                                var medPend = 0
                                var medApli = 0
                                pendentes.map(function (pendentes) {
                                    if (item.co00Apme == pendentes.co00Apme) {
                                        medPend += 1
                                    }
                                })
                                aplicados.map(function (aplicados) {
                                    if (item.co00Apme == aplicados.co00Apme) {
                                        medApli += 1
                                    }
                                })
                                result.push({
                                    co00Apme: item.co00Apme,
                                    co01Apme: item.co01Apme,
                                    co90Alun: item.co90Alun,
                                    dataApme: item.dataApme,
                                    dhapApme: item.dhapApme,
                                    dosaApme: item.dosaApme,
                                    horaApme: item.horaApme,
                                    linkRece: item.linkRece,
                                    nomeApme: item.nomeApme,
                                    obsApme: item.obsApme,
                                    situApme: item.situApme,
                                    viadApme: item.viadApme,
                                    medApli: medApli,
                                    medPend: medPend,
                                    medTotal: medApli + medPend
                                });
                            })

                            console.log('result')
                            console.log(JSON.parse(medicamentos))
                            this.setState({ medicamentos: result })
                        }
                    })
            })


        renderButton = (text, onPress) => (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.textHead}>{text}</Text>
                </View>
            </TouchableOpacity>
        )

        headerModal = (item) => {
            var alunos = this.state.alunos
            return alunos.map((aluno) => {
                if (item.co90Alun == aluno.gl90Alun.co90Alun) {
                    return (
                        <View key={item.co90Alun}>
                            <Text style={styleLocal.nomeAluno}>{aluno.gl90Alun.nomeAlun}</Text>
                            <Text style={styleLocal.tituloModal}>{item.nomeApme}</Text>
                            <Text style={styleLocal.descricaoModal}>{item.dosaApme}</Text>
                        </View>
                    )
                }
            })
        }

        modalMedicamento = (item) => {
            var horario = Moment().format('H:MM')
            return this.state.medicamentos.map((medicamento) => {
                if (item.co00Apme == medicamento.co00Apme) {
                    return (
                        <View style={styles.viewLancamentos} key={medicamento.co01Apme}>
                            <View style={styles.containerLancaMed}>
                                <Image style={styles.iconStsMed} source={item.horaApme <= horario ? require('../../assets/img/icones/icone_medicamento_atrasado.png') : require('../../assets/img/icones/icone_medicamento_pendente.png')} />
                                <Text>P: {medicamento.horaApme}</Text>
                                <Text style={[styleLocal.horarioAplicacao, medicamento.dhapApme == null ? styles.hideIMG : null]}> - R: {Moment(medicamento.dhapApme).format('H:mm')}</Text>
                                {/* botão quando a medicação já foi aplicada */}
                                <TouchableOpacity style={[styles.containerButtonMedicamento, medicamento.situApme == STATUS_APLICACAO_MEDICAMENTO_APLICADO ? null : [styles.hideIMG, styles.hide]]} onPress={() => { this.refs.toast.show('Medicação já aplicada!', 3000, () => { }) }}>
                                    <Image style={styles.iconLancarMedicamento} source={require('../../assets/img/icones/icone_confirma.png')} />
                                </TouchableOpacity>
                                {/* botões aparecem quando a medicação não foi aplicada */}
                                <TouchableOpacity style={[styles.containerButtonMedicamento, styles.buttonDisabled, medicamento.situApme == STATUS_APLICACAO_MEDICAMENTO_PENDENTE ? null : styles.hideIMG]} onPress={() => { let newSts = medicamento; newSts.situApme = STATUS_APLICACAO_MEDICAMENTO_APLICADO; newSts.dhapApme = Moment().format('YYYY-MM-DD HH:mm:ss'); this.lancarMedicamento(medicamento); }}>
                                    <Image style={styles.iconLancarMedicamento} source={require('../../assets/img/icones/icone_aplica_medicamento_cinza.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.containerButtonMedicamento, styles.buttonDisabled, medicamento.situApme == STATUS_APLICACAO_MEDICAMENTO_PENDENTE ? null : styles.hideIMG]} onPress={() => { let newSts = medicamento; newSts.situApme = STATUS_APLICACAO_MEDICAMENTO_CANCELADO; newSts.dhapApme = Moment().format('YYYY-MM-DD HH:mm:ss'); this.lancarMedicamento(medicamento); }}>
                                    <Image style={styles.iconLancarMedicamento} source={require('../../assets/img/icones/icone_cancela_medicamento_cinza.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            })
        }

        footerModal = (item) => {
            var alunos = this.state.alunos
            return alunos.map((aluno) => {
                if (item.co90Alun == aluno.gl90Alun.co90Alun) {
                    return (
                        <View style={styles.viewImgMed} key={item.co90Alun}>
                            <Image style={styles.imgMedicamento} source={require('../../assets/img/imagem_sem_foto.png')} />
                            <Text style={styleLocal.tituloModal}>Observações</Text>
                                <Text style={styleLocal.descricaoModal}>{item.obsApme}</Text>
                        </View>
                    )
                }
            })
        }
    }

    lancarMedicamento = (item) => {
        // console.log(item)
        var novoLancamento = []
        var novoItem = []
        AsyncStorage.getItem('lancamentos')
            .then((lancamentos) => {
                //PEGA O ARRAY COMPLETO
                if (lancamentos != null) {
                    var arrCompleto = JSON.parse(lancamentos)
                    var arrLancamentos = arrCompleto[0]
                    if (arrLancamentos.arrayPendenciaMedicamento != null) {
                        var lancamentosExistentes = arrLancamentos.arrayPendenciaMedicamento
                    }
                }
                novoItem.push({
                    co00Apme: item.co00Apme,
                    co01Apme: item.co01Apme,
                    co90Alun: item.co90Alun,
                    dataApme: item.dataApme,
                    dhapApme: item.dhapApme,
                    dosaApme: item.dosaApme,
                    horaApme: item.horaApme,
                    linkRece: item.linkRece,
                    nomeApme: item.nomeApme,
                    obsApme: item.obsApme,
                    situApme: item.situApme,
                    viadApme: item.viadApme
                })
                novoLancamento.push(novoItem)

                AsyncStorage.setItem('lancamentos',
                    JSON.stringify(
                        [
                            {
                                arrayEs00Apon:
                                    lancamentos == null ? [] : arrLancamentos.arrayEs00Apon
                                ,
                                arrayPendenciaMedicamento:
                                    lancamentos == null ? novoItem : novoLancamento.concat(lancamentosExistentes)
                                ,
                                gl90Tabl: {
                                    macTabl: this.state.macTabl,
                                    tokeTabl: this.state.tokeTabl 
                                }
                            }
                        ]
                    )
                )
            })

        AsyncStorage.getItem('medicamentos')
            .then((medicamento) => {
                var converArray = JSON.parse(medicamento)
                converArray.map((itemMed) => {
                    if (itemMed.co01Apme == item.co01Apme) {
                        // console.log(itemMed)
                        let newSts = itemMed
                        newSts.situApme = STATUS_APLICACAO_MEDICAMENTO_APLICADO
                        newSts.dhapApme = Moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                })
                this.setState({ teste: converArray })
                // console.log('converArray')
                // console.log(this.state.teste)
                AsyncStorage.setItem('medicamentos', JSON.stringify(this.state.teste))
            })
    }

    atividades() {
        var alunos = this.state.alunos
        var medicamentos = this.state.medicamentos
        var aplicados = this.state.aplicados
        var horario = Moment().format('H:MM')
        var dataAtual = Moment().format('YYYY-MM-DD')
        if (this.state.medicamentos) {
            return alunos.map((aluno) => {
                var codAluno = ''
                return medicamentos.map((item) => {
                    if (item.situApme == STATUS_APLICACAO_MEDICAMENTO_PENDENTE) {
                        if (item.co90Alun != codAluno) {
                            // if (item.dataApme == dataAtual) {
                            codAluno = item.co90Alun
                            if (item.co90Alun == aluno.gl90Alun.co90Alun) {
                                return (
                                    <TouchableOpacity onPress={() => { [this.setState({ visibleModalMedical: 4, item: item })] }} key={item.co90Alun}>
                                        <View style={[styles.botoesLinks, styles.botoesLinksMedicamentos]}>
                                            <Image style={styles.imageIcon} source={aluno.gl90Alun.sexoAlun == 'F' ? require('../../assets/img/icones/icone_aluna.png') : require('../../assets/img/icones/icone_aluno.png')} />
                                            <View style={styles.dadosAluno}><Text numberOfLines={1} style={[styles.nomeItem, styles.font13]}>{aluno.gl90Alun.nomeAlun}</Text></View>
                                            <View>
                                                <Image style={[styles.iconComplemento, styles.iconMedicamento]} source={item.horaApme <= horario ? require('../../assets/img/icones/icone_medicamento_atrasado.png') : require('../../assets/img/icones/icone_medicamento_pendente.png')} />
                                                <Text style={[styles.nomeItem, styles.noBold, styles.titleAplic]}>
                                                    Próxima aplicação {item.horaApme}
                                                </Text>
                                            </View>
                                            <View style={styles.dadosAluno}><Text style={[styles.nomeItem, styles.textPink, styles.textPinkMedicamentos]}>{item.nomeApme}</Text></View>
                                            <View style={styles.dadosAluno}><Text style={[styles.nomeItem, styles.noBold]}>{item.dosaApme} via {item.viadApme}</Text></View>
                                            <View style={styles.dadosAluno}>
                                                <Text style={[styles.nomeItem]}>
                                                    {item.medApli}/{item.medTotal} Aplicados
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            // }
                        }
                    }
                })
            })
        }
    }

    carregarMedicamentos() {
        this.setState({ fadeValue: 1 })
        AsyncStorage.getItem('token')
            .then((res_token) => {
                //PEGA O MAC DO PC SALVO NA REQUISIÇÃO DE LOGIN
                AsyncStorage.getItem('macTabl')
                    .then((res_mac) => {
                        //REQUISIÇÃO PEGA MEDICAMENTOS
                        axios.post(`${apiMEDICAMENTOS}`, {
                            tokeTabl: res_token,
                            macTabl: res_mac
                        }).then((medicamentos) => {
                            AsyncStorage.removeItem('medicamentos')
                            var medicamentos_ordenados = medicamentos.data.sort(function (a, b) {
                                return a.co00Apme > b.co00Apme ? 1 : a.co00Apme < b.co00Apme ? -1 : 0
                            })
                            AsyncStorage.setItem('medicamentos', JSON.stringify(medicamentos_ordenados))
                            this.setState({ fadeValue: 0 })
                            // console.log(medicamentos_ordenados)
                        }).catch((error) => {
                            console.log(error)
                            this.setState({ fadeValue: 0 })
                        })

                    })
            })
        Actions.push('Medicamentos')
    }

    render() {
        return (
            <Fragment>
                <Loading fadeValue={this.state.fadeValue} />
                <Header />
                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>Aplicação de Medicamentos</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={styles.rowContainer}>
                            {this.atividades()}
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.containerIconSelectMulti} onPress={() => { this.carregarMedicamentos() }}>
                    <Image style={styles.iconSelectMulti} source={require('../../assets/img/icones/icone_atualiza_medicamento.png')} />
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.visibleModalMedical === 4}
                    backdropColor={"white"}
                    backdropOpacity={1}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={100}
                    animationOutTiming={100}
                    backdropTransitionInTiming={100}
                    backdropTransitionOutTiming={100}
                >
                    <View style={styles.alignDadosAluno}>
                        {/* {console.log(item)} */}
                        <ScrollView style={styles.container}>
                            <View style={styles.containerDadosAluno}>
                                {headerModal(this.state.item)}
                                <View style={styles.imagemLancamentosMed}>
                                    <View style={styles.containerLancamentosMedicamentos}>
                                        {modalMedicamento(this.state.item)}
                                    </View>
                                    <View style={styles.viewImgMed}>
                                        <Image style={styles.imgMedicamento} source={require('../../assets/img/imagem_sem_foto.png')} />
                                        <Text style={styleLocal.tituloModal}>Observações</Text>
                                    </View>
                                </View>
                                {renderButton("Fechar", () => {
                                    if (this._willMount === true) {
                                        this.setState({ visibleModalMedical: null })
                                    }
                                })}
                            </View>
                        </ScrollView>
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
                </Modal>
            </Fragment>
        )
    }
}

const styleLocal = {
    nomeAluno: {
        color: '#333',
        marginBottom: 10,
        fontSize: 13,
        fontWeight: 'bold'
    },
    tituloModal: {
        color: '#9f099a',
        marginBottom: 5,
        fontSize: 13,
        fontWeight: 'bold'
    },
    descricaoModal: {
        color: '#999',
        fontSize: 13,
        marginBottom: 10
    },
    horarioAplicacao: {
        marginRight: 15
    },
    hide: {
        opacity: 0,
        height: 0
    }
}

export { Medicamentos }