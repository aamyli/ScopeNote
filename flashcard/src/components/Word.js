import React from 'react';
import '../App.css';

const Word = ( {word, defin, note} ) => {

    return (
        <div className='word'>
            <div className='left_word'>
                <p>{word}</p>
            </div>
            <div className='right_word'>
                <div className='small_section'><p style={{margin:0}}>{defin}</p></div>
                <div className='small_section'><p style={{margin:0}}>{note}</p></div>
            </div>
        </div>
    )
}

export default Word