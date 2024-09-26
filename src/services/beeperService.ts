import NewBeeperDTO from "../DTO/newBeeper"
import updateBeeperDTO from '../DTO/updateBeeper'
import Beeper from "../models/Beeper";
import enu from '../utils/enum'
import { getFileData, saveFileData } from "../config/fileDataLayer";


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

//ID פונקציה לעדכון הסטטוס והמיקום של ביפר לפי 
    public static async updateBeeper(body:updateBeeperDTO,beeperId:number): Promise<Beeper | null> {
        const beepers: Beeper[] = await getFileData<Beeper>() as Beeper[];
        const beeper = beepers.find(b => b.id === beeperId);
        // אם הביפר לא נמצא
        if (!beeper) return null;
        // deployed אם הביפר הוא אחד מהססטטוסים שקיימים חוץ מ
        if(body.status == enu.manufactured ||body.status == enu.assembled  ||body.status == enu.shipped ||body.status == enu.detonated){
            beeper.status = body.status
        // deployed אם הסטטוס הוא 
        }else if(body.status == enu.deployed){
        // מחייב להכניס מיקום
            if(!body.latitude || !body.longitude || body.latitude < 33.01048 || body.latitude > 34.6793 || body.longitude < 35.04438 || body.longitude > 36.59793 ){
            return null
            }
            beeper.status = enu.deployed
        }else{
            return null
        }
        //!!! אם הסטטוס של הביפר הוא נפרס
        if (beeper.status == enu.deployed) {
            beeper.Latitude = body.latitude
            beeper.Longitude = body.longitude 
        }
        await saveFileData<Beeper>(beepers);
        // שליחה לפונקצייה שתעדכן תסטטוס
        BeeperService.updateStatus(beeperId)   
        return beeper;
    }


    // פונקציית עדכון הסטטוס למפוצץ
    public static async updateStatus(beeperId:number): Promise<Beeper> {
        const beepers: Beeper[] = await getFileData<Beeper>() as Beeper[];
        const beeper:Beeper = beepers.find(b => b.id === beeperId) as Beeper;
        if(beeper.status == enu.deployed){
            console.log(beeperId);
            console.log(beeper.status);
            await setTimeout(async () => {
                beeper.status = enu.detonated;
                await saveFileData<Beeper>(beepers); 
            }, 10000);      
            beeper.explosionAt = new Date()     
            console.log(beeper.status);
        }
         await saveFileData<Beeper>(beepers)
         return beeper
    }
}














    






