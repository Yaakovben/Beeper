import { v4 } from "uuid"
import enu from '../utils/enum'
class Beeper {
    public id:number
    public status:string
    public createdAt:Date
    public explosionAt?:Date
    public Longitude?:number
    public Latitude?:number

    constructor(
        public name:string,
    ) { 
        this.id = +Math.random().toString().split(".")[1]
        this.createdAt = new Date()
        this.status = enu.manufactured
       }
}

export default Beeper