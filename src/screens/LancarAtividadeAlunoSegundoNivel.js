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

export default class LancarAtividadeAlunoSegundoNivel extends PureComponent {

    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            responsaveis: [],
            fadeValue: 1,
            dataAcesso: ''
        }
    }

    componentWillUnmount() {
        Actions.refresh('root')
        this._willMount = false
    }

    componentWillMount() {
        this._willMount = true
        const params = this.props.navigation.state.params
        // console.log(params)
        if (params.co00Item != CATEGORIAS.CODENT) {
            AsyncStorage.getItem('todosItens')
                .then((response) => {
                    if (this._willMount === true) {
                        this.setState({ opcoes: JSON.parse(response) })
                        this.setState({ fadeValue: 0 })
                    }

                    AsyncStorage.getItem('lancamentos')
                        .then((lancamentos) => {
                            AsyncStorage.getItem('lancamentosSincronizados')
                                .then((lancamentosSincronizados) => {
                                    AsyncStorage.getItem('dataAcesso')
                                        .then((dataAcesso) => {
                                            AsyncStorage.getItem('responsaveis')
                                                .then((responsaveis) => {
                                                    AsyncStorage.getItem('token')
                                                        .then((res_token) => {
                                                            //PEGA O MAC DO PC SALVO NA REQUISIÇÃO DE LOGIN
                                                            AsyncStorage.getItem('macTabl')
                                                                .then((res_mac) => {
                                                                    if (this._willMount === true) {
                                                                        this.setState({ tokeTabl: res_token })
                                                                        this.setState({ macTabl: res_mac })
                                                                    }
                                                                })
                                                        })
                                                    this.setState({ responsaveis: JSON.parse(responsaveis) })
                                                    console.log(JSON.parse(lancamentos))
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
                        })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    //requisição que mostra todas as atividades do nivel 1
    atividades() {
        const params = this.props.item
        const aluno = this.props.aluno
        const turma = this.props.turma
        const paramsNv1 = this.props.paramsNv1

        // console.log("params")
        // console.log(params)
        // console.log("aluno")
        // console.log(aluno)
        // console.log("turma")
        // console.log(turma)
        // console.log("paramsNv1")
        // console.log(paramsNv1)

        Number.prototype.pad = function (size) {
            var s = String(this);
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
        }

        Number.prototype.rpad = function (size) {
            var s = String(this);
            while (s.length < (size || 2)) { s = s + "0"; }
            return s;
        }

        //envia o usuario para os detalhes da atividade selecionada
        detalhes = (item) => {
            alert('Lançar item!')
        }

        lancarAtividade = (item) => {
            // AsyncStorage.removeItem('lancamentos')
            // const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + Moment().format('YYYYMMDDHHmmss')
            this.state.responsaveis.map((responsavel) => {
                if (aluno.length > 1) {
                    aluno.map((aluno) => {
                        if (responsavel.gl90Alun.co90Alun == aluno.gl90Alun.co90Alun) {
                            this.setState({ acesResp: responsavel.acesResp })
                            this.setState({ co90Resp: responsavel.co90Resp })
                            this.setState({ retiResp: responsavel.retiResp })
                        }
                    })
                } else {
                    if (responsavel.gl90Alun.co90Alun == aluno.gl90Alun.co90Alun) {
                        this.setState({ acesResp: responsavel.acesResp })
                        this.setState({ co90Resp: responsavel.co90Resp })
                        this.setState({ retiResp: responsavel.retiResp })
                    }
                }
            })
            AsyncStorage.getItem('lancamentos')
                .then((lancamentos) => {
                    //PEGA O ARRAY COMPLETO
                    const novosLancamentos = []
                    if (aluno.length > 1) {
                        aluno.map((aluno) => {
                            const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + Moment().format('YYYYMMDDHHmmss')
                            const novoLancamento = JSON.stringify(
                                {
                                    acao: 'I',
                                    compApon: '',
                                    cotbApon: cotbApon,
                                    dataApon: Moment().format('YYYY-MM-DD'),
                                    es00Item: {
                                        ativItem: params.ativItem,
                                        co00Item: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? params.co00Item : paramsNv1.gl90Prog.idenProg == 'ENSA' ? params.co00Item : item.co00Item,
                                        compItem: params.compItem,
                                        entiItem: params.entiItem
                                    },
                                    es00Turm: {
                                        ano_Turm: aluno.es00Turm.ano_Turm,
                                        ativTurm: aluno.es00Turm.ativTurm,
                                        co00Turm: aluno.es00Turm.co00Turm
                                    },
                                    firstLevelItemCode: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? paramsNv1.paiItem : paramsNv1.co00Item,
                                    gl90Alun: {
                                        co90Alun: aluno.gl90Alun.co90Alun,
                                        co90Usch: aluno.gl90Alun.co90Usch
                                    },
                                    gl90Grit: {
                                        co90Grit: params.gl90Grit.co90Grit
                                    },
                                    gl90Item: {
                                        co90Item: params.gl90Item.co90Item
                                    },
                                    gl90Prog: {
                                        co90Prog: params.gl90Prog.co90Prog
                                    },
                                    gl90Resp: {
                                        acesResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.acesResp : null,
                                        co90Resp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.co90Resp : 0,
                                        retiResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.retiResp : null
                                    },
                                    horaApon: Moment().format('H:mm'),
                                    periodId: aluno.es00Peri.co00Peri,
                                    processado: 'N',
                                    valoApon: 0
                                }
                            )
                            novosLancamentos.push(JSON.parse(novoLancamento))
                            //GRAVA TODOS OS LANÇAMENTOS NO STORAGE NOVAMENTE    
                        })
                        if (lancamentos != null) {
                            const convertArrayOriginal = JSON.parse(lancamentos)
                            const lancamentosExistentes = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon)
                            this.setState({ lancamentosExistentes: JSON.parse(lancamentosExistentes) })
                        }
                        AsyncStorage.setItem('lancamentos',
                            JSON.stringify(
                                [
                                    {
                                        arrayEs00Apon:
                                            lancamentos == null ? novosLancamentos : novosLancamentos.concat(this.state.lancamentosExistentes)
                                        ,
                                        arrayPendenciaMedicamento: [],
                                        gl90Tabl: {
                                            macTabl: this.state.macTabl,
                                            tokeTabl: this.state.tokeTabl
                                        }
                                    }
                                ]
                            )
                        )
                    } else {
                        if (lancamentos == null) {
                            const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + Moment().format('YYYYMMDDHHmmss')
                            AsyncStorage.setItem('lancamentos',
                                JSON.stringify(
                                    [
                                        {
                                            arrayEs00Apon: [
                                                {
                                                    acao: 'I',
                                                    compApon: '',
                                                    cotbApon: cotbApon,
                                                    dataApon: Moment().format('YYYY-MM-DD'),
                                                    es00Item: {
                                                        ativItem: params.ativItem,
                                                        co00Item: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? params.co00Item : paramsNv1.gl90Prog.idenProg == 'ENSA' ? params.co00Item : item.co00Item,
                                                        compItem: params.compItem,
                                                        entiItem: params.entiItem
                                                    },
                                                    es00Turm: {
                                                        ano_Turm: aluno.es00Turm.ano_Turm,
                                                        ativTurm: aluno.es00Turm.ativTurm,
                                                        co00Turm: aluno.es00Turm.co00Turm
                                                    },
                                                    firstLevelItemCode: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? paramsNv1.paiItem : paramsNv1.co00Item,
                                                    gl90Alun: {
                                                        co90Alun: aluno.gl90Alun.co90Alun,
                                                        co90Usch: aluno.gl90Alun.co90Usch
                                                    },
                                                    gl90Grit: {
                                                        co90Grit: params.gl90Grit.co90Grit
                                                    },
                                                    gl90Item: {
                                                        co90Item: params.gl90Item.co90Item
                                                    },
                                                    gl90Prog: {
                                                        co90Prog: params.gl90Prog.co90Prog
                                                    },
                                                    gl90Resp: {
                                                        acesResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.acesResp : null,
                                                        co90Resp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.co90Resp : 0,
                                                        retiResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.retiResp : null
                                                    },
                                                    horaApon: Moment().format('H:mm'),
                                                    periodId: aluno.es00Peri.co00Peri,
                                                    processado: 'N',
                                                    valoApon: 0
                                                }
                                            ],
                                            arrayPendenciaMedicamento: [],
                                            gl90Tabl: {
                                                macTabl: this.state.macTabl,
                                                tokeTabl: this.state.tokeTabl
                                            }
                                        }
                                    ]
                                )
                            )
                        } else {
                            const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + Moment().format('YYYYMMDDHHmmss')
                            const novoLancamento = JSON.stringify(
                                {
                                    acao: 'I',
                                    compApon: '',
                                    cotbApon: cotbApon,
                                    dataApon: Moment().format('YYYY-MM-DD'),
                                    es00Item: {
                                        ativItem: params.ativItem,
                                        co00Item: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? params.co00Item : paramsNv1.gl90Prog.idenProg == 'ENSA' ? params.co00Item : item.co00Item,
                                        compItem: params.compItem,
                                        entiItem: params.entiItem
                                    },
                                    es00Turm: {
                                        ano_Turm: aluno.es00Turm.ano_Turm,
                                        ativTurm: aluno.es00Turm.ativTurm,
                                        co00Turm: aluno.es00Turm.co00Turm
                                    },
                                    firstLevelItemCode: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? paramsNv1.paiItem : paramsNv1.co00Item,
                                    gl90Alun: {
                                        co90Alun: aluno.gl90Alun.co90Alun,
                                        co90Usch: aluno.gl90Alun.co90Usch
                                    },
                                    gl90Grit: {
                                        co90Grit: params.gl90Grit.co90Grit
                                    },
                                    gl90Item: {
                                        co90Item: params.gl90Item.co90Item
                                    },
                                    gl90Prog: {
                                        co90Prog: params.gl90Prog.co90Prog
                                    },
                                    gl90Resp: {
                                        acesResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.acesResp : null,
                                        co90Resp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.co90Resp : 0,
                                        retiResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? this.state.retiResp : null
                                    },
                                    horaApon: Moment().format('H:mm'),
                                    periodId: aluno.es00Peri.co00Peri,
                                    processado: 'N',
                                    valoApon: 0
                                }
                            )
                            //PEGA O ARRAY COMPLETO
                            const convertArrayOriginal = JSON.parse(lancamentos)
                            //PEGA SOMENTE O ARRAY DE LANÇAMENTOS
                            const lancamentosExistentes = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon)
                            // const capturaObjetoLancamentos = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon[0])
                            //CONVERTE O ARRAY DE LANÇAMENTOS
                            const novoArray = JSON.parse(lancamentosExistentes)
                            //INSERE O NOVO ITEM NO ARRAY DE LANÇAMENTOS
                            novoArray.push(JSON.parse(novoLancamento))
                            // console.log(teste)
                            //GRAVA TODOS OS LANÇAMENTOS NO STORAGE NOVAMENTE    

                            AsyncStorage.setItem('lancamentos',
                                JSON.stringify(
                                    [
                                        {
                                            arrayEs00Apon:
                                                novoArray
                                            ,
                                            arrayPendenciaMedicamento: [],
                                            gl90Tabl: {
                                                macTabl: this.state.macTabl,
                                                tokeTabl: this.state.tokeTabl
                                            }
                                        }
                                    ]
                                )
                            )
                        }
                    }
                })

            var categoria = paramsNv1
            Actions.pop({ refresh: { key: Actions.currentScene } })
            if (params.gl90Prog.idenProg === CATEGORIAS.TPALIM) {
                Actions.popTo('ListaTurmas')
                Actions.push('ListaAlunos', { categoria, turma })
            } else {
                Actions.popTo('DetalhesAtividades')
                Actions.push('ListaAlunos', { categoria, turma })
            }
        }

        lancarAtividadeComplemento = (item) => {
            Actions.replace('LancarAtividadeAlunoComplemento', { item, params, aluno, turma, paramsNv1 })
        }

        lancaEntradaSaida = (responsavel) => {
            AsyncStorage.getItem('lancamentos')
            const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + Moment().format('YYYYMMDDHHmmss')
            this.state.responsaveis.map((responsavel) => {
                if (responsavel.gl90Alun.co90Alun == aluno.gl90Alun.co90Alun) {
                    this.setState({ acesResp: responsavel.acesResp })
                    this.setState({ co90Resp: responsavel.co90Resp })
                    this.setState({ retiResp: responsavel.retiResp })
                }
            })
                .then((lancamentos) => {
                    if (lancamentos == null) {
                        AsyncStorage.setItem('lancamentos',
                            JSON.stringify(
                                [
                                    {
                                        arrayEs00Apon: [
                                            {
                                                acao: 'I',
                                                compApon: '',
                                                cotbApon: cotbApon,
                                                dataApon: Moment().format('YYYY-MM-DD'),
                                                es00Item: {
                                                    ativItem: params.ativItem,
                                                    co00Item: params.co00Item,
                                                    compItem: params.compItem,
                                                    entiItem: params.entiItem
                                                },
                                                es00Turm: {
                                                    ano_Turm: aluno.es00Turm.ano_Turm,
                                                    ativTurm: aluno.es00Turm.ativTurm,
                                                    co00Turm: aluno.es00Turm.co00Turm
                                                },
                                                firstLevelItemCode: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? paramsNv1.paiItem : paramsNv1.co00Item,
                                                gl90Alun: {
                                                    co90Alun: aluno.gl90Alun.co90Alun,
                                                    co90Usch: aluno.gl90Alun.co90Usch
                                                },
                                                gl90Grit: {
                                                    co90Grit: params.gl90Grit.co90Grit
                                                },
                                                gl90Item: {
                                                    co90Item: params.gl90Item.co90Item
                                                },
                                                gl90Prog: {
                                                    co90Prog: params.gl90Prog.co90Prog
                                                },
                                                gl90Resp: {
                                                    acesResp: this.state.acesResp,
                                                    co90Resp: this.state.co90Resp,
                                                    retiResp: this.state.retiResp
                                                },
                                                horaApon: Moment().format('H:mm'),
                                                periodId: aluno.es00Peri.co00Peri,
                                                processado: 'N',
                                                valoApon: 0
                                            }
                                        ],
                                        arrayPendenciaMedicamento: [],
                                        gl90Tabl: {
                                            macTabl: this.state.macTabl,
                                            tokeTabl: this.state.tokeTabl
                                        }
                                    }
                                ]
                            )
                        )
                    } else {
                        const novoLancamento = JSON.stringify(
                            {
                                acao: 'I',
                                compApon: '',
                                cotbApon: cotbApon,
                                dataApon: Moment().format('YYYY-MM-DD'),
                                es00Item: {
                                    ativItem: params.ativItem,
                                    co00Item: params.co00Item,
                                    compItem: params.compItem,
                                    entiItem: params.entiItem
                                },
                                es00Turm: {
                                    ano_Turm: aluno.es00Turm.ano_Turm,
                                    ativTurm: aluno.es00Turm.ativTurm,
                                    co00Turm: aluno.es00Turm.co00Turm
                                },
                                firstLevelItemCode: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? paramsNv1.paiItem : paramsNv1.co00Item,
                                gl90Alun: {
                                    co90Alun: aluno.gl90Alun.co90Alun,
                                    co90Usch: aluno.gl90Alun.co90Usch
                                },
                                gl90Grit: {
                                    co90Grit: params.gl90Grit.co90Grit
                                },
                                gl90Item: {
                                    co90Item: params.gl90Item.co90Item
                                },
                                gl90Prog: {
                                    co90Prog: params.gl90Prog.co90Prog
                                },
                                gl90Resp: {
                                    acesResp: this.state.acesResp,
                                    co90Resp: this.state.co90Resp,
                                    retiResp: this.state.retiResp
                                },
                                horaApon: Moment().format('H:mm'),
                                periodId: aluno.es00Peri.co00Peri,
                                processado: 'N',
                                valoApon: 0
                            }
                        )
                        //PEGA O ARRAY COMPLETO
                        const convertArrayOriginal = JSON.parse(lancamentos)
                        //PEGA SOMENTE O ARRAY DE LANÇAMENTOS
                        // const capturaObjetoLancamentos = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon[0])
                        const lancamentosExistentes = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon)
                        //CONVERTE O ARRAY DE LANÇAMENTOS
                        const novoArray = JSON.parse(lancamentosExistentes)
                        //INSERE O NOVO ITEM NO ARRAY DE LANÇAMENTOS
                        novoArray.push(JSON.parse(novoLancamento))
                        //GRAVA TODOS OS LANÇAMENTOS NO STORAGE NOVAMENTE
                        AsyncStorage.setItem('lancamentos',
                            JSON.stringify(
                                [
                                    {
                                        arrayEs00Apon:
                                            novoArray
                                        ,
                                        arrayPendenciaMedicamento: [],
                                        gl90Tabl: {
                                            macTabl: this.state.macTabl,
                                            tokeTabl: this.state.tokeTabl
                                        }
                                    }
                                ]
                            )
                        )
                    }
                })
            var categoria = paramsNv1
            if (params.gl90Prog.idenProg === CATEGORIAS.TPALIM) {
                Actions.popTo('ListaTurmas')
                Actions.push('ListaAlunos', { categoria, turma })
            } else {
                Actions.popTo('DetalhesAtividades')
                Actions.push('ListaAlunos', { categoria, turma })
            }
            // alert(responsavel)
        }

        if (params.co00Item != CATEGORIAS.CODENT && params.co00Item != CATEGORIAS.CODSAI) {
            return this.state.opcoes.map(function (item) {
                if (item.niveItem == 3 && item.paiItem == params.co00Item) {
                    return (
                        <TouchableOpacity onPress={() => { item.compItem == false ? this.lancarAtividade(item) : alert('teste') }} key={item.co00Item}>
                            <View style={styles.botoesLinks}>
                                <Image style={[styles.iconComplemento, item.compItem == false ? styles.hide : styles.iconComplemento]} source={require('../../assets/img/icones/icone_medicamento_proximo.png')} />
                                <Image style={styles.imageIcon} source={{ uri: `http://45.55.32.222/Escola${item.gl90Icon.linkIcon}` }} />
                                <Text style={styles.nomeItem}>{item.titiItem}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            })
        } else {
            return (
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => { lancarAtividade(item = 'Não informado') }} key='100'>
                        <View style={styles.botoesLinks}>
                            <Image style={styles.imageIcon} source={require('../../assets/img/icones/icone_responsavel_naoinformado.png')} />
                            <Text style={styles.nomeItem}>Não informado</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { lancarAtividade(item = aluno.gl90Alun.pai_Alun) }} key='101' style={aluno.gl90Alun.pai_Alun == '' ? styles.hide : ''}>
                        <View style={styles.botoesLinks}>
                            <Image style={styles.imageIcon} source={require('../../assets/img/icones/icone_responsavel_pai.png')} />
                            <Text style={styles.nomeItem}>{aluno.gl90Alun.pai_Alun}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { lancarAtividade(item = aluno.gl90Alun.mae_Alun) }} key='102' style={aluno.gl90Alun.mae_Alun == '' ? styles.hide : ''}>
                        <View style={styles.botoesLinks}>
                            <Image style={styles.imageIcon} source={require('../../assets/img/icones/icone_responsavel_mae.png')} />
                            <Text style={styles.nomeItem}>{aluno.gl90Alun.mae_Alun}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const params = this.props.item
        const aluno = this.props.aluno
        const turma = this.props.turma
        return (
            <Fragment>
                <Header />
                <View style={styles.breadcrumb}>
                    <Icon style={styles.breadIcon} name='home' />
                    <Text style={styles.breadText}>Home</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{params.nomeItem}</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{turma.es00Turm.nomeTurm}</Text>
                    <Text>|</Text>
                    <Text style={styles.breadText}>{aluno.length > 1 ? 'Vários Alunos' : aluno.gl90Alun.nomeAlun}</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={params.co00Item != CATEGORIAS.CODENT ? styles.rowContainer : ''}>
                            {this.atividades()}
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}

export { LancarAtividadeAlunoSegundoNivel }