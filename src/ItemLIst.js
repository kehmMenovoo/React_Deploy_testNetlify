import { FaTrash } from "react-icons/fa"
const ItemLIst = ({items, handleCheck, handleDelete}) => {
    return (
        <ul>
            {items.map(i => (
                <li className="item" key={i.id}>
                    <input type="checkbox" onChange={() => handleCheck(i.id)} checked={i.checked}/>
                    <label
                            style={(i.checked) ? { textDecoration: 'line-through' } : null}
                            onDoubleClick = {() => handleCheck(i.id)}
                    >
                        {i.item}
                    </label>
                    <FaTrash
                        role="button" 
                        onClick={() => handleDelete(i.id)} 
                        tabIndex="0" 
                        aria-label= {`Delete ${i.item}`}
                    />
                </li>
            ))}
        </ul>
    )
}

export default ItemLIst
