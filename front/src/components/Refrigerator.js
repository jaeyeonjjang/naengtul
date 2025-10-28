import React,{UseEffect, useState}  from 'react';

function Refrigerator () {

    const [refriges, setRefriges] = React.useState([]);

    return (
        <div>
            
        </div>
    );

    UseEffect(() => {
        fetch('http://localhost:9090/api/refriges')
        .then(response => response.json())
        .then(data => setRefriges(data._embedded.refriges))
        .catch(err => console.error(err));
    }, []); 
};

export default Refrigerator;