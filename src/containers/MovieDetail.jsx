import React, { Component } from 'react'
import { Grid, Row, Col} from 'react-bootstrap/lib'
import { MovieInfo, Poster } from 'components'
import { connect } from 'react-redux'
import { fetchMovieDetail } from 'actions'
import { localStorage } from 'lib'

class MovieDetail extends Component {

  state = { favorite: false }
  componentDidMount() {
    const {dispatch} = this.props
    const { id } = this.props.params
    dispatch(fetchMovieDetail(id))
    this.setState({favorite: this.isMovieFavorite(id)})
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props
    if(nextProps.params.id && this.props.params.id !== nextProps.params.id) {
      dispatch(fetchMovieDetail(nextProps.params.id))
    }
  }

  isMovieFavorite(id) {
    const favorites = localStorage.get('favorites') || []
    // eslint-disable-next-line
    return favorites.filter(favorite => favorite.id === parseInt(id)).length
  }

  addFavouriteMovie = () => {
    const { movie: { id, title } } = this.props
    if(!this.isMovieFavorite()) {
      localStorage.set('favorites', [ ...localStorage.get('favorites') || [], { id, title }])
      this.setState({ favorite: true })
    }
  }

  render() {
    const {movie, isFetcing_movie} = this.props
    const { favorite } = this.state
    if(isFetcing_movie) {
      return <p>loading...</p>
    }
    if(movie.hasOwnProperty('id')) {
      return(
        <div className='topPadding'>
          <Grid fluid={false}>
            <Row>
              <Col xs={12} sm={6} md={4}>
                <Poster id={movie.id} path={movie.poster_path} responsive />
              </Col>
              <Col xs={12} sm={6} md={8}>
                <MovieInfo
                  movie={movie}
                  addFavouriteMovie={this.addFavouriteMovie}
                  favorite={favorite}/>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else
      return null
  }
}

function mapStateToProps(state) {
  const { movieDetail } = state
  const { isFetcing_movie, item: movie, error_movie } = movieDetail

  return { isFetcing_movie, movie, error_movie }
}

export default connect(mapStateToProps)(MovieDetail)
