import React from 'react';
import MainRefrige from '../components/MainRefrige.jsx';
import MainAIRecommend from '../components/MainAIRecommend.js';

function MainPage () {


    return (
        <div>
            <MainRefrige/>
            <section className="mt-8 px-5">
                <div className="bg-[#FBBE00] rounded-2xl p-4 flex justify-between items-center">
                <div>
                    <p className="text-white font-semibold"  >AI 레시피 추천 받기</p>
                    <button className="mt-2 bg-white text-[#FBBE00] font-bold px-4 py-1 rounded-full">
                    GO
                    </button>
                </div>
                <img
                    src="/chef.png"
                    alt="Chef"
                    className="h-16 w-16 object-cover rounded-full border-2 border-white"
                />
                </div>
            </section>
            <MainAIRecommend/>
        </div>
    );
};

export default MainPage;