import React from 'react';

const Summary = ( {points} ) => {

    return (
        <div className='summary'>
            <ul>
                {points.map((point, i) => <li key={i}>{point['point']}</li>)}
            </ul>
        </div>
    )
}

export default Summary