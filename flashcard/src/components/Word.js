import React from 'react';
import '../App.css';

const Word = ( {word, defin, note} ) => {

    return (
        <div className='word'>
            <div className='left_word'>
                {word}
            </div>
            <div className='right_word'>
                <div className='small_section'>{defin}</div>
                <div className='small_section'>{note}</div>
            </div>
        </div>
    )
}

export default Word