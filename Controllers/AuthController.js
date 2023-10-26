const User = require('../Models/User')

exports.getLogin = (req,res,next) => {
    if(req.session.user){
        res.redirect('/')
    }
    else{
        res.render('Auth/login' , {
            pageTitle:'Login',
            auth: req.session.loggedIn
        })
    }
}

exports.postLogin = (req,res,next) => {
    if(req.session.user){
        res.redirect('/')
    }
    else{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        'email' : email
    }).then(user => {
        if(!user){
            console.log('No user with that email exists')
        }
        else if(password !== user.password){
            console.log('Passwords dont match')
        }
        else{
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.save(() => {
              res.redirect('/');
            });
        }
    })
    }
}

exports.getRegister = (req,res,next) => {
    if(req.session.user){
        res.redirect('/')
    }else{
        res.render('Auth/register' , {
            pageTitle:'Register',
            auth: req.session.loggedIn
        })
    }
}

exports.postRegister = (req,res,next) => {
    if(req.session.user){
        res.redirect('/')
    }else{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({
        'email' : email
    }).then(user => {
        if(user){
            console.log('This email is already in use!')
        }
        else if(password !== confirmPassword){
            console.log('Passwords dont match or you didnt agree to the TOS!')
        }
        else{
            const createdUser = new User({
                name: name,
                email:email,
                password:password
            });
            createdUser.save().then(createdUser => {
                req.session.user = createdUser;
                req.session.loggedIn = true;
                req.session.save(() => {
                    res.redirect('/')
                });
            }).catch(err => {
                console.log(err)
            })
        }
    })
   .catch(err => console.log(err));
    }
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

