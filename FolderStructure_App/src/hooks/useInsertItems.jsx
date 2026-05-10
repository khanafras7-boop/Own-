

 const useInsertItems = () => {

    function insertNode(folderData, id, item, isFolder) {
        if(folderData.id == id) {
            folderData.items.push({
                id : new Date().getTime(),
                name : item,
                isFolder,
                items : []
            });

            return folderData;
        }

        let updatedItems = folderData.items.map((ele) => {
            return insertNode(ele, id, item, isFolder);
        })

        return {...folderData, items: updatedItems}

        
    }

    const removeItem = (folderData, id) => {
        if (folderData.id === id) {
            return null; // Return null to indicate this item should be removed
        }

        const updatedItems = folderData.items
            .map((ele) => removeItem(ele, id)) // Recursively remove from children
            .filter((ele) => ele !== null); // Filter out removed items

        return { ...folderData, items: updatedItems };
    }

    return {insertNode, removeItem}

}

export default useInsertItems;