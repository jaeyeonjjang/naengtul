import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainRefrige (){

    const ingredients = [
        { name: "무", weight: "1kg", img: "/radish.png" },
        { name: "당근", weight: "300g", img: "/carrot.png" },
    ];

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

                <div className="flex gap-4">
                {ingredients.map((item, i) => (
                    <div
                    key={i}
                    className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 w-28"
                    >
                    <img src={item.img} alt={item.name} className="h-16 object-contain" />
                    <p className="font-bold text-gray-800 mt-2">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.weight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainRefrige;