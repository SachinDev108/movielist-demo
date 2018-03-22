import React from 'react'
import { Icon } from 'react-fa'

export default function SubTitleWithIcon(props) {
  return (
    <h4><Icon name={props.icon}/> {props.title}</h4>
  )
}
