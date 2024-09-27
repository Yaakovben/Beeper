import enu from './enum'
import updateBeeperDTO from '../DTO/updateBeeper'


function statusCheck(body:updateBeeperDTO):void {
    if(body.status !== enu.manufactured && body.status!== enu.assembled  && body.status !== enu.shipped &&body.status !== enu.detonated && body.status !== enu.deployed){
        throw new Error("Please enter a correct Status")
    }
    
    
}

export default statusCheck