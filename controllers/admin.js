const Bus = require('../models/Bus')
const Review = require('../models/Review')

exports.getDashboard = async(req,res)=>{
    try{
        let buses = await Bus.find()
        return res.render('admin/dashboard',{buses})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getBus = async(req,res)=>{
    try{
        let buses = await Bus.find()
        return res.render('admin/bus-all',{buses})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getAddBus = (req,res)=>{
    try{
        return res.render('admin/bus-add')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.addBus = async(req,res)=>{
    try{
        await Bus.create({
            id:`B${Date.now()}`,
            busNo:req.body.busNo,
            regNo:req.body.regNo,
            driver:req.body.driver,
            phone:req.body.phone,
            routeName:req.body.routeName,
            otp:'1111',
        })
        return res.redirect('/admin/bus')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getEditBus = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.params.id})
        if(!bus){
            return res.redirect('/admin/bus')
        }
        return res.render('admin/bus-edit',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.editBus = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.params.id})
        if(!bus){
            return res.redirect('/admin/bus')
        }
        bus.busNo=req.body.busNo
        bus.regNo=req.body.regNo
        bus.driver=req.body.driver
        bus.phone=req.body.phone
        bus.routeName=req.body.routeName
        await bus.save()
        return res.redirect('/admin/bus')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getBusForRoute = async(req,res)=>{
    try{
        let buses = await Bus.find()
        return res.render('admin/bus-select',{buses})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getViewRoute = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.params.id})
        if(!bus){
            return res.redirect('/admin/route')
        }
        return res.render('admin/route-view',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getAddStop = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.query.bus})
        if(!bus){
            return res.redirect('/admin/route')
        }
      
        return res.render('admin/route-add',{bus})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.addStop = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.body.busid})
        if(!bus){
            return res.redirect('/admin/route')
        }
        bus.route.push({
            location:req.body.location,
            lat:req.body.lat,
            lon:req.body.lon,
            id:`S${Date.now()}`
        })
        await bus.save()
        return res.redirect(`/admin/route/${bus.id}`)
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.deleteStop = async(req,res)=>{
    try{
        let bus = await Bus.findOne({id:req.query.bus})
        if(!bus){
            return res.redirect('/admin/route')
        }
        let newRoute =  bus.route.filter((i)=>i.id != req.query.location)
        bus.route = newRoute
        await bus.save()
        return res.redirect(`/admin/route/${bus.id}`)
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getReviews = async(req,res)=>{
    try{
        let buses = await Bus.find()
        let reviews = await Review.find().sort({id:-1})
        return res.render('admin/review-all',{buses,reviews})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}
// try{

// }catch(e){
//     console.log(e)
//     return res.redirect('/error')
// }