import React, { PureComponent, Fragment } from 'react'
import { View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Padrao from '../services/padroes'

export default class LancarAtividade extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            fadeValue: 1,
            dataAcesso: ''
        }
    }

    componentWillUnmount() {
        this._willMount = false
        Actions.refresh('root')
    }

    componentWillMount() {
        const params = this.props.subcategoria.categoria
        const aluno = this.props.item
        const turma = this.props.subcategoria.turma
        const paramsNv1 = this.props.subcategoria.categoria

        // console.log("params")
        // console.log(this.props)
        // console.log("aluno")
        // console.log(aluno)
        // console.log("turma")
        // console.log(turma)
        // console.log("paramsNv1")
        // console.log(paramsNv1)

        this._willMount = true
        AsyncStorage.getItem('todosItens')
            .then((response) => {
                if (this._willMount === true) {
                    this.setState({ opcoes: JSON.parse(response) });
                    this.setState({ fadeValue: 0 })
                }

                AsyncStorage.getItem('lancamentos')
                    .then((lancamentos) => {
                        AsyncStorage.getItem('lancamentosSincronizados')
                            .then((lancamentosSincronizados) => {
                                AsyncStorage.getItem('dataAcesso')
                                    .then((dataAcesso) => {
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
        const params = this.props.subcategoria.categoria
        const aluno = this.props.item
        const turma = this.props.subcategoria.turma
        const paramsNv1 = this.props.subcategoria.categoria

        // console.log(aluno.length)

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
            Actions.LancarAtividadeAlunoSegundoNivel({ item, params, aluno, turma, paramsNv1 });
        }

        lancarAtividade = (item) => {

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
                                        co00Item: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? params.co00Item : item.co00Item,
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
                                        acesResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? acesResp : null,
                                        co90Resp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? co90Resp : 0,
                                        retiResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? retiResp : null
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
                            alert('teste')
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
                                                        co00Item: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? params.co00Item : item.co00Item,
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
                                                        acesResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? acesResp : null,
                                                        co90Resp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? co90Resp : 0,
                                                        retiResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? retiResp : null
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
                                        co00Item: paramsNv1.gl90Prog.idenProg == CATEGORIAS.TPALIM ? params.co00Item : item.co00Item,
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
                                        acesResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? acesResp : null,
                                        co90Resp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? co90Resp : 0,
                                        retiResp: params.co00Item == CATEGORIAS.CODENT || params.co00Item == CATEGORIAS.CODSAI ? retiResp : null
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

            Actions.pop({ refresh: { key: Actions.currentScene } })
            var categoria = params
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

        return this.state.opcoes.map(function (item) {
            if (item.gl90Prog.idenProg != CATEGORIAS.TPALIM) {
                // 52 - ID MAMADA | 86 - ID ENTRADA E SAIDA | 188 - ID FRUTAS | 32 - ID TROCA
                if (params.co00Item == CATEGORIAS.CODMAMADA || params.co00Item == CATEGORIAS.CODENSA || params.co00Item == CATEGORIAS.CODFRUTAS || (params.co00Item == CATEGORIAS.CODXIXI && item.co00Item == CATEGORIAS.CODFEZES)) {
                    if (item.niveItem == 2 && item.paiItem == params.co00Item) {
                        return (
                            <TouchableOpacity onPress={() => { this.detalhes(item, params) }} key={item.co00Item}>
                                <View style={styles.botoesLinks}>
                                    <Image style={styles.imageIcon} source={{ uri: `http://45.55.32.222/Escola${item.gl90Icon.linkIcon}` }} />
                                    <Text style={styles.nomeItem}>{item.titiItem}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }
                if (item.niveItem == 2 && item.paiItem == params.co00Item) {
                    return (
                        <TouchableOpacity onPress={() => { item.compItem == false ? this.lancarAtividade(item) : this.lancarAtividadeComplemento(item) }} key={item.co00Item}>
                            <View style={[styles.botoesLinks, params.gl90Prog.idenProg == CATEGORIAS.TPMATE ? styles.botoesNoImg : null]}>
                                <Image style={[styles.iconComplemento, item.compItem == false ? styles.hide : styles.iconComplemento]} source={require('../../assets/img/icones/icone_medicamento_proximo.png')} />
                                <Image style={[styles.imageIcon, params.gl90Prog.idenProg == CATEGORIAS.TPMATE ? styles.hideIMG : null]} source={{ uri: `${apiURL}${item.gl90Icon.linkIcon}` }} />
                                <Text style={styles.nomeItem}>{item.titiItem}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            } else {
                if (item.niveItem == 3 && item.paiItem == params.co00Item) {
                    return (
                        <TouchableOpacity onPress={() => { item.compItem == false ? this.lancarAtividade(item) : this.lancarAtividadeComplemento(item) }} key={item.co00Item}>
                            <View style={styles.botoesLinks}>
                                <Image style={[styles.iconComplemento, item.compItem == false ? styles.hide : styles.iconComplemento]} source={require('../../assets/img/icones/icone_medicamento_proximo.png')} />
                                <Image style={styles.imageIcon} source={{ uri: `${apiURL}${item.gl90Icon.linkIcon}` }} />
                                <Text style={styles.nomeItem}>{item.titiItem}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            }
        })
    }

    render() {
        const params = this.props.subcategoria.categoria
        const turma = this.props.subcategoria.turma
        const aluno = this.props.item
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
                    {/* <Text style={styles.breadText}>{aluno.length > 1 ? 'Vários Alunos' : aluno.gl90Alun.nomeAlun}</Text> */}
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

export { LancarAtividade }