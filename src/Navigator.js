import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from './screens/Login'
import Home from './screens/Home'
import DetalhesAtividades from './screens/DetalhesAtividades'
import ListaTurmas from './screens/ListaTurmas'
import ListaAlunos from './screens/ListaAlunos'
import LancarAtividadeAluno from './screens/LancarAtividadeAluno'
import LancarAtividadeAlunoSegundoNivel from './screens/LancarAtividadeAlunoSegundoNivel'
import DadosAluno from './screens/DadosAluno'

// ROTA DE NAVEGAÇÃO PARA CASO NÃO TENHA O TOKEN SALVO

export const SignedOutRoutes = createSwitchNavigator({
    Login: {
        name: 'Login',
        screen: Login,
        navigationOptions: {
            header: null            
        },
    },
});

// ROTA DE NAVEGAÇÃO PARA O TOKEN SALVO

export const SignedInRoutes = createStackNavigator({
    Logged: {
        name: 'Home',
        screen: Home,
        navigationOptions: {
            header: null            
        },
    },
    DetalhesAtividades: {
        name: 'Detalhes Atividades',
        screen: DetalhesAtividades,
        navigationOptions: {
            header: null
        }
    },
    ListaTurmas: {
        name: 'Lista Turmas',
        screen: ListaTurmas,
        navigationOptions: {
            header: null
        }
    },
    ListaAlunos: {
        name: 'Lista Alunos',
        screen: ListaAlunos,
        navigationOptions: {
            header: null
        }
    },
    LancarAtividadeAluno: {
        name: 'Lançar Atividade Para Aluno',
        screen: LancarAtividadeAluno,
        navigationOptions: {
            header: null
        }
    },
    LancarAtividadeAlunoSegundoNivel: {
        name: 'Lançar Atividade Aluno Segundo Nivel',
        screen: LancarAtividadeAlunoSegundoNivel,
        navigationOptions: {
            header: null
        }
    },
    DadosAluno: {
        name: 'Dados do aluno',
        screen: DadosAluno,
        navigationOptions: {
            header: null
        }
    }
});

/* Cria o container raiz de navegação e verifica se possui token, 
caso sim vai para tela inicial, caso não, vai para tela de login */

export const createRootNavigator = (signedIn = false) => {
    return createStackNavigator({
        SignedIn: { screen: SignedInRoutes },
        SignedOut: { screen: SignedOutRoutes }
    },
        {
            headerMode: "none",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut",
            tabBarOptions: {
                showLabel: false
            },
            navigationOptions: {
                gesturesEnabled: true
            }
        });
};