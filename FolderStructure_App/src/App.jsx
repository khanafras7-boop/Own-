import { useState } from 'react'
import './App.css'
import Folder from './components/Folder'
import explorerData from './data/folderData'
import useInsertItems from './hooks/useInsertItems';

function App() {
  const [count, setCount] = useState(0);
  const [folderData, setFolderData] = useState(explorerData);
  const {insertNode, removeItem} = useInsertItems();

  const handleInsert = (id, name, isFolder) => {
    const updatedData = insertNode(folderData, id, name, isFolder);
    setFolderData(updatedData);
  }

  const handleDelete = (id) => {
    console.log('here')
    const updatedItems = removeItem(folderData, id);
    setFolderData(updatedItems);
  } 


  return (
    <>
     <Folder insertNode={handleInsert} removeNode={handleDelete} explorer={folderData}/> 
    </>
  )
}

export default App
