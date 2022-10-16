import React from 'react';
import { useAddContactMutation, useContactQuery, useContactsQuery, useUpdateContactMutation, useDeleteContactMutation } from './services/contactsApi';


function App() {
  const {data,error,isLoading,isFetching,isSuccess} = useContactsQuery();

  return (
    <div className="App">
      <h1>React Redux Toolkit RTK Query Turtorial</h1>
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {error && <h2>Something Went Wrong...</h2>}
      {isSuccess && (
        <div>
          {data?.map(contact =>(
            <div className='data' key={contact.id}>
              <span className='name'>{contact.name}</span>
              <span><ContactDetail id={contact.id}/></span>
            </div>
          ))}
        </div>
      )}
      <div>
        <AddContact />
      </div>
    </div>
  );
}

export const ContactDetail = ({id}:{id:string}) =>{
  const {data} = useContactQuery(id);

  return (
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  )
}


export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const contact = {
    "id":"3",
    "name":"Vova",
    "email":"vovvv@email.com"
  }
  const contactUp = {
    "id":"3",
    "name":"Vova-updated",
    "email":"vovvv@email.com"
  }
  const addHandler = async () => {
    await addContact(contact)
  }
  const updateHandler = async () => {
    await updateContact(contactUp)
  }
  const deleteHandler = async () => {
    await deleteContact(contact.id)
  }
  return(
    <>
      <button onClick={addHandler}>Add</button>
      <button onClick={updateHandler}>update</button>
      <button onClick={deleteHandler}>delete</button>
    </>
  )
}

export default App;
