import buildings from "../data/buildingData.js"

export const getBuildings = (req,res)=>{
    res.json(buildings) //this function sends the buildings data
};