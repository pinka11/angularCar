var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var bodyparser      = require("body-parser");
var passport        = require("passport");
var cors            = require("cors");
var JwtStrategy     = require('passport-jwt').Strategy;
var jwt             = require('jsonwebtoken');
var ExtractJwt      = require('passport-jwt').ExtractJwt;
var bcrypt          = require("bcryptjs");



mongoose.connect("mongodb://Mogha:mogha@ds119969.mlab.com:19969/angularcar");
// mongoose.connect("mongodb://localhost/car");

app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

// require('./passport')(passport);

var userSchema=new mongoose.Schema({
    name:String,
    phone:Number,
    gender:String,
    dl:String,
    dob:Date,
    username:{
		type:String,
		required:true,
		unique:true
	},
    email:String,
    state:String,
    city:String,
    pin:Number,
    password:{
		type:String,
		required:true
           },
    approval:{type:Boolean,default:false},
    disable:{type:Boolean,default:false}
});

var carSchema=new mongoose.Schema({
    name:String,
    price:Number,
    type:String,
   image:String
});

var couponSchema=new mongoose.Schema({
    name:String,
    discount:Number,
   code:String
});


var User=mongoose.model("User",userSchema);
var Car=mongoose.model("Car",carSchema);
var Coupon=mongoose.model("Coupon",couponSchema);

//PassPort Jwt
let opts	={};
    
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey='Car Rental';
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    	User.findById(jwt_payload.data._id,(err,user)=>{
    		if(err)
    		{
    			return done(err,false);
    		}
    		if(user)
    		{
    			return done(null,user);

    		}
    		else
    		{
    			return done(null,false);
    		}

    	}
    		);
    }));


//User Registration
app.post("/registration",function(req,res){
    var newUser=new User(req.body);
    console.log("user",req.body);
    var password=req.body.password;
         bcrypt.genSalt(10,(err,salt)=>{
             bcrypt.hash(password,salt,(err,hash)=>{
                 if(err) throw err;
                 newUser.password=hash;

                 newUser.save((err,user)=>{
                     if(err)
                    return res.json({success:false,msg:"This username is already registered !"});
                     if(user)
                    res.json({success:true,msg:"You are Registered"});
                     
                 });
             });
         });
   
});


//User Login
app.post('/login',(req,res,next)=>{
	const username =req.body.username;
	const password =req.body.password;

	User.findOne({username:username},(err,user)=>{
		if(err) 
			{
			res.json({success:false, msg:"Somthing went wrong"});

				throw err;
			}
		if(!user)
		{
			return res.json({success:false, msg:"User not found !"});
		}
		comparePassword(password,user.password,(err,isMatch)=>{
		if(err) {
			res.json({success:false, msg:"Somthing went wrong"});
            throw err;
		}

		if(isMatch)
		{
			const token=jwt.sign({data: user},'Car Rental',{
				expiresIn:604800  // 1 Week
			});
			res.json({

				success:true,
				msg:"Successfully login",
				token:`Bearer ${token}`,
				user:{       
					id        :   user._id,
					name      :   user.name,
                    username  :   user.username,
                    gender    :   user.gender,
					dob       :   user.dob,
					disable   :   user.disable,
					phone     :   user.phone,
					approval :   user.approval,
                    dl     :   user.dl,
                    state :user.state,
                    city :user.city,
                    pin :user.pin,
                    email :user.email                    
				}
			});	
		}
		else
		{
			return res.json({success:false,msg:"Wrong password"});
		}
		});
	});

});


//Logout
app.get('/logout',function(req,res){
    req.logout();
    res.json("logout");
});

//Get All Users
app.get('/admin/index',function(req,res){
        User.find({},function(err,user){
            if(err){
                console.log(err);
            }else{
               res.json(user);
            } 
        });
    });


//User Search
app.post("/admin/index/search",function(req,res){
    User.find({"name":{$regex : new RegExp(req.body.searchUser, "i")}},function(err,user){
        if(err){
            console.log(err);
        } else{
          res.json(user);
         }
    });
}) 

//Get Distinct Cities
app.get("/getcities",function(req,res){
    User.distinct("city",function(err,cities){
        if(err){
            console.log("err");
        }else{
            res.json(cities);
        }
    })
})

//Admin filter
app.post("/filters",function(req,res){
 User.find({city:req.body}, function(err,user){
        if(err)
          {
             console.log(err);
          }
        else{
            res.json(user);
         }
     });
})



//Get Car
app.get("/displayCar",function(req,res){
    Car.find({},function(err,car){
          if(err){
              console.log(err);
          }else{
              res.json(car);
          }
  });
  });

//Add Cars
app.post("/displayCar",function(req,res){
    Car.create({
       name:req.body.name,
       price:req.body.price,
       type:req.body.type,
       image:req.body.image
    },function(err,car){
    if(err){
        console.log(err);
    }else{
     res.json(car);
    }
    });
});

//Get car to modify
app.get("/:id/modify",function(req,res){
        Car.findById(req.params.id, function(err, car){
            if(err){
                res.json(err);
            } else {
              res.json(car);
            }
         });
    });

//Modify car
app.put("/:id",function(req,res){
    Car.findByIdAndUpdate(req.params.id,req.body,function(err, updatecar){
        if(err){

            console.log(err);
        } else {
             res.json(updatecar);
        }
     });
});

//Delete car
app.delete("/:id",function(req,res){
    Car.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        } else {
            res.json();
        }
     });
});


//Finding available Cars
app.post("/user/availablecar",function(req,res){
        Car.find({"type":{$regex : new RegExp(req.body.type, "i")}},function(err,cars){
            if(err){
                console.log(err);
            } else{ 
                 res.json(cars);   
              }
        });
    });


//Fetch User details who book the car
app.post("/user/:userID/:id/book",function(req,res){
    User.findById(req.params.userID, function(err, user){
       if(err){
           console.log(err);
       }
       else{
        res.json(user);
       }
   });
});


//Payment
app.post("/user/payment",function(req,res){
    res.json("Proceed");
})

//Payment Status
app.post("/user/paymentStatus",function(req,res){
    var card=req.body.cardno;
    var l=card.toString().length;    
    if(l==16){
        console.log("success")
        res.json("successful")
    }else{
        console.log("fail")
        res.json("fail")
    }
});


// User Approval
app.put("/admin/approve/:id",function(req,res){
    User.findById(req.params.id,function(err, updateuser){
        if(err){
            res.json(err);
        } else {
            updateuser.approval=!updateuser.approval;
            updateuser.save();
            res.json(updateuser);
        }
     });    
});

//User Disable
app.put("/admin/disable/:id",function(req,res){
    User.findByIdAndUpdate(req.params.id,req.body.disable,function(err, updateuser){
        if(err){
            console.log(err);
        } else {
            updateuser.disable=!updateuser.disable;
            updateuser.save();
            res.json(updateuser);
        }
     });    
});

//Get Coupons
app.get("/admin/coupon",function(req,res){
    Coupon.find({},function(err,coupon){
        if(err){
            console.log(err);
        }else{
            res.json(coupon);
        }
});
});


//Add Coupon
app.post("/admin/coupon",function(req,res){
        Coupon.create({
            name:req.body.cname,
            discount:req.body.cdiscount,
            code:req.body.ccode,
         },function(err,coupon){
         if(err){
             console.log(err);
         }else{
           res.json(coupon);
         }
         });
    });


var comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err){throw err;} 
        callback(null,isMatch);
    });
}

app.listen(process.env.PORT||3000,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("server working");
    } 
});