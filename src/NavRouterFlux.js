import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux'
import Login from './screens/Login'
import Home from './screens/Home'
import ListaTurmas from './screens/ListaTurmas'
import ListaAlunos from './screens/ListaAlunos'
import DetalhesAtividades from './screens/DetalhesAtividades'
import LancarAtividadeAluno from './screens/LancarAtividadeAluno'
import LancarMultiplos from './screens/LancarMultiplos'
import LancarAtividadeAlunoComplemento from './screens/LancarAtividadeAlunoComplemento'
import LancarAtividadeAlunoSegundoNivel from './screens/LancarAtividadeAlunoSegundoNivel'
import DadosAluno from './screens/DadosAluno'
import Sincronizacao from './screens/Sincronizacao'
import Medicamentos from './screens/Medicamentos'
import AlbumFotos from './screens/GaleriaImagens/AlbumFotos'


//Recebe o valor signed pelas propriedades no index.js e 
// usa esse valor para determinar qual será a página inicial 
export const NavRouterFlux = (props) => {
    const signed = props.sign
    return (
        <Router>
            <Stack key="root">
                <Scene initial={!signed} key="Login"
                    component={Login}
                    title="Login"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="Sincronizacao"
                    component={Sincronizacao}
                    title="Sincronizacao"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="Home"
                    component={Home}
                    title="Home"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="DetalhesAtividades"
                    component={DetalhesAtividades}
                    title="Detalhes Atividades"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="ListaTurmas"
                    component={ListaTurmas}
                    title="Lista Turmas"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="ListaAlunos"
                    component={ListaAlunos}
                    title="Lista Alunos"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="LancarAtividadeAluno"
                    component={LancarAtividadeAluno}
                    title="Lançar Atividade Para Aluno"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="LancarAtividadeAlunoSegundoNivel"
                    component={LancarAtividadeAlunoSegundoNivel}
                    title="Lançar Atividade Aluno Segundo Nivel"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="LancarAtividadeAlunoComplemento"
                    component={LancarAtividadeAlunoComplemento}
                    title="Lançar Atividade Aluno Complemento"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="LancarMultiplos"
                    component={LancarMultiplos}
                    title="Lançar Material Aluno"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="DadosAluno"
                    component={DadosAluno}
                    title="Dados do aluno"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene key="Medicamentos"
                    component={Medicamentos}
                    title="Medicamentos"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
                <Scene initial={signed} key="AlbumFotos"
                    component={AlbumFotos}
                    title="AlbumFotos"
                    hideNavBar
                    drawerLockMode='locked-closed' gesturesEnabled={false} />
            </Stack>
        </Router>
    )
}
