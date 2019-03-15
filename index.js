import React, { PureComponent } from 'react'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { isSignedIn } from "./src/services/auth"
import { NavRouterFlux } from './src/NavRouterFlux'

export default class App extends PureComponent {
  state = {
    signed: false,
    signLoaded: false,
  }

  componentWillMount() {
    //remover alertas amarelos
    console.disableYellowBox = true
    isSignedIn()
      .then((res) => {
        this.setState({ signed: res, signLoaded: true })
      })
      .catch(err => alert("Erro"))
  }

  render() {
    const { signLoaded, signed } = this.state

    if (!signLoaded) {
      return null
    }
    return <NavRouterFlux sign={signed} />
  }
}

AppRegistry.registerComponent(appName, () => App)