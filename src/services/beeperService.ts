import NewBeeperDTO from "../DTO/newBeeper"
import updateBeeperDTO from '../DTO/updateBeeper'
import Beeper from "../models/Beeper";
import enu from '../utils/enum'
import statusCheck from '../utils/FunctionStatusCheck'
import locationCheck from '../utils/FunctionLocationChech'
import { getFileData, saveFileData } from "../config/fileDataLayer";

export default class BeeperService {
    // יצירת ביפר חדש 
    public static async createNewBeeper(newBeeper:NewBeeperDTO):Promise<Beeper>{ 
        // create a new peeper() object
        const{name} = newBeeper
        if (!name || name == " ") {
            throw new Error("Please enter a name") 
        }
        const beeper:Beeper = new Beeper(
            name, 
        )   
        // get the file as an array of object
        let beepers:Beeper[]  = await getFileData<Beeper>() as Beeper[]
        if(!beepers) beepers = []
        // push
        beepers.push(beeper)      
        //save tha array back to the file
        await saveFileData<Beeper>(beepers)
        return beeper
    }

        //קבלת כל הביפרים
    public static async getAllBeeper():Promise<Beeper[]>{  
        let beepers:Beeper[]  = await getFileData<Beeper>() as Beeper[]
        if(!beepers) beepers = []
        return beepers
    }

    //ID קבלת ביפר לפי 
    public static async getBeeperById(beeperId:number):Promise<Beeper>{  
        let beepers:Beeper[]  = await getFileData<Beeper>() as Beeper[]
        let beeper:Beeper = beepers.find(p => p.id === beeperId) as Beeper
        if(!beeper){
            throw new Error("The Beeper not found");
        }
        return beeper
    }

    // מחיקת ביפר
    public static async removeBeeperById(postId:number):Promise<boolean>{
        try {
            const beepers:Beeper[]  = await getFileData<Beeper>() as Beeper[]
            let beeper:Beeper[] = beepers.filter(p => p.id != postId) as Beeper[]
            if(!beeper){
                throw new Error("The Beeper not found")
            }
            saveFileData<Beeper>(beeper)
            return true 
        } catch (error) {
            return false             
        }      
    }

    //  פונקציה לחיפוש ביפר לפי הסטטוס שלו
    public static async getBeeperByStatus(status: string): Promise<Beeper[]> {
        const beepers: Beeper[] = await getFileData<Beeper>() as Beeper[];
        const filteredBeepers:Beeper[] = beepers.filter(beeper => beeper.status === status);
        if(filteredBeepers.length<=1){
            throw new Error ("No such status found")
        }
        return filteredBeepers;
    }
    
//ID פונקציה לעדכון הסטטוס והמיקום של ביפר לפי 
    public static async updateBeeper(body:updateBeeperDTO,beeperId:number): Promise<Beeper> {
        const beepers: Beeper[] = await getFileData<Beeper>() as Beeper[];
        const beeper = beepers.find(b => b.id === beeperId);
        // אם הביפר לא נמצא
        if (!beeper){
            throw new Error ("The Beeper not found")
        };
        //שבודקת אם הסטטוס תקין DTO  שליחה לפונקצייה שנמצאת ב
        statusCheck(body)
        beeper.status = body.status
        // deployed אם הסטטוס הוא     
        if(body.status == enu.deployed){
        //שמחייבת להכניס מיקום נכון DTO  שליחה לפונקצייה שנמצאת ב
        locationCheck(body)
            beeper.Latitude = body.latitude
            beeper.Longitude = body.longitude     
        await saveFileData<Beeper>(beepers);
        }
        // שליחה לפונקצייה שתעדכן תסטטוס
        BeeperService.updateStatus(beeperId)   
        return beeper;
    }

    // פונקציית עדכון הסטטוס למפוצץ
    public static async updateStatus(beeperId:number): Promise<Beeper> {
        const beepers: Beeper[] = await getFileData<Beeper>() as Beeper[];
        const beeper:Beeper = beepers.find(b => b.id === beeperId) as Beeper;
        if(beeper.status == enu.deployed){
            console.log(beeper.status);
            setTimeout(async () => {
                beeper.status = enu.detonated;
                console.log(beeper.status);
                beeper.explosionAt = new Date()  
                await saveFileData<Beeper>(beepers);
            }, 10000);       
        }
         return beeper
    }
}














    






