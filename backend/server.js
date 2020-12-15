const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const Userdata = require('./models/Userdata');
const Coffeebar = require('./models/Coffeebar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const geolib = require('geolib');
const MY_COORDS = {latitude: 13.560212, longitude:  78.503937};

const url="http://localhost:4000";

//image limits and files
//  const storage = multer.diskStorage({
//      destination: function(req, file, cb){
//          cb(null,'./uploads/');
//      },
//      filename: function(req, file, cb) {
//          cb(null,file.originalname);
//      }
// });

// const fileFilter = (req, file, cb) => {
//     //reject a file
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
//     {
//         cb(null, true);
//     }
//     else{
//     cb(null, false);
//     }
    
// }

// const upload = multer({
//     storage : storage,
//     fileFilter: fileFilter
// });

const app = express();
const router = express.Router();

//app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(bodyParser.json());

//mongodb connection

mongoose.connect('mongodb://localhost:27017/userdatas');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDb database connection established successfully');
});

//get all userdatas of users
router.route('/userdatas').get((req, res) => {
    Userdata.find((err, userdatas) => {
        if(err)
            console.log(err);
        else
            res.json(userdatas);
    })
});


//add users by signing up
router.post('/signup',(req, res, next) => {
    Userdata.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user. length >= 1) {
            return res.status(409).json({
                message: 'Mail exists'
            })
        }
        else
        {
            bcrypt.hash(req.body.password,10, (err, hash)=> {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new Userdata({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        age: req.body.age,
                        phonenumber: req.body.phonenumber,
                        address: req.body.address,
                        password: hash
                        
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            })
        }
    })
})

//login of the user
router.route('/login').post((req, res) => {
    Userdata.find({ email: req.body.email })
    .exec()
    
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if (result) {
                const datanow=user;
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                "secret", 
                 {
                     expiresIn: 2500
                 }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                    dataofnow: datanow
                })
                return jwt.sign({ _id: this._id});
            }
            res.status(401).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})


// router.post('/forgot-password', (req, res, next) => {
//     const {email} =req.body;
  
//     Userdata.findOne({email}, (err, user) => {
//       if (err || !user) {
//         return res.status(400).json({error: "User already exists"});
//       }

//       const token= jwt.sign({_id: user._id}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '30m'});
//       const data = {
//           from:'shine11roshni@gmail.com',
//           to: email,
//           subject: 'Password Reset Link',
//           html:`
//           <h2>Please Click the following link to reset your password</h2>
//           <p>${process.env.url}/resetpassword/${token}</p>
//           `
//       };

//       return user.updateOne({resetLink: token}, (err, success) {
//           if(err){
//               return res.status(400).json({error: "reset password link error"})
//           }
//           else{
              
//           }
//       })
//     })
//   })


// router.post('/authenticate',(req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if(err) return res.status(400).json(err);
//         else if(user) return res.status(200).json({ "token": user.generateJwt() });
//         else return res.status(404).json(info);
//     })(req, res);
// })
// Userdata.methods.verifyPassword = function(password){
//         return bcrypt.compareSync(password, this.password);
//     }
//     Userdata.methods.generateJwt = function ()
//     {
//         return jwt.sign({ _id: this._id},
//             process.env.JWT_KEY);
//     }

//get userdata of particular user with id
router.route('/userprofile').get((req, res) => {
    Userdata.find((err, userdatas) => {
        if(err)
            console.log(err);
        else
            res.json(userdatas);
    });
});

//update favourite bars
app.post('/userprofile/updatefavbar/:id', (req, res) => {  
    Userdata.findById(req.params.id, (err, userdatas) => {
        if (!userdatas)
            return new Error('Could not load document');
        else {
          x=[];
          x=userdatas.favouritebars;
          x.push(req.body.shopid);
          userdatas.set('favouritebars',x).save().then(userdatas=>{
            res.json("Value = "+x);
          }).catch(err => {
            console.log(err)
          })
        }
    })
});

//remove favourite bars
app.post('/userprofile/removefavbar/:id', (req, res) => {  
    Userdata.findById(req.params.id, (err, userdatas) => {  
        if (!userdatas)
            return new Error('Could not load document');
        else {
          x=[];
          x=userdatas.favouritebars;
          value=req.body.shopid;
          index=x.indexOf(value);
          x.splice(index,1);
          console.log(x)
          userdatas.set('favouritebars',x).save().then(userdatas=>{
              res.json("Value removed was = "+value);
              console.log(x);
            }).catch(err => {
              console.log(err)
            })        
        }      
    })
});

