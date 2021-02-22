import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AddWatercraft from '../components/AddWatercraftComponent/AddWatercraft';

export const EditWatercraft = () => {

    const [editWatercraft, setEditwatercraft] = useState(null);
    const { idOfWatercraft } = useParams();
    const url = "http://localhost:8080/watercraft/getWaterCraftById/" + idOfWatercraft;
    const getWaterCraftById = async () => { 
        const response = await fetch(url, {
            method: "GET"
        });
        const watercrafts = await response.json();
        setEditwatercraft(watercrafts)
        console.log(watercrafts);
    }

    useEffect(() => { 
        getWaterCraftById();
    },[])
    return (
        <div>
            {editWatercraft !== null && <AddWatercraft data={ editWatercraft }/>}
        </div>
    )
}
