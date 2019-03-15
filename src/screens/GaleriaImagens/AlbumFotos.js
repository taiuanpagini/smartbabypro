import React, { PureComponent, Fragment } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../../components/Header'
import styles from '../../style/Padrao'
import { SearchBar } from 'react-native-elements';

export default class AlbumFotos extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    albuns = () => {
        return (
            <TouchableOpacity onPress={() => { }} key={0}>
                <View style={[styles.botoesLinks, styles.botoesLinksMedicamentos]}>
                    <Image style={styles.imageIcon} source={require('../../../assets/img/icones/icone_aluna.png')} />
                    <View style={styles.dadosAluno}><Text numberOfLines={1} style={[styles.nomeItem, styles.font13]}>Título do Álbum</Text></View>
                </View>
            </TouchableOpacity>
        )
    }

    updateSearch = search => {
        this.setState({ search })
    }

    render() {
        const { search } = this.state

        return (
            <Fragment>
                <Header />
                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                    <Text style={styles.breadText}>|</Text>
                    <Text style={styles.breadText}>Álbuns de Fotos</Text>
                </View>
                <SearchBar
                    lightTheme
                    round
                    placeholder="Pesquise o nome do álbum"
                    containerStyle={stylelocal.containerStyle}
                    inputStyle={stylelocal.inputStyle}
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <ScrollView>
                    <View style={[styles.container, stylelocal.paddingContainerAlbum]}>
                        <View style={styles.rowContainer}>
                            {this.albuns()}
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

const stylelocal = {
    paddingContainerAlbum: {
        paddingTop: 20
    },
    containerStyle: {
        backgroundColor: '#EEEEEE'
    },
    inputStyle: {
        height: 10
    }
}