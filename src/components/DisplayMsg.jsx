import React from 'react'

const DisplayMsg = props => props.hasOwnProperty('message') ? <div>{props.message}</div> : <div>Not Found</div>

export default DisplayMsg