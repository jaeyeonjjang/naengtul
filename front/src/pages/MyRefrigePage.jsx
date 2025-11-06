import React,{useEffect, useState}  from 'react';
import { SERVER_URL } from '../constants.js';
//import { DataGrid } from '@mui/x-data-grid';
//import Snackbar from '@mui/material/Snackbar'; //알림 컴포넌트
import AddRefrigerator from '../components/AddRefrigerator.jsx';
//import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIngredientModal from '../components/AddIngredientModal.jsx';


function MyRefrigePage () {

    const [refrige, setRefrige] = useState([]);

    const [open, setOpen] = useState(false);  //Snackbar 열림 여부

      const categories = ['전체', '채소', '수산물', '육류']; //임시데이터


  const [isModalOpen, setIsModalOpen] = useState(false);



  const [activeCategory, setActiveCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('유통기한 마감순');


    const filteredIngredients = activeCategory === '전체' 
    ? refrige 
    : refrige.filter(item => item.ingredient?.category === activeCategory);

    

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




      const handleAddIngredient = (newIngredient) => {
    // 새 재료 추가 후 목록 갱신
    fetchRefrige();
  };

    return (


<div className="min-h-screen bg-gray-50">

      {/* Category Filters */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex gap-2 mb-3">
          {categories.map((category) => (
            <button
            //   key={category}
            //   onClick={() => setActiveCategory(category)}
            //   className={`px-6 py-2 rounded-full font-medium transition ${
            //     activeCategory === category
            //       ? 'bg-primary text-white'
            //       : 'bg-white text-gray-600 border border-gray-300'
            //   }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort & Add Buttons
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full text-sm border border-gray-300 text-gray-600 flex items-center gap-1">
            {sortBy}
          </button>
          <AddRefrigerator addRefrigerator={addRefrigerator}/>
          {/* <button className="px-4 py-1.5 rounded-full text-sm border border-gray-300 text-gray-600">
            등록
          </button> 
        </div> */}

                {/* Sort & Add Buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full text-sm border border-gray-300 text-gray-600 flex items-center gap-1">
            {sortBy}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-1.5 rounded-full text-sm border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            등록
          </button>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {filteredIngredients.map((item, index) => (
            <IngredientCard 
              key={index}
              name={item.ingredient?.ingredientName}
              quantity={item.quantity}
              expireDate={item.expireDate}
              image={item.ingredient?.image || getIngredientEmoji(item.ingredient?.ingredientName)}
            />
          ))}
        </div>
      </div>

      {/* 재료 등록 모달 */}
      <AddIngredientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddIngredient}
      />

    </div>
  );

            // <div className="flex gap-4">
            //     {refrige.map((item, i) => (
            //         <div
            //         key={i}
            //         className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 w-28"
            //         >
            //         <img src={item.img} alt={item._links.self.href} className="h-16 object-contain" />
            //         <p className="font-bold text-gray-800 mt-2">{item.ingredient?.ingredientName || 'N/A'}</p>
            //         <p className="text-sm text-gray-500">{item.quantity}</p>
            //         <p className="text-sm text-gray-500">{item.expireDate}</p>
            //         </div>
            //     ))}
            // </div>


};


// 재료 카드 컴포넌트
const IngredientCard = ({ name, quantity, image, expireDate }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <div className="text-5xl mb-2 text-center">{image}</div>
      <h3 className="font-bold text-gray-800 text-sm text-center">{name}</h3>
      <p className="text-xs text-gray-500 text-center">{quantity}</p>
      <p className="text-xs text-gray-500 text-center">{expireDate}</p>
    </div>
  );
};


const getIngredientEmoji = (name) => {
  const emojiMap = {
    '무': '🥬',
    '당근': '🥕',
    '소고기': '🥩',
    '돼지고기': '🥓',
    '닭고기': '🍗',
    '양파': '🧅',
    '감자': '🥔',
    '토마토': '🍅',
    '고추': '🌶️',
    '마늘': '🧄'
  };
  return emojiMap[name] || '🥘';
};

export default MyRefrigePage;