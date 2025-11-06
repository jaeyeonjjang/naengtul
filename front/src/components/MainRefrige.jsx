import React,{useEffect, useState}  from 'react';
import { useNavigate } from 'react-router-dom';

function MainRefrige (){

    const ingredients = [
        { name: "무", weight: "1kg", img: "/radish.png" },
        { name: "당근", weight: "300g", img: "/carrot.png" },
    ];



    const [refrige, setRefrige] = useState([]);

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


      const navigate = useNavigate();

    return (
        <div>
             <div className="flex justify-between items-center mb-3">
                <div>
                    <h2 className="text-lg font-bold">나의 냉장고</h2>
                    <p className="text-sm text-orange-500">my refrige</p>
                </div>
                <button className="text-sm text-gray-400" onClick={() => navigate('/MyRefrigerator')}>See all</button>
                </div>

                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {refrige.map((item, i) => (
                    <div
                    key={i}
                    className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 w-28"
                    >
                    <div className="text-5xl mb-2 text-center">{item.ingredient?.image || getIngredientEmoji(item.ingredient?.ingredientName)}</div>
                    {/* <img src={item.img} alt={item.name} className="h-16 object-contain" /> */}
                    <p className="font-bold text-gray-800 mt-2">{item.ingredient.ingredientName}</p>
                    </div>
                ))}
                    <div className="flex-shrink-0 w-14"></div>

                    
            </div>
        </div>
    );
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

export default MainRefrige;