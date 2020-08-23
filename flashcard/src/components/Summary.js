import React from 'react';

const Summary = ( {points} ) => {

    if (points.length < 1) return(<div></div>)

    return (
        <div className='summary'>
            <ul>
                {points.map((point, i) => <li key={i}>{point['point']}</li>)}
            </ul>
        </div>
    )
}

export default Summary