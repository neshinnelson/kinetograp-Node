const express = require('express');
const router = express.Router();
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const ModelUserData = require('../Models/modelUserData')
const saltRounds = 12
 
//get request handle
router.get('/:id',async(req,res)=>{
    //will take query show= 
    const show = req.query.show
    try{
        let data = await ModelUserData.find({userId:req.params.id});
        console.log(data);

        const result = data[0][show]
        
        res.json({ result, message: 'All data collected' })
    }
    catch(error){
        console.log(error + ' data was unable to fetch');
        res.status(500).json({ error: 'Data was unable to fetch'});
    }
})

//user registration handle
router.post('/',async(req,res)=>{
    if(!req.body.userName)return res.status(404).json({
        response:'failed',message:'conditions not full filled'
    })
    //checking user already exist or not
    const isExist = await ModelUserData.find({userName:req.body.userName})
    if(isExist.length>0) return res.status(406).json({
        response:'failed',message:'user already exists.'
    })

    //checking password conditions
    const regEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    const pass = regEX.test(req.body.userPass)

    if(!pass)return res.status(404).json({
        response:'failed',
        message:'password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and atleast 8 charecters.'
    })

    //encrypting the password
    const hashedPass = await bcrypt.hash(req.body.userPass,saltRounds)

    if(!hashedPass) return res.status(404).json({
        response:'failed',message:'encryption error'
    })
    try{
        let data = ModelUserData(req.body)
        data.userPass = hashedPass
        data.userId = randomstring.generate()+Math.round(Math.random()*1000)
        await data.save()
        res.json({response:'success',message:'user registered'});
        console.log('data is posted',data.userFName,data);
    }
    catch(error){
        console.log(error + ' data was unable to post');
        res.status(500).json({ error: 'Data was unable to post' });
    }
})

// put request handle
router.put('/:id',async(req,res)=>{
    try{
        let data = await ModelUserData.updateOne({userId : req.params.id}, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Item not found' });
          }
      
        // await data.save()
        res.json({ data, message: 'Data is updated' });
    }
    catch(error){
        console.log(error + ' data was unable to update');
        res.status(500).json({ error: 'Data was unable to update' });
    }
})

//post request handle
router.post('/validate-user',async(req,res)=>{
    if(!req.body.userName)return res.status(404).json({
        response:'failed',message:'req.body missing'
    })
    if(req.body.userName.length<8||req.body.userPass.length<8){
        return res.status(404).json({
            response:'failed',message:'userName or password is wrong'
        })
    }

    const userData = {
        userName: req.body.userName,
        userPass: req.body.userPass
    }
    try{
            let data = await ModelUserData.findOne({userName:userData.userName},{_id:0}).exec()
            if(!data||data.length<1) return res.status(404).json({
                response:'failed',message:'user is not found !'
            })

            //compare encrypted password
            const compare = await bcrypt.compare(userData.userPass,data.userPass)
            if(!compare)return res.status(401).json({
                response:'failed',message:'userName or password is wrong'
            })
            const user = {
                userId : data.userId,
                userName: data.userName,
                userFullName: data.userFName+' '+data.userSName
            }
    
             if(data.userName===userData.userName && compare){
                res.json({response:'success',message:'login success',user})
             }
             else{
                res.status(404).json({response:'failed',message:'user is not registered'})
             }
        }
        catch(error){
            console.log(error + ' data was unable to post');
            res.status(500).json({ error: 'Data was unable to post' });
        }
    })


//handle to add user bought items
router.put('/history/bought-items/:id',async(req,res)=>{
    console.log(req.body);
    if(!req.body.boughtItems||req.body.boughtItems.length<1)
     return res.status(404).json({
        response:'failed',message:'no query found'
    })
    if(!req.params.id)return res.status(404).json({
        response:'failed',message:'no user id found'
    })

    try{
        const data = await ModelUserData.find({userId:req.params.id})
        if(!data||data.length<1) return res.status(404).json({
            response:'failed',message:'user not found'
        })

        const createArray = req.body.boughtItems.map((item)=>(
            {purchaseDate:new Date(),productId:item}
        ))

        const updated = data[0].boughtItems.concat(createArray)

        const doUpdate = await ModelUserData.updateOne({userId:req.params.id},{boughtItems:updated})

        res.json({response:'success',message:'bought items updated',doUpdate})
    }
    catch(err){
        console.log('error in adding bought items');
        console.error(err);
        res.status(406).json({response:'success',message:'check data provided'})
    }
})

module.exports = router