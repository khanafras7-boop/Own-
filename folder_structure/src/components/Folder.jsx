import { useState, useEffect } from "react"



export default function Folder({ insertNode, explorer, removeNode }) {


    const [flag, setFlag] = useState(false);
    const [textBox, setTextBox] = useState({isVisible:false, isFolder:false});
    
    const [newValue, setNewValue] = useState("");

    const handleNewAddedItem = (id,name,isFolder) => {
        insertNode(id,name,isFolder);
        setTextBox({...textBox, isVisible:false});
        setNewValue("");
    }

    return (

        <div>
            {
                explorer.isFolder
                    ?
                    <div>
                        <div>
                            <div  className="row">
                            <div
                                onClick={() => setFlag(!flag)}>
                                📁 {explorer.name}
                            </div>
                            <span className="addItems">
                                <span onClick={() => setTextBox({isVisible:true, isFolder : true})} className="addFolder items">
                                    + Folder
                                </span>
                                <span onClick={() => setTextBox({isVisible:true, isFolder : false})} className="addFile items">
                                    +File
                                </span>
                                <span onClick={() => removeNode(explorer.id)} className="addFile items">
                                    - Delete
                                </span>
                            </span>
                        </div>
                         {
                            textBox.isVisible
                            ?
                            
                            <div>
                            {textBox.isFolder ? "📁" : "📝"}
                            <input 
                            type="text" 
                            style={{marginLeft:10}}
                            value={newValue}
                            autoFocus
                            onBlur={() => setTextBox({...textBox, isVisible : false})}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key == 'Enter') {
                                    handleNewAddedItem(explorer.id, newValue, textBox.isFolder);
                                }
                            }}
                            /> 
                            </div>
                            :
                            ""
                        }
                        </div>
                       
                        <div>
                            {explorer.items.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <div style={{ marginLeft: 20, display: flag ? "block" : "none" }}>
                                            <span><Folder explorer={item} removeNode={removeNode} insertNode={insertNode} /></span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <div>
                        📝 {explorer.name} 
                        <span className="addItems">
                            <span onClick={() => removeNode(explorer.id)} className="addFile items">
                                    - Delete
                                </span>
                        </span>
                    </div>
            }

        </div>
    )

}