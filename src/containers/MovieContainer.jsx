import React, { Component } from 'react'
import Pagination from "react-js-pagination"
import { MovieList, DisplayMsg } from 'components'
import { connect } from 'react-redux'
import { fetchMovieList, searchMovieList } from 'actions'

class MovieContainer extends Component {

  componentDidMount() {
    if(!this.props.params.keyword) {
      const {dispatch} = this.props
      dispatch(fetchMovieList())
    }
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props
    if(nextProps.params.keyword && this.props.params.keyword !== nextProps.params.keyword) {
      dispatch(searchMovieList(nextProps.params.keyword))
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.movies !== nextProps.movies) {
      return true
    }
    return false
  }

  handlePageChange(page) {
    const {dispatch} = this.props
    page = page > 1000 ? 1000 : page
    dispatch(fetchMovieList(page))
  }

  render() {
    // eslint-disable-next-line
    const {movies, page, totalItems} = this.props
    const maxItems = 20000
    //Because the api is limited to give us results of first 1000 pages
    return(
      movies.length ?
      <div>
        <MovieList movies={movies} />
        <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={maxItems}
          pageRangeDisplayed={10}
          onChange={(e) => this.handlePageChange(e)}
          firstPageText={'First'}
          lastPageText={'Last'}
          prevPageText={'Prev'}
          nextPageText={'Next'}/>
      </div>
      : <DisplayMsg />
    )
  }
}

function mapStateToProps(state, ownProps){
  const { movieList } = state
  const { items: movies, totalPages, page, totalItems } = movieList
  const keyword = ownProps.params.keyword
  return { movies, keyword, page, totalPages, totalItems }
}

export default connect(mapStateToProps)(MovieContainer)
