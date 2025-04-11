const Bus = require("../models/Bus")

exports.getPage = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.user.id})
        if(!bus){
            return res.redirect('/driver/logout')
        }
        return res.render('driver/dashboard',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.viewRoute  = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.user.id})
        if(!bus){
            return res.redirect('/driver/logout')
        }
        return res.render('driver/route',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.startTrip  = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.user.id})
        if(!bus){
            return res.redirect('/driver/logout')
        }
        bus.ongoingTrip=true
        bus.route.forEach((i)=>{
            i.visited=false
        })
        await bus.save()
        return res.render('driver/dashboard',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.stopTrip  = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.user.id})
        if(!bus){
            return res.redirect('/driver/logout')
        }
        bus.ongoingTrip=false
      
        await bus.save()
        return res.render('driver/dashboard',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.stopVisit  = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.user.id})
        if(!bus){
            return res.redirect('/driver/logout')
        }
        let i = bus.route.find((i)=>i.id==req.params.id)
        i.visited = true
        await bus.save()
        return res.render('driver/dashboard',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.updateLocation  = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.body?.busid})
        if(!bus){
            return;
        }
        bus.location.lat=req.body.lat
        bus.location.lon=req.body.lon
        await bus.save()
        return res.render('driver/dashboard',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}