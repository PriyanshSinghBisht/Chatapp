import { memo} from 'react';
import {useState} from 'react';

const Button = ({increase})=>{
  console.log('button rendered');
  return(
      <button onClick={increase}>
        click
      </button>
  )
}

export default memo(Button);