import React, { PureComponent, Fragment } from 'react'
import { View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../style/Padrao'
import Padrao from '../services/padroes'
import Moment from 'moment'
import { Actions } from 'react-native-router-flux'

export default class CustomButtonAluno extends PureComponent {
    constructor() {
        super()

        this.state = {
            selected: false,
            todosMateriais: []
        }
    }

    componentWillMount() {
        const { selected, subcategoria } = this.props
        
        this.setState({
            selected
        })

        AsyncStorage.getItem('turmasAlunos')
            .then((response) => {
                if (this._willMount === true) {
                    this.setState({ todosAlunos: JSON.parse(response) })
                }
            })

        detalhes = (item) => {
            subcategoria.categoria.co00Item == CATEGORIAS.CODDADOSCRI ? Actions.DadosAluno({ item, subcategoria })
                : subcategoria.categoria.tpapItem == CATEGORIAS.CADMULT ? Actions.replace('LancarMultiplos', { item, subcategoria }) : Actions.LancarAtividadeAluno({ item, subcategoria })
        }

        adicionaRemove = ({ item }) => {
            this.state.todosAlunos.map((aluno) => {
                var array = [...this.state.todosAlunos]
                var index = array.indexOf({ item })
                if (index !== -1) {
                    array.splice(index, 1)
                    this.setState({ todosAlunos: array })
                } else {
                    array.push(item)
                    this.setState({ todosAlunos: array })
                }
            })
        }

        // adicionarRemoverItem = ({ item }) => {
        //     var array = this.state.todosMateriais
        //     var index = array.indexOf({ item })
        //     if (index !== -1) {
        //         array.splice(index, 1)
        //         this.setState({ todosMateriais: array })
        //     } else {
        //         array.push(item)
        //         this.setState({ todosMateriais: array })
        //     }
        //     AsyncStorage.setItem('todosMateriais', JSON.stringify(this.state.todosMateriais))
        // }
    }

    render() {
        const { title, item, status, sexo, subcategoria, alunos } = this.props
        const { selected } = this.state

        return (            
            <TouchableOpacity onPress={() => status === false ? detalhes({ item }) : [adicionaRemove({ item }), this.setState({ selected: !selected })]}>                
                <View style={[styles.botoesLinks, selected ? styles.alunosSelecionados : null]}>
                    <Image style={styles.imageIcon} source={sexo == 'F' ? require('../../assets/img/icones/icone_aluna.png') : require('../../assets/img/icones/icone_aluno.png')} />
                    <Text style={styles.nomeItem}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export { CustomButtonAluno }