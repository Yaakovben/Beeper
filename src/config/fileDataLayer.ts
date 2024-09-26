import fs from 'fs/promises'

// ייבוא
export const getFileData =async <T> ():Promise<T[] | void> =>{
  try {
    const strData = await fs.readFile(
      `${__dirname}/../../data/beepers.json`,
      "utf-8"
    );
    const parsedata: T[] = JSON.parse(strData);
    return parsedata;
  } catch (err) {
    console.log(err);
  }
}

// שמירה 
export const saveFileData =async<T> ( data:T[]):Promise<boolean> =>{
    try {
        const stringifiData:string = JSON.stringify(data)
        await fs.writeFile(`${__dirname}/../../data/beepers.json`,stringifiData,{
            encoding:'utf-8'
        })
        return true
    } catch (err) {
        console.log(err);
        return false
        
    }
}