import exp, { Request, Response, Router } from 'express'
import beeperService from '../services/beeperService'
import Beeper from '../models/Beeper'
import newBeeperDTO from '../DTO/newBeeper'


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
                message:'Post saved sucssesfuly',
                Date:undefined
            })
        }else{
            throw new Error("Can't Save New Post to the file");

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
                message:'This is all Posts',
                Data:result,
            })
            
        }else{
            throw new Error("Can't give the posts");
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
                message:'This is the Post',
                Date:result
            })
        }else{
            throw new Error("Can't ");

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
            message:'This is very GOOD',
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

// חיפוש ביפר לפי












export default router