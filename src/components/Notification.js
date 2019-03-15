import React, { PureComponent } from 'react'
import { AsyncStorage } from 'react-native'
import PushController from '../services/PushController'
import PushNotification from 'react-native-push-notification'
import Moment from 'moment'

export default class Notification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            medicamentos: [],
            alunos: []
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('medicamentos')
            .then((medicamentos) => {
                AsyncStorage.getItem('turmasAlunos')
                    .then((alunos) => {
                        this.setState({ medicamentos: JSON.parse(medicamentos) })
                        this.setState({ alunos: JSON.parse(alunos) })
                    })
            })
    }

    render() {
        setInterval(() => {
            let dataAtual = Moment().format('H:mm')
            this.state.medicamentos.map((medicamento) => {
                this.state.alunos.map((aluno) => {
                    if (dataAtual > medicamento.horaApme) {
                        if (aluno.gl90Alun.co90Alun == medicamento.co90Alun) {
                            PushNotification.localNotification({
                                title: "Medicação Atrasada!",
                                message: `Medicação do(a) aluno(a) ${aluno.gl90Alun.nomeAlun} não foi realizada ainda.`
                            })
                        }
                    }
                })
            })
        }, 300000)
        return (
            <PushController />
        )
    }
}

export { Notification }