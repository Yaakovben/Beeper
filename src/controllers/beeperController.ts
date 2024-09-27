import exp, { Request, Response, Router } from 'express'
import beeperService from '../services/beeperService'
import Beeper from '../models/Beeper'
import newBeeperDTO from '../DTO/newBeeper'
import updateBeeperDTO from '../DTO/updateBeeper'
import { stringify } from 'uuid'
const router:Router = exp.Router()

// יצירת ביפר חדש
router.post('/',async(
    req:Request<any, any,newBeeperDTO>,
    res:Response
):Promise<void> =>{
    try{        
      const result = await beeperService.createNewBeeper(req.body)        
            res.status(200).json({
                err:false,
                message:'Beeper saved sucssesfuly',
                Data:result
            })
    }catch(err:any){
        res.status(400).json({
            err:true,
            message: err.message  || 'The system detects an error',
            data:null
        })
    }
})

//קבלת כל הפיברים
router.get('/',async(
    req:Request,
    res:Response
):Promise<Beeper[] | void> =>{
    try{
        const result = await beeperService.getAllBeeper()
        if(result){
            res.status(200).json({
                err:false,
                message:'This is all Beepers',
                Data:result,
            })     
        }else{
            throw new Error("can't give you the Beepers");
        }
    }catch(err){
        res.status(400).json({
            err:true,
            message:'The system detects an error',
            data:null
        })
    }  
})

// ID חיפוש ביפר לפי 
router.get('/:id',async(
    req:Request,
    res:Response
):Promise<void> =>{
    try{
        const result = await beeperService.getBeeperById(+req.params.id)
            res.status(200).json({
                err:false,
                message:'This is the Beeper',
                Data:result
            })
    }catch(err:any){
        res.status(400).json({
            err:true,
            message: err.message ||'The system detects an error',
            data:null
        })
    }
})

//ID מחיקת ביפר לפי 
router.delete('/:id',async(
    req:Request,
    res:Response
):Promise<Beeper[] | void> =>{
    try{
        const deletPost = await beeperService.getBeeperById(+req.params.id)
        await beeperService.removeBeeperById(+req.params.id)
        res.status(200).json({
            err:false,
            message:'The Beeper deleted sucssesfuly',
            Date: deletPost
        })
        
    }catch(err:any){
        res.status(400).json({
            err:true,
            message:err.message ||'The system detects an error',
            data:null
        })
    }
})

// חיפוש ביפר לפי סטטוס שלו
router.get('/status/:status', async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await beeperService.getBeeperByStatus(req.params.status); 
            res.status(200).json({
                err: false,
                message: 'This is the Beepers',
                data: result
            });
       
    } catch (err:any) {
        res.status(400).json({
            err: true,
            message: err.message || 'The system detects an error',
            data: null
        });
    }
});

// עריכת פיבר
router.put('/status/:id/', async (
    req: Request<any, any, any, updateBeeperDTO>, 
  res: Response
): Promise<void> => {
  try {
      const updatedBeeper = await beeperService.updateBeeper(req.body,+req.params.id);
          res.status(200).json({
              err: false,
              message: 'The Beepers updated successfully',
              Data: updatedBeeper
          });
     
  } catch (err:any) {
      res.status(400).json({
          err: true,
          message:err.message ||'The system detects an error',
          Data: null
      });
  }
});

export default router