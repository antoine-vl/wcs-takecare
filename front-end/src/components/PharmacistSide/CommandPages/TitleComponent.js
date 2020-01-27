import React from 'react';



/* ============================== */



function TitleComponent(props) {

    return (
        <h1>
            { props.title }
            {/* <br/> */}
            {/* { props.match.params.id_order } */}
        </h1>
    );

}

export default TitleComponent;