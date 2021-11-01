import {FaPlus} from 'react-icons/fa';
import { useRef } from 'react';
const AddItem = ({newItem, setNewItem, handleSubmit}) => {
    const inputRef = useRef();

    return (
        <form className="addform" onSubmit={handleSubmit}>
            {/* <label htmlFor="addItem" style={{color: 'black'}}>Add Item</label> */}
            <input 
                type="text"  
                autoFocus
                ref={inputRef}
                id='addItem'
                placeholder='Add Item'
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                className='add-btn'
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem
