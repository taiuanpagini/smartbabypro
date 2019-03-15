import React, { PureComponent, Fragment } from 'react'
import {
    View,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux'
import { Table, Row } from 'react-native-table-component'
import Moment from 'moment'
import Padrao from '../services/padroes'

export default class ListaAlunos extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            fadeValue: 1,
            visibleModalResponsable: null,
            visibleModalMedical: null,
            tableHead: ['Responsável', 'Vínculo', 'Telefone'],
            dataAcesso: ''
        }
    }

    componentWillUnmount() {
        Actions.refresh('root')
        this._willMount = false
    }

    componentWillMount() {
        this._willMount = true
        const params = this.props.navigation.state.params
        AsyncStorage.getItem('turmasAlunos')
            .then((response) => {
                if (this._willMount === true) {
                    this.setState({ opcoes: JSON.parse(response) });
                    this.setState({ fadeValue: 0 })
                }
                AsyncStorage.getItem('lancamentos')
                    .then((lancamentos) => {
                        AsyncStorage.getItem('lancamentosSincronizados')
                            .then((lancamentosSincronizados) => {
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

        renderButton = (text, onPress) => (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.textHead}>{text}</Text>
                </View>
            </TouchableOpacity>
        )

        renderModalContentMedical = () => (
            <View style={styles.alignDadosAluno}>
                <View style={styles.containerDadosAluno}>
                    <Text style={styleLocal.nomeAluno}>{params.item.gl90Alun.nomeAlun}</Text>
                    <Text style={styleLocal.tituloModal}>Problemas de Saúde</Text>
                    <Text style={styleLocal.descricaoAluno}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus velit, ut suscipit nunc dictum in.</Text>
                    <Text style={styleLocal.tituloModal}>Cuidados Especiais</Text>
                    <Text style={styleLocal.descricaoAluno}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus velit, ut suscipit nunc dictum in.</Text>
                    <Text style={styleLocal.tituloModal}>Alergias e Reações</Text>
                    <Text style={styleLocal.descricaoAluno}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus velit, ut suscipit nunc dictum in.</Text>
                    {renderButton("Fechar", () => {
                        if (this._willMount === true) {
                            this.setState({ visibleModalMedical: null })
                        }
                    })}
                </View>
            </View>
        )

        renderModalContentResponsable = () => (
            <View style={styles.alignDadosAluno}>
                <View style={styles.containerDadosAluno}>
                    <Text style={styleLocal.nomeAluno}>{params.item.gl90Alun.nomeAlun}</Text>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#00ACA4' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={[styles.text, styles.textHead]} />
                        <Row data={[params.item.gl90Alun.pai_Alun, 'Pai', 'Não consta']} textStyle={styles.text} style={params.item.gl90Alun.pai_Alun == '' || params.item.gl90Alun.pai_Alun == null ? styleLocal.hide : ''} />
                        <Row data={[params.item.gl90Alun.mae_Alun, 'Mãe', 'Não consta']} textStyle={styles.text} style={params.item.gl90Alun.mae_Alun == '' || params.item.gl90Alun.mae_Alun == null ? styleLocal.hide : ''} />
                    </Table>
                    {renderButton("Fechar", () => {
                        if (this._willMount === true) {
                            this.setState({ visibleModalResponsable: null })
                        }
                    })}
                </View>
            </View>
        )
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
    }

    atividades() {
        return (
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => { this.setState({ visibleModalMedical: 4 }) }} key='0'>
                    <View style={styles.botoesLinks}>
                        <Image style={styles.imageIcon} source={require('../../assets/img/icones/icone_notas_medicas.png')} />
                        <View style={styles.dadosAluno}>
                            <Text style={[styles.nomeItem, styles.nomeAluno]}>Notas Médicas</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ visibleModalResponsable: 4 }) }} key='1'>
                    <View style={styles.botoesLinks}>
                        <Image style={styles.imageIcon} source={require('../../assets/img/icones/icone_responsavel_pai.png')} />
                        <View style={styles.dadosAluno}>
                            <Text style={[styles.nomeItem, styles.nomeAluno]}>Responsáveis</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const params = this.props
        return (
            <Fragment>
                <Header />
                <View style={styles.container}>
                    <Modal
                        isVisible={this.state.visibleModalMedical === 4}
                        backdropColor={"white"}
                        backdropOpacity={1}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                    >
                        {renderModalContentMedical()}
                    </Modal>

                    <Modal
                        isVisible={this.state.visibleModalResponsable === 4}
                        backdropColor={"white"}
                        backdropOpacity={1}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                    >
                        {renderModalContentResponsable()}
                    </Modal>
                </View>

                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.subcategoria.categoria.gl90Prog.nomeProg}</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.subcategoria.turma.es00Turm.nomeTurm}</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.item.gl90Alun.nomeAlun}</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        {this.atividades()}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

const styleLocal = {
    nomeAluno: {
        fontSize: 24,
        color: '#666',
        marginBottom: 15
    },
    tituloModal: {
        color: '#f44d4d',
        fontSize: 14,
        marginTop: 15,
        marginBottom: 5
    },
    descricaoModal: {
        color: '#999',
        fontSize: 11,
    },
    hide: {
        opacity: 0,
        height: 0
    }
}

export { ListaAlunos }