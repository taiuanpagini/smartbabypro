import React, { PureComponent, Fragment } from 'react'
import { View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Padrao from '../services/padroes'

export default class DetalhesAtividades extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            idTurma: [],
            fadeValue: 1,
            dataAcesso: ''
        }
    }

    componentWillUnmount() {
        this._willMount = false
        Actions.refresh('root')
    }

    componentWillMount() {
        this._willMount = true
        const params = this.props
        AsyncStorage.getItem(params.gl90Prog.idenProg == CATEGORIAS.TPALIM ? 'todosItens' : 'turmasAlunos')
            .then((response) => {
                const data = JSON.parse(response)
                // if (params.gl90Prog.idenProg == CATEGORIAS.TPALIM && this._willMount === true) {
                if (this._willMount === true) {
                    this.setState({ opcoes: data })
                }
                // } else {
                //     {
                //         var array = []
                //         data.map(function (item) {
                //             array.push(item.es00Turm.nomeTurm)
                //         })
                //         var result = array.sort().reduce((init, current) => {
                //             if (init.length === 0 || init[init.length - 1] !== current) {
                //                 init.push(current)
                //             }
                //             return init;
                //         }, []);
                //         if (this._willMount === true) {
                //             this.setState({
                //                 opcoes: result
                //             })
                //         }
                //     }
                AsyncStorage.getItem('dataAcesso')
                    .then((dataAcesso) => {
                        AsyncStorage.getItem('lancamentosSincronizados')
                            .then((lancamentosSincronizados) => {
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
                if (this._willMount === true) {
                    this.setState({ fadeValue: 0 })
                }
            }).catch((error) => {
                console.log(error)
            })
    }


    //requisição que mostra todas as atividades do nivel 1
    atividades() {
        const params = this.props

        if (params.gl90Prog.idenProg == CATEGORIAS.TPALIM) {
            const params = this.props
            //envia o usuario para os detalhes da atividade selecionada
            detalhes = (item) => {
                Actions.ListaTurmas(item)
            }

            return this.state.opcoes.map(function (item) {
                // console.log(item)
                if (item.niveItem == 2 && item.gl90Prog.idenProg == params.gl90Prog.idenProg && item.ativItem == true) {
                    return (
                        <TouchableOpacity onPress={() => { this.detalhes(item) }} key={item.co00Item}>
                            <View style={styles.botoesLinks}>
                                <Image style={styles.imageIcon} source={{ uri: `${apiURL}${item.gl90Icon.linkIcon}` }} />
                                <Text style={styles.nomeItem}>{item.titiItem}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            })
        } else {
            const categoria = this.props
            //envia o usuario para os detalhes da atividade selecionada
            detalhes = (turma) => {
                Actions.ListaAlunos({ categoria, turma });
            }
            // console.log(this.state.dadosTurma)
            let nomeTurma = ''
            return this.state.opcoes.map(function (turma) {
                if (nomeTurma != turma.es00Turm.nomeTurm) {
                    nomeTurma = turma.es00Turm.nomeTurm
                    return (
                        <TouchableOpacity onPress={() => { this.detalhes(turma) }} key={turma}>
                            <View style={styles.botoesLinks}>
                                <Image style={styles.imageIcon} source={require('../../assets/img/icones/icone_turmas.png')} />
                                <Text style={styles.nomeItem}>{turma.es00Turm.nomeTurm}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            })
        }
    }

    render() {
        const params = this.props
        return (
            <Fragment>
                <Header />
                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.titiItem}</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={styles.rowContainer}>
                            {this.atividades()}
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

export { DetalhesAtividades }