//find favourite coffee bar
app.get('/userprofile/findfavbar/:id',(req,res)=>{
    console.log('Requesting user with id:', req.params.id);
    Userdata.findById(req.params.id, (err, userdatas) => {
        if (err){
            console.log("caught an err : "+err);
        }
        else{
        x=[];
        x=userdatas.favouritebars;
        res.json(x);
        }
    })
})

//update review 
app.post('/updatereview/:id', (req, res) => {
  
    Coffeebar.findById(req.params.id, (err, coffeebars) => {

        if (!coffeebars)
            return new Error('Could not load document');
        else {
          b=[];
          b=coffeebars.review;
          if(!req.body.review=='')
          {
          b.push(req.body.uname+" : "+req.body.review);
          coffeebars.set('review',b).save().then(coffeebars=>{
            res.json({'message':'review add success'});
        })
          .catch(err => {
            console.log(err)
          })
        }
        }
    })
})

//add rating for a particular shop
app.post('/addrating/:id', (req, res) => {  
    Coffeebar.findById(req.params.id, (err, user) => {
        if (!user)
            return new Error('Could not load document');
        else {
            b=user.rating;
            value=req.body.value;
            console.log(b,value);
            ratevalue=(b+value)/2;
            updatedresult=ratevalue.toFixed(2);
            console.log(updatedresult);
            user.set('rating',updatedresult).save().then(user=>{
                res.json({'message':'rating updation success'});
            }).catch(err => {
                    console.log(err)
            })
        }
    })
})


//update the userdatas with id
// router.route('/users/updateusers/:id').post((req, res) => {
//     Userdata.findById(req.params.id, (err, userdata) => {
//         if(!userdata)
//             return next(new Error('Could not load document'));
//         else
//         {
//             userdata.fullname = req.body.fullname;
//             userdata.email = req.body.email;
//             userdata.age = req.body.age;
//             userdata.phonenumber = req.body.phonenumber;
//             userdata.address = req.body.address;
//             userdata.password = req.body.password;

//             userdata.save().then(userdata =>{
//                 res.json('Updated successfully');
//             }).catch(err => {
//                 res.status(400).send('Updation Failed!!');
//             });
//         }
//     });
// });

//get all details of coffeebars
router.route('/coffeebars').get((req, res) => {
    Coffeebar.find((err, coffeebars) => {
        if(err)
            console.log(err);
        else
            res.json(coffeebars);
    })
});

//get coffeeshop data of particular coffeeshop with id
router.route('/coffeebars/:id').get((req, res) => {
    Coffeebar.findById(req.params.id, (err, coffeebars) => {
        if(err)
            console.log(err);
        else
            res.json(coffeebars);
    });
});

// router.route('/coffeebarslati').get((req, res) => {
//     Coffeebar.find((err, coffeebars) => {
//         if(err)
//             console.log(err);
//         else
//             var i;
//             for(i=0 ; i<10; i++){
//             console.log(coffeebars[i].name)
//         }

//     })
// });
// router.route('/coffeebars/getlatilong').get((req, res) => {

//     Coffeebar.find((err, coffeebars) => {
//         if(err)
//             console.log(err)
//         else
//             res.json(coffeebars);
//     })
// });

//coffeeshops nearby
router.get('/coffeebars/getNearby',(req, res, next) => {

    Coffeebar.find((err, coffeebars) => {
        if(err)
            console.log(err)
        else
        {
            var i;
            let COFFEE_COORDS = {
                latitude: coffeebars.latitude,
                longitude: coffeebars.longitude,
                name: coffeebars.name,
                _id: coffeebars._id
            }
        
              res.json(coffeebars);
        }
    })
});

//get coffeeshops with id

router.get('/coffebars/getNearby/:id',(req,res,next) => {
    Coffeebar.find((err, coffeebars)=> {
        const COFFEE_COORDS = {
                latitude: coffeebars.latitude,
                longitude: coffeebars.longitude,
                name: coffeebars.name
            };
            if(err){
                console.log(err);
            }
            else{
                res.json(coffeebars);
            }
    })
})

//add the new coffeeshops
router.route('/coffeeshop/addcoffeebars').post((req, res) => {
    let coffeebar = new Coffeebar(req.body);
    coffeebar.save()
        .then(coffeebar => {
            res.status(200).json({'coffeebar': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

//deleting the particular coffeeshop with id
router.route('/coffeeshop/removecoffeebars/:id').get((req, res) => {
    Coffeebar.findByIdAndRemove({_id: req.params.id}, (err,coffeebar) => {
        if(err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});


app.use('/', router);


app.get('/', (req, res) => res.send('Welcome To CoffeeLove'));
app.listen("4000", () => console.log('Express server is running in 4000'));

