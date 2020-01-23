import React from 'react';



/* ============================== */



function TitleComponent({ title, match, location, history}) {

    console.log('match ',match)
    console.log('location ',location)
    console.log('history', history)

    return (
        <h1>
            { title }
            <br/>
            { match.params.id_order }
        </h1>
    );

}

export default TitleComponent;