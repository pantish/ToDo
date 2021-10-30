import React, {useState, useEffect} from "react";
import axios from "axios";
import List from "../List";
import './AddListButton.scss';
import Badge from './../Badge/index';
import closeSvg from './../../assets/img/close.svg';

const AddList = ({colors, onAdd}) => {
const [ visiblePopup, setVisablePopup] = useState(false);
const [ selectedColor, setSelectedColor] = useState(3);
const [isLoading, setIsLoading] = useState(false);
const [inputValue, setInputValue] = useState('');

useEffect(() => {
  if (Array.isArray(colors)) {
    setSelectedColor(colors[0].id)
  }
}, [colors]);

const onClose = () => {
  setVisablePopup(false);
  setInputValue('');
  setSelectedColor(colors[0].id);
}

const addList = () => {
  if (!inputValue) {
    alert('Введите название списка');
    return;
  }
  setIsLoading(true);
  axios
  .post('http://localhost:3001/lists', {
    name: inputValue,
  colorId: selectedColor
})
.then (({data}) => {
  const color = colors.filter( c => c.id === selectedColor)[0].name;
  const listObj = { ...data, color: { name: color}};
  onAdd(listObj);
  onClose();
})
.finally(() =>{
setIsLoading(false);
});
};


    return (
        <div className="add-list">
            <List 
            onClick={() => setVisablePopup(!visiblePopup)}
        items={[
        { className: "list__add-button",
          icon: (<svg width="12" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
          ),
      name: 'Добавить список'},
    ]}
    />
    {visiblePopup && ( 
    <div className="add-list__popup">
      <img 
      onClick ={onClose}
      src={closeSvg} alt="Close button" className="add-list__popup-close-btn"/>
      <input value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      className="field" type="text"  placeholder="Название списка"/>
      
      <div className="add-list__popup-colors">
          {colors.map(color => (
            <Badge
             onClick={() => { setSelectedColor(color.id)}}
              key={color.id} 
              color={color.name}
            className={selectedColor === color.id && 'active' }/>
          ))}
      </div>
      <button onClick={addList} className="button">
        {isLoading ? 'Добавление...' : 'Добавить'}
        </button>
    </div>
    )
    }
   </div>
    )
};
export default AddList;