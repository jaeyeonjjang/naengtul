import React, { useState, useEffect } from 'react';
import { X, Search, ChevronLeft } from 'lucide-react';
import api from '../api/axiosConfig';

const AddIngredientModal = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1); // 1: 검색, 2: 상세입력
  const [searchQuery, setSearchQuery] = useState('');
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [expireDate, setExpireDate] = useState('');

  const categories = [ '채소', '육류', '수산물'];

  useEffect(() => {
    if (isOpen) {
      // 전체 재료 목록 가져오기
      api.get('api/ingredients')
        .then(response => {
          const ingredients = response.data._embedded?.ingredients || [];
          setAllIngredients(ingredients);
          setFilteredIngredients(ingredients);
        })
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  // 검색 필터링
  useEffect(() => {
    let filtered = allIngredients;

    // 카테고리 필터
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.category)
      );
    }

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredIngredients(filtered);
  }, [searchQuery, selectedCategories, allIngredients]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category): [...prev, category]
    );
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!selectedIngredient || !quantity) {
      alert('재료와 수량을 입력해주세요.');
      return;
    }

    const newIngredient = {
      user: { id: 1 }, // 임시 사용자 ID
      ingredient: {ingredientId : selectedIngredient._links.self.href.split("/").pop()},
      quantity,
      expireDate: expireDate || null
    };





    // API 호출
    api.post('api/refriges', {
      user : { id: 1 }, // 임시 사용자 ID
      ingredient: {ingredientId : selectedIngredient._links.self.href.split("/").pop()},
      quantity,
      expireDate
    })
    .then(() => {
      onAdd(newIngredient);
      onClose();
      resetForm();
    })
    .catch(err => {
      console.error('등록 실패:', err);
      alert('등록에 실패했습니다.');
    });
  };

  const resetForm = () => {
    setStep(1);
    setSearchQuery('');
    setSelectedIngredient(null);
    setSelectedCategories([]);
    setQuantity('');
    setExpireDate('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* 모달 컨테이너 */}
      <div className="bg-white rounded-3xl w-full max-w-sm max-h-[70vh] overflow-y-auto animate-slide-up shadow-2xl">
        
        {/* Step 1: 재료 검색 */}
        {step === 1 && (
          <div className="p-5">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">재료 추가</h2>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 검색바 */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="재료 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* 카테고리 필터 */}
            <div className="flex gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs transition ${
                    selectedCategories.includes(category)
                      ? 'bg-primary text-black'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category}
                  {selectedCategories.includes(category) && (
                    <X className="inline w-2.5 h-2.5 ml-1" />
                  )}
                </button>
              ))}
            </div>

            {/* 재료 그리드 */}
            <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
              {filteredIngredients.map((ingredient) => (
                <button
                  key={ingredient.ingredientId}
                  onClick={() => handleIngredientSelect(ingredient)}
                  className="bg-white border border-gray-200 rounded-xl p-3 hover:border-primary hover:shadow-md transition"
                >
                  <div className="text-4xl mb-1 text-center">
                    {getIngredientEmoji(ingredient.ingredientName)}
                  </div>
                  <h3 className="font-bold text-xs text-center">{ingredient.ingredientName}</h3>
                  <p className="text-[10px] text-gray-500 text-center">{ingredient.category}</p>
                </button>
              ))}
            </div>

            {filteredIngredients.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        )}

        {/* Step 2: 상세 정보 입력 */}
        {step === 2 && (
          <div className="p-5">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setStep(1)}>
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-bold">재료 등록</h2>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 선택된 재료 표시 */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-50 rounded-xl p-4 w-32">
                <div className="text-5xl mb-1 text-center">
                  {getIngredientEmoji(selectedIngredient?.ingredientId)}
                </div>
                <h3 className="font-bold text-sm text-center">{selectedIngredient?.ingredientName}</h3>
                <p className="text-xs text-gray-500 text-center">{selectedIngredient?.category}</p>
              </div>
            </div>

            {/* 수량 입력 */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                수량 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 1kg, 500g, 3개"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* 유통기한 입력 */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                유통기한
              </label>
              <input
                type="date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 bg-blue-50 bg-primary text-gray-600 rounded-full text-sm font-medium hover:bg-opacity-20"
              >
                등록
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// 재료 이름에 따른 이모지
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
    '마늘': '🧄',
    '배추': '🥬',
    '파': '🌱'
  };
  return emojiMap[name] || '🥘';
};

export default AddIngredientModal;