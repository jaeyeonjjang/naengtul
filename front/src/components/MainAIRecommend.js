import React from 'react';

function MainAIRecommend () {
    return (
        <div>
           <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">추천내역</h3>
            <button className="text-sm text-gray-400">See all</button>
            </div>

            <div className="flex items-center bg-white rounded-2xl shadow-md p-3">
            <img
                src="/salad.png"
                alt="추천 요리"
                className="h-14 w-14 object-cover rounded-xl"
            />
            <div className="ml-3">
                <p className="font-semibold text-gray-800">브로콜리 당근 샐러드</p>
                <p className="text-xs text-gray-500">Reduce Chronic Disease Risk</p>
            </div>
            </div>
        </div>
    );
};

export default MainAIRecommend;