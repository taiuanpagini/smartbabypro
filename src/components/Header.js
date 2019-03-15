import React, { PureComponent, Fragment } from 'react'
import { View, Image, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import icon from '../../assets/img/logo.png'
import header from '../style/Header'
import { Actions } from 'react-native-router-flux'
import StatusBarPaddingIOS from 'react-native-ios-status-bar-padding'
import Notification from '../components/Notification'

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Notification />
                <StatusBarPaddingIOS style={{ backgroundColor: '#00ACA4' }} />
                <View style={header.container}>
                    <View style={header.rowContainer}>
                        <TouchableOpacity onPress={() => Actions.Sincronizacao()}><Image source={icon} style={header.image} /></TouchableOpacity>
                        <View style={header.botoesMenu}>
                            <Icon
                                raised
                                size={Dimensions.get('window').width <= 400 ? 10 : 13}
                                name='plus'
                                type='font-awesome'
                                color='#00ACA4'
                                containerStyle={{ margin: 0 }}
                                onPress={() => Actions.Medicamentos()} />
                            <Icon
                                raised
                                size={Dimensions.get('window').width <= 400 ? 10 : 13}
                                name='comment'
                                type='font-awesome'
                                color='#00ACA4'
                                containerStyle={{ margin: 0 }}
                                onPress={() => alert('Botão 2')} />
                            <Icon
                                raised
                                size={Dimensions.get('window').width <= 400 ? 10 : 13}
                                name='home'
                                type='font-awesome'
                                color='#00ACA4'
                                containerStyle={{ margin: 0 }}
                                onPress={() => Actions.currentScene === 'Home' ?
                                    null : Actions.Home()} />
                            <Icon
                                raised
                                size={Dimensions.get('window').width <= 400 ? 10 : 13}
                                name='undo'
                                type='font-awesome'
                                color='#00ACA4'
                                containerStyle={{ margin: 0 }}
                                onPress={() => Actions.currentScene === 'Home' ?
                                    null : Actions.pop()} />
                            {/* <Icon
                                raised
                                size={Dimensions.get('window').width <= 400 ? 10 : 13}
                                name='close'
                                type='font-awesome'
                                color='#00ACA4'
                                containerStyle={{ margin: 0 }}
                                onPress={() => { this.sair() }} /> */}
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }
}

export { Header }