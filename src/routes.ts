import {Router} from 'express';

const router = Router();

router.get('/',(req,res)=>{
    res.json({"mensagem":"Retorno no Routes Atualizado"});
})

export {router}