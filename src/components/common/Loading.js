import React, { Component } from 'react';
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  View,
  Text
} from 'react-native';

class Loading extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <View style={this.props.fadeValue != 0 ? styles.container : styles.hide}>
        <Animated.Image style={[styles.animationView]} source={require("../../../assets/img/logo.png")}>
        </Animated.Image>
        <ActivityIndicator style={styles.indicator} size="large" color="white"></ActivityIndicator>
        <Text style={styles.white}>Sincronizando dados ...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23c4c6',
        zIndex: 1,
        position: 'relative'
    },
    animationView: {
        width: 244,
        height: 97,
    },
    indicator: {
        marginTop: 40,
        marginBottom: 20
    },
    hide: {
        width: 0,
        height: 0
    },
    white: {
        color: '#FFFFFF',
        fontSize: 20
    }
});

export default Loading
