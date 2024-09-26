import exp, {Express} from 'express'
//
import 'dotenv/config'
import authController from './controllers/beeperController'


const app:Express = exp()


app.use(exp.json())

app.use('/auth',authController)



   

app.listen(process.env.PORT,():void => console.log(`See you at http:localhost:${process.env.PORT}`));



