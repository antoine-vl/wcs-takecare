import React from 'react';



/* ============================== */



function TitleComponent(props) {

    return (
        <p>
            Status :
            { props.title }
            {/* <br/> */}
            {/* { props.match.params.id_order } */}
        </p>
    );
}

export default TitleComponent;