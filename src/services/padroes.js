import React, { PureComponent, Fragment } from 'react'
import { AsyncStorage, NetInfo, Dimensions } from 'react-native'

global.CATEGORIAS = {
    CADMULT: 'MULP',
    TPALIM: 'ALIM',
    TPMATE: 'MATE',
    CODMEDI: 146,
    CODENSA: 86,
    CODDADOSCRI: 147,
    CODXIXI: 32,
    CODFEZES: 33,
    CODLEITE: 53,
    CODCHA: 56,
    CODSUCO: 59,
    APONTENT: 38, 
    APONTSAI: 39,
    CODENT: 87,
    CODSAI: 88,
    CODMAMADA: 52,
    CODFRUTAS: 188,
    CODALBUM: 153
}
// global.apiURL = 'http://45.55.32.222/Escola'
global.apiURL = 'http://smartsistemasinteligentes.com.br/smart'
global.apiMEDICAMENTOS = 'http://smartsistemasinteligentes.com.br/smart/app/medicamentos/listapendencias112'
global.versao = '1.0.1'
global.alimentacao = 0
global.soninho = 0
global.alimentacao = 0
global.artesMarciais = 0
global.numAtividades = 0
global.avaliacao = 0
global.banho = 0
global.entradaSaida = 0
global.esportes = 0
global.frutas = 0
global.horario = 0
global.linguas = 0
global.mamada = 0
global.material = 0
global.materias = 0
global.sintomas = 0
global.soninho = 0
global.tarefas = 0
global.troca = 0
global.toChegando = 0
global.STATUS_APLICACAO_MEDICAMENTO_PENDENTE = 'PEND'
global.STATUS_APLICACAO_MEDICAMENTO_APLICADO = 'APLI'
global.STATUS_APLICACAO_MEDICAMENTO_CANCELADO = 'CANC'

//CALCULA A QUANTIDADE DE LANÇAMENTOS POR CATEGORIA
AsyncStorage.getItem('lancamentos')
    .then((lancamentos) => {
        const arrayOriginal = JSON.parse(lancamentos)
        arrayOriginal[0].arrayEs00Apon.map((categoria) => {
            if (categoria.firstLevelItemCode == 1) {
                alimentacao = alimentacao + 1
            } else {
                if (categoria.firstLevelItemCode == 22) {
                    soninho = soninho + 1
                } else {
                    if (categoria.firstLevelItemCode == 32) {
                        troca = troca + 1
                    } else {
                        if (categoria.firstLevelItemCode == 52) {
                            mamada = mamada + 1
                        } else {
                            if (categoria.firstLevelItemCode == 62) {
                                material = material + 1
                            } else {
                                if (categoria.firstLevelItemCode == 146) {
                                    material = material + 1
                                } else {
                                    if (categoria.firstLevelItemCode == 89) {
                                        banho = banho + 1
                                    } else {
                                        if (categoria.firstLevelItemCode == 86) {
                                            entradaSaida = entradaSaida + 1
                                        } else {
                                            if (categoria.firstLevelItemCode == 194) {
                                                toChegando = toChegando + 1
                                            } else {
                                                if (categoria.firstLevelItemCode == 188) {
                                                    frutas = frutas + 1
                                                } else {
                                                    if (categoria.firstLevelItemCode == 200) {
                                                        tarefas = tarefas + 1
                                                    } else {
                                                        if (categoria.firstLevelItemCode == 187) {
                                                            numAtividades = numAtividades + 1
                                                        } else {
                                                            if (categoria.firstLevelItemCode == 94) {
                                                                sintomas = sintomas + 1
                                                            } else {
                                                                if (categoria.firstLevelItemCode == 149) {
                                                                    linguas = linguas + 1
                                                                } else {
                                                                    if (categoria.firstLevelItemCode == 176) {
                                                                        materias = materias + 1
                                                                    } else {
                                                                        if (categoria.firstLevelItemCode == 170) {
                                                                            artesMarciais = artesMarciais + 1
                                                                        } else {
                                                                            if (categoria.firstLevelItemCode == 163) {
                                                                                esportes = esportes + 1
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    })

//DIMENSÕES DO DISPOSITIVO LOGADO
const largura = Dimensions.get('window').width
const altura = Dimensions.get('window').height
global.dimensoes = largura + " x " + altura

//ÚLTIMA SINCRONIZAÇÃO
AsyncStorage.getItem('lancamentosSincronizados')
.then((lancamentosSinc) => {
    if(lancamentosSinc == null) {
        global.ultimaSinc = 'Nenhuma sincronização realizada hoje.'
    } else {
        global.ultimaSinc = 'Nenhuma sincronização realizada hoje.'
        console.log(JSON.parse(lancamentosSinc))
    }
})
