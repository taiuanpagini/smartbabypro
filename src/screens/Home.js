import React, { Component, PureComponent, Fragment } from 'react'
import { ListView, View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity, NetInfo, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Padrao from '../services/padroes'
import { Button, ButtonGroup } from 'react-native-elements'

export default class Home extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            todosItens: [],
            fadeValue: 1,
            showCancel: false,
            petname: '',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('itensIniciais')
            .then((value) => {
                this.setState({ opcoes: JSON.parse(value) })
                AsyncStorage.getItem('todosItens')
                    .then((todosItens) => {
                        this.setState({ todosItens: JSON.parse(todosItens) })
                        AsyncStorage.getItem('dataAcesso')
                            .then((dataAcesso) => {
                                AsyncStorage.getItem('lancamentosSincronizados')
                                    .then((lancamentosSincronizados) => {
                                        if (this._willMount === true) {
                                            dataAcesso = dataAcesso
                                        }
                                        AsyncStorage.getItem('lancamentos')
                                            .then((lancamentos) => {
                                                console.log('lancamentos')
                                                console.log(JSON.parse(lancamentos))
                                            })
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
                this.setState({ fadeValue: 0 })
            }).catch((error) => {
                console.log(error)
            })

        //requisição que mostra todas as atividades do nivel 1
        atividades = () => {
            //envia o usuario para os detalhes da atividade selecionada
            detalhes = (item) => {
                item.co00Item == CATEGORIAS.CODMEDI ? Actions.Medicamentos() : item.co00Item == CATEGORIAS.CODALBUM ? Actions.AlbumFotos() : Actions.DetalhesAtividades(item)
                // alert(item.co00Item)
            }

            return this.state.opcoes.map(function (item) {
                return (
                    <TouchableOpacity style={styles.widthBotoesHome} onPress={() => { this.detalhes(item) }} key={item.co00Item}>
                        <View style={styles.botoesLinksHome}>
                            <Image style={styles.imageIcon} source={{ uri: `${apiURL}${item.gl90Icon.linkIcon}` }} />
                            <Text style={styles.nomeItem}>{item.nomeItem}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.rowContainer}>
                            {atividades()}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.testeHide}>
                    {
                        this.state.todosItens.map(function (icone) {
                            return (
                                <Image style={[styles.imageIcon, styles.hide]} key={icone.co00Item} source={{ uri: `http://45.55.32.222/Escola${icone.gl90Icon.linkIcon}` }} />
                            )
                        })
                    }
                </View>
            </Fragment>
        )
    }
}

const styleLocal = {
    teste: {
        backgroundColor: 'red'
    },
    buttonStyle: {
        backgroundColor: 'black',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 0,
    },
    selectedButtonStyle: {
        backgroundColor: 'gray',
    }
}

export { Home }