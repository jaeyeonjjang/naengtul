import React,{useEffect, useState}  from 'react';
import { SERVER_URL } from '../constants.js';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar'; //알림 컴포넌트
import AddRefrigerator from './AddRefrigerator.jsx';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Refrigerator () {

    const [refrige, setRefrige] = useState([]);

    const [open, setOpen] = useState(false);  //Snackbar 열림 여부

//user_refrige_pk

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
    {field: 'expireDate', headerName: '유통기한', width: 150},
    {field: '_links.self.href', 
        headerName:'', 
        sortable: false, 
        filterable:false, 
        renderCell:row => 
            <IconButton onClick={() => onDelClick(row.id)}>
                <DeleteIcon color="errer"/>
            </IconButton>}
]

    const onDelClick = (url) => {

        if(window.confirm('정말 삭제하시겠습니까?')){
            fetch(url, {method: 'DELETE'})
            .then(res => { 
                if(res.ok){
                    fetchRefrige(); setOpen(true); 
                }else {
                    alert('삭제에 실패했습니다.');
                }})
            .catch(err => console.error(err));
        }
    }

    const fetchRefrige = () => {

        //세션 저장소에서 토큰을 읽고 Authorization 헤더에 이를 포함한다.
        const token = sessionStorage.getItem("jwt");
        //임시 테스트용 데이터
        //http://localhost:9090/api/refriges/search/findByUserId?id=1
        fetch('http://localhost:9090/api/refriges/search/findByUserId?id=1',{
            headers: {'Authorization': token}
        })
        .then(response => response.json())
        .then(data => setRefrige(data._embedded.refriges))
        .catch(err => console.error(err));
    }


    useEffect(() => {
        fetchRefrige();
    }, []); 


    const addRefrigerator = (refrige) => {
        fetch(SERVER_URL + 'api/refriges', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(refrige  )
        })
        .then(res => {
            if(res.ok){
                fetchRefrige();
            } else {
                alert('추가에 실패했습니다.');
            }
        })
        .catch(err => console.error(err));
    }

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
        <React.Fragment>
            {/* <AddRefrigerator addRefrigerator={addRefrigerator}/> */}
            <Stack mt={2} mb={2}>
                <AddRefrigerator addRefrigerator={addRefrigerator}/>
            </Stack>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid 
                    rows={refrige} 
                    columns={columns}
                    disableSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                />
                <Snackbar
                    open={open}
                    message="삭제되었습니다."
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                />  
            </div>
        </React.Fragment>


    );
};

export default Refrigerator;