import { Dimensions } from 'react-native'
let { width } = Dimensions.get('window')
let numberGrid = 3
let widthGrid = width / numberGrid - 22
let widthGridMed = width / 2 - 22
const styles = {
    container: {
        backgroundColor: '#EEEEEE',
    },
    breadcrumb: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE'
    },
    breadSinc: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 11,
        paddingRight: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
    },
    breadText: {
        fontSize: 13,
        marginLeft: 5,
        marginRight: 5,
        padding: 0
    },
    breadIcon: {
        fontSize: 25
    },
    rowContainer: {
        paddingBottom: 40,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowContainerSinc: {
        paddingLeft: 11,
        paddingRight: 11,
        marginTop: 20,
        paddingBottom: 20
    },
    widthBotoesHome: {
        width: widthGrid,
        height: widthGrid,
        marginRight: 11,
        marginLeft: 11,
        marginBottom: 20
    },
    botoesLinks: {
        width: widthGrid,
        height: widthGrid,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 20,
        marginRight: 11,
        marginLeft: 11,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1
    },
    botoesLinksMedicamentos: {
        width: widthGridMed,
        height: 180
    },
    botoesNoImg: {
        height: 50,
        paddingTop: 0,
        paddingBottom: 0
    },
    botoesLinksHome: {
        width: '100%',
        height: widthGrid,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1
    },
    alunosSelecionados: {
        backgroundColor: '#f3d4c6'
    },
    alunoNaoSelecionado: {
        backgroundColor: '#FFF'
    },
    imageIcon: {
        width: Dimensions.get('window').width <= 400 ? 40 : 50,
        height: Dimensions.get('window').width <= 400 ? 40 : 50,
        marginBottom: 10
    },
    dadosAluno: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    numero: {
        width: 15,
        height: 15,
        borderRadius: 15,
        marginRight: 5,
        backgroundColor: '#1970b3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemNumero: {
        color: '#FFF',
        fontSize: 11,
    },
    nomeItem: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: Dimensions.get('window').width <= 400 ? 8 : 10
    },
    nomeAluno: {
        width: Dimensions.get('window').width <= 400 ? 50 : 80,
        marginTop: 2
    },
    hide: {
        opacity: 0
    },
    hideIMG: {
        width: 0,
        height: 0,
        opacity: 0
    },
    containerEntradaSaida: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    entradaSaida: {
        width: 40,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    entrada: {
        fontSize: 8,
        color: '#1385cd'
    },
    saida: {
        fontSize: 8,
        color: '#f44d4d'
    },
    button: {
        backgroundColor: "#f44d4d",
        color: '#FFF',
        padding: 12,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        flexDirection: 'column',
        justifyContent: "center"
    },
    alignDadosAluno: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerDadosAluno: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#04726d'
    },
    text: {
        margin: 6
    },
    textHead: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFFFFF'
    },
    textHeadBlack: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 11
    },
    textBodyBlack: {
        fontSize: 11,
        marginTop: 5,
        borderColor: '#FFFFFF'
    },
    testeHide: {
        height: 0
    },
    lancamentos: {
        width: Dimensions.get('window').width <= 400 ? 140 : 180,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    textYellow: {
        color: '#bca718',
        fontWeight: 'bold'
    },
    textGreen: {
        color: '#108a36',
        fontWeight: 'bold'
    },
    textPink: {
        color: '#9f099a',
        fontWeight: 'bold'
    },
    textPinkMedicamentos: {
        marginTop: 10
    },
    noBold: {
        fontWeight: 'normal',
        fontSize: 9
    },
    viewBtnSincronizar: {
        backgroundColor: '#2222b8',
        borderRadius: 30,
        paddingTop: 4,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10
    },
    btnSincronizar: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    botoesSinc: {
        width: Dimensions.get('window').width <= 400 ? 140 : 170,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconesSinc: {
        width: 25,
        height: 25
    },
    containerDadosSinc: {
        width: '100%',
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5,
        backgroundColor: '#FFFFFF'
    },
    textApontBlue: {
        color: '#51d0df',
        fontWeight: 'bold',
        fontSize: 11
    },
    tableApont: {
        width: '100%',
        marginTop: 10
    },
    scrollTableApontamentos: {
        height: 200
    },
    parametrosSinc: {
        paddingLeft: 11,
        paddingRight: 11,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    containerParams: {
        width: (Dimensions.get('screen').width / 2) - 20
    },
    containerParamsFull: {
        width: Dimensions.get('screen').width - 20,
        marginTop: 20,
        alignItems: 'center'
    },
    textParametro: {
        color: '#9f099a',
        fontWeight: 'bold',
        fontSize: 13,
        marginBottom: 5
    },
    textInfo: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 9
    },
    containerIconSelectMulti: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    iconSelectMulti: {
        width: 60,
        height: 60
    },
    iconLancarMedicamento: {
        width: 40,
        height: 40
    },
    containerButtonMedicamento: {
        width: 40,
        height: 40
    },
    buttonDisabled: {
        marginLeft: 10
    },
    containerMultiConf: {
        width: 115,
        height: 60,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 30
    },
    btnMultiConf: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 6
    },
    iconSelectMultiConf: {
        width: 50,
        height: 50
    },
    inputComplemento: {
        height: 300,
        padding: 10,
        marginLeft: 11,
        marginRight: 11,
        borderRadius: 5,
        alignItems: 'baseline',
        backgroundColor: '#FFFFFF'
    },
    font10: {
        fontSize: 10
    },
    iconComplemento: {
        width: 10,
        height: 10,
        position: 'absolute',
        right: 10,
        top: 10
    },
    iconStsMed: {
        width: 15,
        height: 15,
        marginRight: 15
    },
    iconMedicamento: {
        position: 'absolute',
        top: '50%',
        left: -15
    },
    containerComplemento: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 11,
        marginLeft: 11,
        marginTop: 20
    },
    titleAplic: {
        marginTop: 10,
        fontSize: 11
    },
    font13: {
        fontSize: 13
    },
    containerLancaMed: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#EEE',
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
    },
    imagemLancamentosMed: {
        flexDirection: Dimensions.get('window').width > 500 ? 'row' : 'column',
        justifyContent: 'space-between',        
    },
    containerLancamentosMedicamentos: {
        flex: 2,
        flexDirection: 'column'
    },
    viewLancamentos: {
        marginRight: 10
    },
    viewImgMed: {
        flex: 5
    },
    imgMedicamento: {
        resizeMode: 'contain',
        marginBottom: 10
    }
}

export default styles