import React, { PureComponent, Fragment } from 'react'
import { View, Text, Image, AsyncStorage, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import styles from '../style/Padrao'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import Padrao from '../services/padroes'
import { CustomButton } from '../components/CustomButtom'

export default class LancarMultiplos extends PureComponent {
    _willMount = false

    constructor(props) {
        super(props);
        this.state = {
            tokeTabl: '',
            macTabl: '',
            opcoes: [],
            fadeValue: 1,
            dataAcesso: '',
            todosMateriais: [],
            lancateste: []
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

        this._willMount = true
        AsyncStorage.removeItem('todosMateriais')
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

        // console.log("params")
        // console.log(params)
        // console.log("aluno")
        // console.log(aluno)
        // console.log("turma")
        // console.log(turma)
        // console.log("paramsNv1")
        // console.log(paramsNv1)

        adicionarRemoverItem = (item) => {
            // var itemNovo = {
            //     alimItem: item.alimItem,
            //     ativItem: item.ativItem,
            //     co00Item: item.co00Item,
            //     compItem: item.compItem,
            //     entiItem: item.entiItem,
            //     exapItem: item.exapItem,
            //     finaItem: item.finaItem,
            //     paiItem: item.paiItem,
            //     horario: Moment().format('YYYYMMDDHHmmss')
            // }
            item.horario = Moment().format('YYYYMMDDHHmmss')
            var array = this.state.todosMateriais
            var index = array.indexOf(item)
            if (index !== -1) {
                array.splice(index, 1)
                let newSts = item
                newSts.status = false
                this.setState({ todosMateriais: array })
            } else {
                array.push(item)
                let newSts = item
                newSts.status = true
                this.setState({ todosMateriais: array })
            }
            AsyncStorage.setItem('todosMateriais', JSON.stringify(this.state.todosMateriais))
            console.log(this.state.todosMateriais)
            // console.log(item)
        }

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

        return this.state.opcoes.map(function (item) {
            if (item.gl90Prog.idenProg != CATEGORIAS.TPALIM) {
                if (item.niveItem == 2 && item.paiItem == params.co00Item) {
                    console.log(item)
                    return (
                        // <CustomButton title={item.titiItem} selected={false} key={item.co00Item} item={item} />
                        // {/* // <TouchableOpacity onPress={( => { item.compItem == false ? this.lancarAtividade(item) : this.lancarAtividadeComplemento(item) }} key={item.co00Item}> */}
                        <TouchableOpacity onPress={() => { this.adicionarRemoverItem(item) }} key={item.co00Item}>
                            <View style={[styles.botoesLinks, styles.botoesNoImg, item.status === true ? styles.alunosSelecionados : null]}>
                                <Text style={styles.nomeItem}>{item.titiItem}</Text>
                            </View>
                        </TouchableOpacity>

                    )
                }
            }
        })
    }

    lancarAtividade = (item) => {
        const params = this.props.subcategoria.categoria
        const aluno = this.props.item
        const turma = this.props.subcategoria.turma
        const paramsNv1 = this.props.subcategoria.categoria

        // AsyncStorage.removeItem('lancamentos')
        // AsyncStorage.removeItem('lancamentosSincronizados')
        AsyncStorage.getItem('todosMateriais')
            .then((todosMateriais) => {
                AsyncStorage.getItem('lancamentos')
                    .then((lancamentos) => {
                        //PEGA O ARRAY COMPLETO
                        const novosLancamentos = []
                        if (aluno.length > 1) {
                            aluno.map((aluno) => {
                                const materiais = JSON.parse(todosMateriais)
                                // console.log(materiais)
                                materiais.map((itemMaterial) => {
                                    const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + itemMaterial.horario
                                    const novoLancamento = JSON.stringify(
                                        {
                                            acao: 'I',
                                            compApon: '',
                                            cotbApon: cotbApon,
                                            dataApon: Moment().format('YYYY-MM-DD'),
                                            es00Item: {
                                                ativItem: params.ativItem,
                                                co00Item: itemMaterial.co00Item,
                                                compItem: params.compItem,
                                                entiItem: params.entiItem
                                            },
                                            es00Turm: {
                                                ano_Turm: aluno.es00Turm.ano_Turm,
                                                ativTurm: aluno.es00Turm.ativTurm,
                                                co00Turm: aluno.es00Turm.co00Turm
                                            },
                                            firstLevelItemCode: params.co00Item,
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
                                            horaApon: Moment().format('HH:mm'),
                                            periodId: aluno.es00Peri.co00Peri,
                                            processado: 'N',
                                            valoApon: 0
                                        }
                                    )
                                    novosLancamentos.push(JSON.parse(novoLancamento))
                                })
                            })
                            this.setState({ lancateste: novosLancamentos })
                            if (lancamentos != null) {
                                const convertArrayOriginal = JSON.parse(lancamentos)
                                const lancamentosExistentesMaterial = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon)

                                // console.log(`lancamentosExistentesMaterial`)
                                // console.log(JSON.parse(lancamentosExistentesMaterial))
                                // console.log(`novoslancamentos`)
                                // console.log(novosLancamentos)
                                // console.log(`os dois`)
                                // console.log(JSON.parse(lancamentosExistentesMaterial).concat(novosLancamentos))
                                const uniao = JSON.parse(lancamentosExistentesMaterial).concat(this.state.lancateste)
                                this.setState({ lancamentosExistentesMaterial: uniao })
                            }
                            AsyncStorage.setItem('lancamentos',
                                JSON.stringify(
                                    [
                                        {
                                            arrayEs00Apon:
                                                lancamentos == null ? this.state.lancateste : this.state.lancamentosExistentesMaterial
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
                            const materiais = JSON.parse(todosMateriais)
                            // console.log(materiais)
                            materiais.map((itemMaterial) => {
                                const cotbApon = aluno.gl90Alun.co90Alun.pad(8) + params.gl90Prog.co90Prog.rpad(4) + params.co00Item.pad(5) + itemMaterial.horario
                                const novoLancamento = JSON.stringify(
                                    {
                                        acao: 'I',
                                        compApon: '',
                                        cotbApon: cotbApon,
                                        dataApon: Moment().format('YYYY-MM-DD'),
                                        es00Item: {
                                            ativItem: params.ativItem,
                                            co00Item: itemMaterial.co00Item,
                                            compItem: params.compItem,
                                            entiItem: params.entiItem
                                        },
                                        es00Turm: {
                                            ano_Turm: aluno.es00Turm.ano_Turm,
                                            ativTurm: aluno.es00Turm.ativTurm,
                                            co00Turm: aluno.es00Turm.co00Turm
                                        },
                                        firstLevelItemCode: params.co00Item,
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
                                        horaApon: Moment().format('HH:mm'),
                                        periodId: aluno.es00Peri.co00Peri,
                                        processado: 'N',
                                        valoApon: 0
                                    }
                                )
                                novosLancamentos.push(JSON.parse(novoLancamento))
                            })
                            this.setState({ lancateste: novosLancamentos })
                            if (lancamentos != null) {
                                const convertArrayOriginal = JSON.parse(lancamentos)
                                const lancamentosExistentesMaterial = JSON.stringify(convertArrayOriginal[0].arrayEs00Apon)

                                // console.log(`lancamentosExistentesMaterial`)
                                // console.log(JSON.parse(lancamentosExistentesMaterial))
                                // console.log(`novoslancamentos`)
                                // console.log(novosLancamentos)
                                // console.log(`os dois`)
                                // console.log(JSON.parse(lancamentosExistentesMaterial).concat(novosLancamentos))
                                const uniao = JSON.parse(lancamentosExistentesMaterial).concat(this.state.lancateste)
                                this.setState({ lancamentosExistentesMaterial: uniao })
                            }
                            AsyncStorage.setItem('lancamentos',
                                JSON.stringify(
                                    [
                                        {
                                            arrayEs00Apon:
                                                lancamentos == null ? this.state.lancateste : this.state.lancamentosExistentesMaterial
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
            })
        // Actions.pop({ refresh: { key: Actions.currentScene } })
        // var categoria = params
        // if (params.gl90Prog.idenProg === CATEGORIAS.TPALIM) {
        //     Actions.popTo('ListaTurmas')
        //     Actions.push('ListaAlunos', { categoria, turma })
        // } else {
        //     Actions.popTo('DetalhesAtividades')
        //     Actions.push('ListaAlunos', { categoria, turma })
        // }
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
                    <Text style={styles.breadText}>{aluno.length > 1 ? 'Vários Alunos' : aluno.gl90Alun.nomeAlun}</Text>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={styles.rowContainer}>
                            {this.atividades()}
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.containerIconSelectMulti]} onPress={() => { this.lancarAtividade() }}>
                    <Image style={styles.iconSelectMulti} source={require('../../assets/img/icones/icone_confirma.png')} />
                </TouchableOpacity>
            </Fragment>
        )
    }
}

export { LancarMultiplos }