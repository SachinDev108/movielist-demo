import React , { Component } from 'react'
import Poster from './Poster'
import {Link} from 'react-router'
import { Grid, Row, Col} from 'react-bootstrap'
import { localStorage } from 'lib'

const style={
  display: 'flex',
  flexWrap: 'wrap',
  padding: '20px'
}

export default class MovieList extends Component{

  getFavorites() {
    return (localStorage.get('favorites') || [] ).map(favorite => favorite.id)
  }

  isMovieFavorite(id){
    return this.getFavorites().includes(id)
  }

  render() {
    const movies = this.props.movies
      .filter(movie => movie.poster_path != null)
      .map(movie => (
        <Col xs={6} sm={4} md={3} key={movie.id}>
          <Link to={'/movie/'+movie.id}>
            <Poster
              info
              favorite={this.isMovieFavorite(movie.id)}
              id={movie.id}
              path={movie.poster_path}
              title={movie.title}
              voteAverage={movie.vote_average}
              release_date={movie.release_date}
              responsive/>
          </Link>
        </Col>
      )
    )
    return(
      <Grid fluid={false}>
        <Row style={style}>
          {movies}
        </Row>
      </Grid>
    )
  }
}
