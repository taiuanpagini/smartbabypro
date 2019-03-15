import React, { PureComponent, Fragment } from 'react'
import { View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Padrao from '../services/padroes'

export default class ListaTurmas extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            turmas: [],
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

        AsyncStorage.getItem('lancamentos')
            .then((lancamentos) => {
                AsyncStorage.getItem('lancamentosSincronizados')
                    .then((lancamentosSincronizados) => {
                        AsyncStorage.getItem('turmasAlunos')
                            .then((response) => {
                                const data = JSON.parse(response)
                                if (this._willMount === true) {
                                    this.setState({ turmas: data })
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


                                if (this._willMount === true) {
                                    this.setState({ fadeValue: 0 })
                                }

                            }).catch((error) => {
                                console.log(error)
                            })
                    })
            })
    }

    //requisição que mostra todas as atividades do nivel 1
    atividades() {
        const categoria = this.props
        //envia o usuario para os detalhes da atividade selecionada
        detalhes = (turma) => {
            Actions.ListaAlunos({ categoria, turma });
        }

        let nomeTurma = ''
        return this.state.turmas.map(function (turma) {
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

    render() {
        const params = this.props
        return (
            <Fragment>
                <Header />
                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.nomeItem}</Text>
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

export { ListaTurmas }