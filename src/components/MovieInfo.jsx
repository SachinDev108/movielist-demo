import React from 'react'
import Title from './Title'
import SubTitle from './SubTitle'
import { Icon } from 'react-fa'
import Description from './Description'
import { Row, Col } from 'react-bootstrap'
import { FavoriteButton } from 'components'

const MovieInfo = props => {
  const containerStyle = {
    paddingLeft: '15px'
  }

  const { movie, addFavouriteMovie, favorite } = props
  const { title, release_date, overview } = movie

  return(
    <div style={containerStyle}>
      <Row>
        <div className='movie-title'>
          <Title title={title} style={{width: '80%'}}/>
        </div>
        { !favorite && (
          <div className='favorite-button'>
            <FavoriteButton addFavouriteMovie={addFavouriteMovie}/>
          </div>
        )}
      </Row>
      <Row>
        { favorite ?
          <Col xs={4}>
            <Icon name='heart' size='2x' className='favorite-icon-detail'/>
          </Col> : null
        }
        <Col xs={4}>
          <SubTitle title={release_date.substring(0,4)} />
        </Col>
      </Row>
      <Row>
        <Description category='Overview' description={overview} />
      </Row>
    </div>
  )
}

export default MovieInfo
