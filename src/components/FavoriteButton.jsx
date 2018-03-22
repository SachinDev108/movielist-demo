import React from 'react'
import { Icon } from 'react-fa'
import { Button } from 'react-bootstrap'

const FavouriteButton = props => (
  <Button
  	bsStyle='success'
  	bsSize='small'
  	onClick={props.addFavouriteMovie}>
    <Icon name='heart' /> Favorite
  </Button>
)

export default FavouriteButton