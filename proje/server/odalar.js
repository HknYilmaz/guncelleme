const odalar = [];

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min ) + min
    )
  }


  
const odaEkle = (isim)=> {
    odalar.map((oda) => console.log(oda)); 
   const extingRoom = odalar.find((oda) => isim === oda.isim)
   if(extingRoom){
       return odalar.map((oda) => { if(oda.isim === isim) { return oda }})
   }   
   else {
        const mod = between(0,20);
        const base = between(0,20);
        odalar.push({isim , mod , base});
       return  {isim , mod , base}
   }
   odalar.push(Room); 
   return Room;
}
const getRoom = (isim) => odalar.find((room) => room.isim === isim);

module.exports = { addRoom , getRoom};