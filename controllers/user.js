const Bus = require("../models/Bus")
const Review = require("../models/Review")
const analyseReview = require('../utils/analyseReview')

exports.viewAllBus = async(req,res)=>{
    try{
        let buses = await Bus.find()
        return res.render('user/dashboard',{buses})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.busLocation = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.params.id})
        if(!bus){
            return res.redirect('/user')
        }
        return res.render('user/bus-location',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.viewMap = async(req,res)=>{
    try{
            let buses = await Bus.find()
            return res.render('user/map',{buses})
        }catch(e){
            console.log(e)
            return res.redirect('/error')
        }
}

exports.getReview = async(req,res)=>{
    try{
        let buses = await Bus.find()
        return res.render('user/review',{buses})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.addReview = async(req,res)=>{
    try{
        console.log(req.body)
        let bus = await Bus.findOne({id:req.body.busid})
        if(!bus){
            return res.redirect('/user/review')
        }

        let score =await analyseReview(req.body?.text)
        bus.score = bus.score + score
        await bus.save()

        await Review.create({
            id:`R${Date.now()}`,
            busid:bus.id,
            score:score,
            text:req.body.text
        })
        return res.render('user/review-success',{score:score,text:req.body.text})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}