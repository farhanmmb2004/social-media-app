import axios from 'axios';
let api_KEY="44401170-af74c4d624fed378eb4dca7a6";
let base_URL=`https://pixabay.com/api/?key=${api_KEY}`;
export let fetchImages=async()=>{
try{
    let response=await axios.get(`${base_URL}&page=${Math.floor(Math.random()*20)}`);
    return response.data;
}
catch(error){
console.log(error);
}
}