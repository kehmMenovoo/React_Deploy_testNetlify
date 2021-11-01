import ItemLIst from "./ItemLIst"
const Content = ({items, handleCheck, handleDelete}) => {
   
    return (
        <>
            {items.length ? (
                <ItemLIst 
                    items = {items}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete}
                />
            ) : (
                <p style={{color: 'gray', marginTop: '50px'}}>Your List is empty.</p>
            )}
        </>
    )
}

export default Content
