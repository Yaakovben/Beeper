import NewBeeperDTO from "../DTO/newBeeper"
import Beeper from "../models/Beeper";
import { getFileData, saveFileData } from "../config/fileDataLayer";

import fs from 'fs/promises'




export default class BeeperService {

    // יצירת ביפר חדש 
    public static async createNewBeeper(newBeeper:NewBeeperDTO):Promise<boolean>{ 
        // create a new peeper() object
        const{name} = newBeeper
        const beeper:Beeper = new Beeper(
            name, 
        )   
        // get the file as an array of object
        let beepers:Beeper[]  = await getFileData<Beeper>() as Beeper[]
        if(!beepers) beepers = []
        // push
        beepers.push(beeper)      
        //save tha array back to the file
        return await saveFileData<Beeper>(beepers)
    }


        //קבלת כל הביפרים
        public static async getAllBeeper():Promise<Beeper[]>{  
            let posts:Beeper[]  = await getFileData<Beeper>() as Beeper[]
            if(!posts) posts = []
            return posts
        }



          //ID קבלת ביפר לפי 
    public static async getBeeperById(postId:number):Promise<Beeper>{  
        let posts:Beeper[]  = await getFileData<Beeper>() as Beeper[]
        let post:Beeper = posts.find(p => p.id === postId) as Beeper
        return post
    }




       // מחיקת ביפר
       public static async removeBeeperById(postId:number):Promise<boolean>{
        try {
            const beepers:Beeper[]  = await getFileData<Beeper>() as Beeper[]
            let beeper:Beeper[] = beepers.filter(p => p.id != postId)
            saveFileData<Beeper>(beeper)
            return true 
        } catch (error) {
            return false  
            
        }      
    }

    //  פונקציה לחיפוש ביפר לפי הסטטוס שלו
public static async getBeeperByStatus(status: string): Promise<Beeper[]> {
    const beepers: Beeper[] = await getFileData<Beeper>() as Beeper[];
    const filteredBeepers = beepers.filter(beeper => beeper.status === status);
    return filteredBeepers;
}







    





}
