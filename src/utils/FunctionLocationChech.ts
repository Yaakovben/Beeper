import enu from './enum'
import updateBeeperDTO from '../DTO/updateBeeper'

function locationCeck(body:updateBeeperDTO):void {
    if(!body.latitude || !body.longitude || body.latitude < 33.01048 || body.latitude > 34.6793 || body.longitude < 35.04438 || body.longitude > 36.59793 ){
        throw new Error("Please enter a correct location")
        } 
}

export default locationCeck