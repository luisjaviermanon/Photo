/**
 * @fileoverview Componente funcional que representa un botón circular personalizable.
 * @module Button
 */

import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {IButton} from '../../types/models';
import colors from '../../themes/colors';

/**
 * Propiedades del componente Button.
 * @typedef {object} ButtonProps
 * @property {() => void} onPress - Función que se ejecuta cuando se presiona el botón.
 */

/**
 * Componente funcional que representa un botón circular personalizable.
 * @function
 * @param {ButtonProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento de React que representa el botón.
 */
const Button: React.FC<IButton> = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.circleContainer}>
        <View style={styles.circleInner}>
          <View style={styles.circle} />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  circle: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 35,
    backgroundColor: colors.while,
    justifyContent: 'center',
  },
  circleContainer: {
    borderWidth: 5,
    borderColor: colors.while,
    borderRadius: 65,
  },
  circleInner: {
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: colors.transparent,
  },
});
export default Button;
