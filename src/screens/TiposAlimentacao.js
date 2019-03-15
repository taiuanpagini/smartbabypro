import React, { PureComponent, Fragment } from 'react'
import { View, Text, TextInput, Alert, Image, Dimensions, ImageBackground, AsyncStorage, FlatList, ScrollView, StyleSheet, Animated, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../components/Header'
import styles from '../style/Padrao'
import Loading from '../components/common/Loading';

export default class TiposAlimentacao extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            fadeValue: 1,
            codTurma: 0
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('token')
            .then((value) => {
                this.setState({ tokeTabl: value })
                AsyncStorage.getItem('macTabl')
                    .then((value2) => {
                        this.setState({ macTabl: value2 })
                    }).then(() => {
                        axios.post("http://45.55.32.222/Escola/dadostablet/listitens114", {
                            tokeTabl: this.state.tokeTabl,
                            macTabl: this.state.macTabl
                        })
                            .then((response) => {
                                this.setState({ opcoes: response.data })
                                console.log(this.state.opcoes)
                                this.setState({ fadeValue: 0 })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
            })
    }
    
    //requisição que mostra todas as atividades do nivel 1
    atividades() {
        const params = this.props.navigation.state.params.item
        //envia o usuario para os detalhes da atividade selecionada
        detalhes = (item) => {
            let rotaAtual = this.props.navigation.state.routeName
            this.props.navigation.navigate('ListaTurmas', { item, rotaAtual });
            // alert(item)
        }

        return this.state.opcoes.map(function (item) {
            if (item.niveItem == 2 && item.gl90Prog.idenProg == params.gl90Prog.idenProg && item.ativItem == true) {
                return (
                    <TouchableOpacity onPress={() => { this.detalhes(item) }} key={item.co00Item}>
                        <View style={styles.botoesLinks}>
                            <Image style={styles.imageIcon} source={{ uri: `http://45.55.32.222/Escola${item.gl90Icon.linkIcon}` }} />
                            <Text style={styles.nomeItem}>{item.nomeItem}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        })
    }

    render() {
        const params = this.props.navigation.state.params.item
        return (
            <Fragment>
                {/* <Loading fadeValue={this.state.fadeValue}/> */}
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

const styleLoading = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23c4c6',
        zIndex: 1,
    },
    rowContainer: {
        width: '100%',
        backgroundColor: '#DDD',
        height: '100%',
        position: 'relative'
    },
    animationView: {
        width: 244,
        height: 97,
    },
    indicator: {
        marginTop: 40,
        marginBottom: 40
    },
    hide: {
        width: 0,
        height: 0
    }
});

export { TiposAlimentacao }