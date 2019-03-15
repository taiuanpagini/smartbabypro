import { Platform, Dimensions } from 'react-native'

const styles = {
    container: {
        margin: 0,
        padding: 10,
        backgroundColor: '#00ACA4'
    },
    rowContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: Dimensions.get('window').width <= 400 ? 120 : 150,
        resizeMode: 'contain'
    },
    botoesMenu: {
        width: Dimensions.get('window').width <= 400 ? 110 : 140,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}

export default styles