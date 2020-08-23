import React from 'react';

const Summary = ( {points} ) => {

    return (
        <div>
            <ul>
                {points.map((point, i) => <li key={i}>{point['point']}</li>)}
            </ul>
        </div>
    )
}

export default Summary