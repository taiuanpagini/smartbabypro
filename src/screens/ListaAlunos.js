import React, { PureComponent, Fragment } from 'react'
import {
    View,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Padrao from '../services/padroes'
import CustomButtonAluno from '../components/CustomButtomAlunos'

export default class ListaAlunos extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props)
        this.state = {
            tokeTabl: '',
            macTabl: '',
            alunos: [],
            fadeValue: 1,
            alunosLancados: [],
            lancamentos: [],
            dataAcesso: '',
            showCancel: false,
            todosAlunos: null
        }
    }

    componentWillUnmount() {
        this._willMount = false
        Actions.refresh('root')
    }

    componentWillMount() {
        this._willMount = true
        // console.log(this.state.lancamentos)
        AsyncStorage.getItem('turmasAlunos')
            .then((response) => {
                if (this._willMount === true) {
                    this.setState({ alunos: JSON.parse(response) })
                }
                AsyncStorage.getItem('lancamentos')
                    .then((lancamentos) => {
                        AsyncStorage.getItem('lancamentosSincronizados')
                            .then((lancamentosSincronizados) => {
                                lancamentos == null ?
                                    [
                                        {
                                            arrayEs00Apon: [
                                                {
                                                    acao: '',
                                                    compApon: '',
                                                    cotbApon: '',
                                                    dataApon: '',
                                                    es00Item: {
                                                        ativItem: '',
                                                        co00Item: '',
                                                        compItem: '',
                                                        entiItem: ''
                                                    },
                                                    es00Turm: {
                                                        ano_Turm: '',
                                                        ativTurm: '',
                                                        co00Turm: ''
                                                    },
                                                    firstLevelItemCode: '',
                                                    gl90Alun: {
                                                        co90Alun: '',
                                                        co90Usch: ''
                                                    },
                                                    gl90Grit: {
                                                        co90Grit: ''
                                                    },
                                                    gl90Item: {
                                                        co90Item: ''
                                                    },
                                                    gl90Prog: {
                                                        co90Prog: ''
                                                    },
                                                    gl90Resp: {
                                                        acesResp: '',
                                                        co90Resp: '',
                                                        retiResp: ''
                                                    },
                                                    horaApon: '',
                                                    periodId: '',
                                                    processado: '',
                                                    valoApon: ''
                                                }
                                            ],
                                            arrayPendenciaMedicamento: [],
                                            gl90Tabl: {
                                                macTabl: '',
                                                tokeTabl: ''
                                            }
                                        }
                                    ]
                                    : this._willMount === true ? this.setState({ lancamentos: JSON.parse(lancamentos) })
                                        : null
                                // console.log(this.state.lancamentos)
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
                            })
                    })
            }).catch((error) => {
                console.log(error)
            })
    }

    //requisição que mostra todas as atividades do nivel 1
    atividades() {
        const subcategoria = this.props
        const alunos = this.state.lancamentos
        var status = this.state.showCancel
        //envia o usuario para os detalhes da atividade selecionada
        
        detalhes = (item) => {
            subcategoria.categoria.co00Item == CATEGORIAS.CODDADOSCRI ? Actions.DadosAluno({ item, subcategoria })
                : subcategoria.categoria.tpapItem == CATEGORIAS.CADMULT ? Actions.replace('LancarMultiplos', { item, subcategoria }) : Actions.LancarAtividadeAluno({ item, subcategoria })
        }

        adicionaRemove = (item) => {
            this.state.todosAlunos.map((aluno) => {
                var array = [...this.state.todosAlunos]
                var index = array.indexOf(item)
                if (index !== -1) {
                    array.splice(index, 1)
                    let newSts = item
                    newSts.status = false
                    this.setState({ todosAlunos: array })
                } else {
                    array.push(item)
                    let newSts = item
                    newSts.status = true
                    this.setState({ todosAlunos: array })
                }
                console.log(this.state.todosAlunos)
            })
        }

        return this.state.alunos.map(function (item) {

            let contador = 0
            let horarioEntrada = ''
            let horarioSaida = ''
            // console.log(subcategoria)
            alunos.map((aluno, index) => {
                // console.log(subcategoria)
                // console.log(aluno)
                aluno.arrayEs00Apon.map((apontamento) => {
                    if (subcategoria.categoria.gl90Prog.nomeProg == CATEGORIAS.NOMEPROGALIM && apontamento.firstLevelItemCode == 1 && item.gl90Alun.co90Alun == apontamento.gl90Alun.co90Alun && subcategoria.turma.es00Turm.co00Turm == apontamento.es00Turm.co00Turm && subcategoria.categoria.co00Item == apontamento.es00Item.co00Item) {
                        contador += 1
                    } else {
                        if (subcategoria.categoria.co00Item == apontamento.firstLevelItemCode && item.gl90Alun.co90Alun == apontamento.gl90Alun.co90Alun && item.es00Turm.co00Turm == apontamento.es00Turm.co00Turm) {
                            contador += 1
                        } else {
                            //CATPAI | 32 = XIXI | 33 = FEZES | 53 = LEITE | 56 = CHA | 59 = SUCO
                            if (((apontamento.firstLevelItemCode == CATEGORIAS.CODXIXI || apontamento.firstLevelItemCode == CATEGORIAS.CODFEZES) || (apontamento.firstLevelItemCode == CATEGORIAS.CODLEITE || apontamento.firstLevelItemCode == CATEGORIAS.CODCHA || apontamento.firstLevelItemCode == CATEGORIAS.CODSUCO)) && item.gl90Alun.co90Alun == apontamento.gl90Alun.co90Alun && item.es00Turm.co00Turm == apontamento.es00Turm.co00Turm && subcategoria.categoria.co00Item == apontamento.firstLevelItemCode) {
                                contador += 1
                            }
                        }
                    }

                    //PEGAR HORARIO DE ENTRADA E SAIDA
                    if (item.gl90Alun.co90Alun == apontamento.gl90Alun.co90Alun && apontamento.gl90Item.co90Item == CATEGORIAS.APONTENT && item.es00Turm.co00Turm == apontamento.es00Turm.co00Turm) {
                        horarioEntrada = apontamento.horaApon
                    }
                    if (item.gl90Alun.co90Alun == apontamento.gl90Alun.co90Alun && apontamento.gl90Item.co90Item == CATEGORIAS.APONTSAI && item.es00Turm.co00Turm == apontamento.es00Turm.co00Turm) {
                        horarioSaida = apontamento.horaApon
                    }
                })
            })

            // 86 - ID ENTRADA E SAIDA
            if (subcategoria.categoria.co00Item == 86) {
                return (
                    <TouchableOpacity onPress={() => { this.detalhes(item) }} key={item.gl90Alun.co90Alun}>
                        <View style={styles.botoesLinks}>
                            <Image style={styles.imageIcon} source={item.gl90Alun.sexoAlun == 'F' ? require('../../assets/img/icones/icone_aluna.png') : require('../../assets/img/icones/icone_aluno.png')} />
                            <View style={styles.dadosAluno}>
                                <Text style={[styles.nomeItem, styles.nomeAluno]}>{item.gl90Alun.nomeAlun}</Text>
                            </View>
                            <View style={styles.containerEntradaSaida}>
                                <View style={styles.entradaSaida}>
                                    <Text style={styles.entrada}>Entrada</Text>
                                    <Text style={styles.entrada}>{horarioEntrada}</Text>
                                </View>
                                <View style={styles.entradaSaida}>
                                    <Text style={styles.saida}>Saída</Text>
                                    <Text style={styles.saida}>{horarioSaida}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                if (subcategoria.turma.es00Turm.nomeTurm == item.es00Turm.nomeTurm) {
                    return (
                        // <CustomButtonAluno title={item.gl90Alun.nomeAlun} selected={false} key={item.gl90Alun.co90Alun} item={item} status={status} sexo={item.gl90Alun.sexoAlun} subcategoria={subcategoria} alunos={alunos} />
                        <TouchableOpacity onPress={() => { item.status === false && status === false ? this.detalhes(item) : this.adicionaRemove(item) }} key={item.gl90Alun.co90Alun}>
                            <View style={[styles.botoesLinks, item.status === true ? styles.alunosSelecionados : null]}>
                                <Image style={styles.imageIcon} source={item.gl90Alun.sexoAlun == 'F' ? require('../../assets/img/icones/icone_aluna.png') : require('../../assets/img/icones/icone_aluno.png')} />
                                <View style={styles.dadosAluno}>
                                    <View style={styles.numero}>
                                        <Text style={styles.itemNumero}>
                                            {contador}
                                        </Text>
                                    </View>
                                    <Text numberOfLines={1} style={[styles.nomeItem, styles.nomeAluno]}>{item.gl90Alun.nomeAlun}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            }
        })
    }

    selecionarAlunos = () => {
        this.setState({ showCancel: !this.state.showCancel })
        if (!this.state.showCancel) {
            this.state.alunos.map((aluno) => {
                let newSts = aluno
                newSts.status = true
            })            
            this.setState({ todosAlunos: this.state.alunos })
            console.log(this.state.alunos)
        } else {
            this.setState({ todosAlunos: null })
        }
    }

    lancarVariosAlunos = () => {
        const subcategoria = this.props
        var item = this.state.todosAlunos
        console.log(item)
        subcategoria.categoria.tpapItem == CATEGORIAS.CADMULT ? Actions.LancarMultiplos({ item, subcategoria }) : Actions.LancarAtividadeAluno({ item, subcategoria })
    }

    _renderButton = () => {
        if (this.state.showCancel) {
            return (
                <View style={styles.containerMultiConf}>
                    <TouchableOpacity style={styles.btnMultiConf} onPress={() => { this.lancarVariosAlunos() }}>
                        <Image style={styles.iconSelectMultiConf} source={require('../../assets/img/icones/icone_confirma.png')} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null
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
                    <Text style={styles.breadText}>{params.categoria.nomeItem}</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.turma.es00Turm.nomeTurm}</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={styles.rowContainer}>
                            {this.atividades()}
                        </View>
                    </View>
                </ScrollView>
                {this._renderButton()}
                <TouchableOpacity style={[styles.containerIconSelectMulti, params.categoria.co00Item == CATEGORIAS.CODENSA || params.categoria.co00Item == CATEGORIAS.CODDADOSCRI ? styles.hide : null]} onPress={() => { this.selecionarAlunos() }}>
                    <Image style={styles.iconSelectMulti} source={require('../../assets/img/icones/icone_selecao_multipla.png')} />
                </TouchableOpacity>
            </Fragment>
        )
    }
}

export { ListaAlunos }