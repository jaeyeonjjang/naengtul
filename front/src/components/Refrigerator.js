import React,{useEffect, useState}  from 'react';
import { SERVER_URL } from '../constants.js';
import { DataGrid } from '@mui/x-data-grid';

function Refrigerator () {

    const [refrige, setRefrige] = useState([]);
const columns = [
    {
        field: 'userNickname', 
        headerName: '닉네임', 
        width: 150,
        valueGetter: (value, row) => row.user?.nickname || 'N/A'  // 새 문법
    },
    {
        field: 'ingredientName', 
        headerName: '재료명', 
        width: 150,
        valueGetter: (value, row) => row.ingredient?.ingredientName || 'N/A'
    },
    {field: 'quantity', headerName: '수량', width: 100},
    {field: 'expireDate', headerName: '유통기한', width: 150}
]


    useEffect(() => {
        fetch(SERVER_URL + 'api/refriges')
        .then(response => response.json())
        .then(data => setRefrige(data._embedded.refriges))
        .catch(err => console.error(err));
    }, []); 

    return (
        // <div>
        //     <table>
        //         <tbody>
        //             {
        //                 refrige.map((refriges, index) =>
        //                     <tr key={index}>
        //                         <td>{refriges.user.nickname}</td>
        //                         <td>{refriges.ingredient.ingredientName}</td>
        //                         <td>{refriges.quantity}</td>
        //                         <td>{refriges.expireDate}</td>
        //                     </tr>) 
        //             }
        //         </tbody>
        //     </table>
        // </div>
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={refrige} columns={columns}
            getRowId={row => row._links.self.href}
            />
        </div>
    );
};

export default Refrigerator;