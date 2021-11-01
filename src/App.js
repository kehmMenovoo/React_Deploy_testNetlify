import './App.css';
import './index.css'
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

//host: npm start
function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const API_URL = 'http://localhost:3500/items';

  // useEffect(() => {
  //   localStorage.setItem('shoppinglist', JSON.stringify(items));
  // }, [items]);
  useEffect(() => {
   const fetchItems = async () => {
     try{
       const response = await fetch(API_URL);
       const listItems = await response.json();
       if(!response.ok) throw Error('Did not receive expected data.');
       setItems(listItems);
       setFetchError(null);
     }
     catch(err) {
      setFetchError(err.message);
     }
     finally {
       setIsloading(false);
     }
   }
   setTimeout(() => {
    (async () => await fetchItems())();
   }, 500)
  }, []);

  const handleCheck = async (id) => {
    const listItems = items.map((i) => i.id === id ? { ...i, checked: !i.checked } : i);
    setItems(listItems);

    const myItem = listItems.filter(i => i.id === id);
    const upDateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, upDateOptions);
    if(result) setFetchError(result);
  }
  const handleDelete = async function(id) {
    const listItems = items.filter((i) => i.id !== id);
    setItems(listItems);

    const deleteOptions = {method: 'DELETE'};
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if(result) setFetchError(result);
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    let a = item[0];
    let b = item.substr(1);
    if(a === a.toLowerCase()){
      a = a.toUpperCase();
    }
    item = a+b;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }
  return (
    <div class="App">
      <Header />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <AddItem
        newItem={newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <main>
        {isLoading && <p style={{color: 'gray', marginTop: '50px'}}>Loading Items...</p>}
        {fetchError && <p style={{color: "red", marginTop: '50px'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(i => ((i.item).toLowerCase().includes(search.toLowerCase())))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
