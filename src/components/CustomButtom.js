import React, { PureComponent, Fragment } from 'react'
import { View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../style/Padrao'
import Moment from 'moment'

export default class CustomButton extends PureComponent {
    constructor() {
        super()

        this.state = {
            selected: false,
            todosMateriais: []
        }
    }

    componentWillMount() {
        const { selected } = this.props

        this.setState({
            selected
        })

        adicionarRemoverItem = ({ item }) => {
            var itemNovo = {
                alimItem: item.alimItem,
                ativItem: item.ativItem,
                co00Item: item.co00Item,
                compItem: item.compItem,
                entiItem: item.entiItem,
                exapItem: item.exapItem,
                finaItem: item.finaItem,
                paiItem: item.paiItem,
                horario: Moment().format('YYYYMMDDHHmmss')
            }
            var array = this.state.todosMateriais
            var index = array.indexOf({ item })
            if (index !== -1) {
                array.splice(index, 1)
                this.setState({ todosMateriais: array })
            } else {
                array.push(itemNovo)
                this.setState({ todosMateriais: array })
            }
            AsyncStorage.setItem('todosMateriais', JSON.stringify(this.state.todosMateriais))
            console.log(this.state.todosMateriais.length)
        }
    }

    render() {
        const { title, item } = this.props
        const { selected } = this.state

        return (
            <TouchableOpacity onPress={() => [adicionarRemoverItem({ item }), this.setState({ selected: !selected })]}>
                <View style={[styles.botoesLinks, styles.botoesNoImg, selected ? styles.alunosSelecionados : null]}>
                    <Text style={styles.nomeItem}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export { CustomButton }