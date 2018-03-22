import React from 'react'
import { URL_IMG, IMG_SIZE_LARGE } from 'const'
import { Image } from 'react-bootstrap'
import styled from 'styled-components'
import { Icon } from 'react-fa'

export default function Poster(props) {

  const StyledImg = styled.div`
    &:hover .image {
       opacity:1;
    }
    &:hover .title {
       opacity: ${props.info ? 1:0};
    }
    .image {
      width: 100%;
    }
  `
  const Info =  styled.div`
      top: 75%;
      margin:10px;
      font-weight:bold;
  `
  return(
    <StyledImg>
      <Image className="image" key={props.id} src={URL_IMG+IMG_SIZE_LARGE+props.path} responsive />
      {props.info &&
      <Info className="title">
        <div className='movie-name'>
          {props.title} ({props.release_date.substring(0,4)})
        </div>
        <div className='movie-ratings'>
          <Icon name={'star'} /> {~~props.voteAverage}
          { props.favorite ?
            <span className='favorite'>
              <Icon name={'heart'} className='favorite-icon'/>
            </span>
            : null
          }
        </div>  
      </Info>
      }
    </StyledImg>
  )
}
