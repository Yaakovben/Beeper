import exp, { Request, Response, Router } from 'express'
import beeperService from '../services/beeperService'
import Beeper from '../models/Beeper'
import newBeeperDTO from '../DTO/newBeeper'
import updateBeeperDTO from '../DTO/updateBeeper'


const router:Router = exp.Router()

// יצירת ביפר חדש
router.post('/',async(
    req:Request<any, any,newBeeperDTO>,
    res:Response
):Promise<void> =>{
    try{        
      
      const result = await beeperService.createNewBeeper(req.body)
                
        if(result){
            res.status(200).json({
                err:false,
                message:'Beeper saved sucssesfuly',
                Date:undefined
            })
        }else{
            throw new Error("Can't Save New Beeper to the file");

        }

    }catch(err){
        res.status(400).json({
            err:true,
            message:'This NO good',
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
            throw new Error("Can't give the Beeper");
        }
    }catch(err){
        res.status(400).json({
            err:true,
            message:'This NO good',
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
        if(result){
            res.status(200).json({
                err:false,
                message:'This is the Beeper',
                Date:result
            })
        }else{
            throw new Error("Can't give you Beeper ");

        }
    
    }catch(err){
        res.status(400).json({
            err:true,
            message:'This NO good',
            data:"NotFound"
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
        

    }catch(err){
        res.status(400).json({
            err:true,
            message:'This NO good',
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
        
        if (result.length > 0) {
            res.status(200).json({
                err: false,
                message: 'This is the Beepers',
                data: result
            });
        } else {
            throw new Error("No  found");
        }
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'This NO good',
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

      if (updatedBeeper) {
          res.status(200).json({
              err: false,
              message: ' The Beepers updated successfully',
              Data: updatedBeeper
          });
      } else {
          res.status(404).json({
              err: true,
              message: 'Beeper not found or you dosent enter location',
              Data: null
          });
      }
  } catch (error) {
      res.status(400).json({
          err: true,
          message: 'No good',
          Data: null
      });
  }
});




export default router