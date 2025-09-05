import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    aadharCard:{
        type:String,
        required:true,
        unique:true,
        validate:
        {
            validator: function(v){
                return /^\d{12}$/.test(v);
            },
            message:props => `${props.value} is not a valid Aadhar number!`
        }
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        validate:
        {
            validator:function(v){
                return /^\d{10}$/.test(v);
            },
            message:props => `${props.value} is not a valid Phone number!`
        }
    },
    address:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true,
    },
    occupation:{
        type:String,
        enum:['Farmer','Buyer'],
        required:true,
    },
    farmerDetails:{
        farmSize:{
            type:Number,
            required: function(){return this.occupation === 'Farmer';}
        },
        cropsGrown:
        {
            type:[String],
            required: function(){return this.occupation === 'Farmer';}
        },
        farmImage:
        {
            type:String,
            default: "" // This will store the Firebase Storage URL
        }
    },
    buyerDetails:{
        buyerType:{
            type:String,
            enum:['Individual','Company','Cooperative'],
            required:function() {return this.occupation === 'Buyer';}  
        },
        gstNumber:{
            type:String,
            required:function() {return this.occupation === 'Buyer';}  
        },
        companyImage:{
            type:String,
            default: "" // This will store the Firebase Storage URL
        }
    },

    bankAccNumber:{
        type:String,
        required:true,
        unique:true,
    },
    ifscNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default: "" // This will store the Firebase Storage URL
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
