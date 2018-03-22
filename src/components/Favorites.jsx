import React, { Component } from 'react'
import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap/lib'
import { Icon } from 'react-fa'
import { localStorage } from 'lib'

class Favorites extends Component {
  state = { favorites: []}
  componentDidMount() {
    this.setState({ favorites: localStorage.get('favorites') })
  }

  removeFavorite(id) {
    const favorites = localStorage.get('favorites').filter(favorite => favorite.id !== id)
    localStorage.set('favorites', favorites)
    this.setState({favorites})
  }


  render() {
    const { favorites } = this.state
    return(
      <ListGroup>
        {
          favorites.map(favorite => (
              <ListGroupItem key={favorite.id}>
                <Link to={`/movie/${favorite.id}`}>{favorite.title}</Link>
                <div onClick={() => this.removeFavorite(favorite.id)} style={{float: 'right'}}><Icon name='trash' /></div>
              </ListGroupItem>
            )
          )
        }
      </ListGroup>
    )
  }
}

export default Favorites