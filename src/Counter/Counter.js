import React from 'react'
import './Counter.css';
import PropTypes from 'prop-types'

const Counter = ({counter, gameState}) => (
  <div className="count">Point Obtenus: {20-counter}
      <div className="state">
        Le jeu est {gameState}
        </div>
  </div>
)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  gameState: PropTypes.oneOf([
    'en cours',
    'perdu',
    'gagné',
  ]).isRequired,
}

export default Counter
