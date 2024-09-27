import exp, {Express} from 'express'
//
import 'dotenv/config'

import beeperController from './controllers/beeperController'

const app:Express = exp()

app.use(exp.json())


app.use('/api/beepers',beeperController)
   


   

app.listen(process.env.PORT,():void => console.log(`See you at http://localhost:${process.env.PORT}/api/beepers`));



   