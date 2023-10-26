const Listing = require('../Models/Listing');


exports.getIndex = (req,res,next) => {
    Listing.find()
    .then(listings => {
        res.render('index' , {
            listings : listings,
            pageTitle:'NodeGigs | Find NodeJS Jobs & Projects',
            auth: req.session.loggedIn,
        })
    })
}

exports.getListing = (req,res,next) => {
    const listingId = req.params.listingId;
    Listing.findById(listingId).then(listing => {
        res.render('show' , {
            listing : listing,
            pageTitle:'NodeGigs | Find NodeJS Jobs & Projects',
            auth: req.session.loggedIn
        })
    }).catch(err => {
        console.error(err)
    })
}

exports.getCreate = (req,res,next) => {
    res.render('create' , {
        pageTitle : 'Create a Gig',
        auth : req.session.loggedIn,
    })
}
exports.postCreate = (req,res,next) => {
    const company = req.body.company;
    const title = req.body.jobTitle;
    const location = req.body.jobLocation;
    const email = req.body.contactEmail;
    const applicationURL = req.body.applicationURL;
    const jobTags = req.body.jobTags;
    const description = req.body.jobDescription;
    const logo = req.body.logo;

    const formattedTags = jobTags.split(",");

    const listing = new Listing({
        company:company,
        jobTitle:title,
        jobLocation:location,
        contactEmail:email,
        applicationJobURL:applicationURL,
        jobTags:formattedTags,
        jobDescription:description,
        jobLogo:logo,
        userId: req.session.user._id
    });

    listing.save().then(result => {
        res.redirect(`/listing/${listing._id}`)
    }).catch(err => {
        console.error(err)
    })
}
exports.filterByTag = (req,res,next) => {
    const tag = req.params.tag;
    Listing.find({
        jobTags: tag
    }).then(listings => {
        res.render('index' , {
            listings : listings,
            pageTitle : `(${listings.length}) Gigs waiting for you`,
            auth : req.session.loggedIn,
        })
    })
}

exports.filterBySearch = (req,res,next) => {
    const searchQuery = req.body.search
    Listing.find({
        $or: [
          { jobTags: { $regex: new RegExp(searchQuery, 'i') } },
          { jobTitle: { $regex: new RegExp(searchQuery, 'i') } },
          { jobDescription: { $regex: new RegExp(searchQuery, 'i') } },
          { jobLocation: { $regex: new RegExp(searchQuery, 'i') } },
        ]
      }).then(listings => {
        res.render('index' , {
            listings : listings,
            pageTitle : `(${listings.length}) Jobs waiting for you`,
            auth : req.session.loggedIn,
        })
    })
}

exports.deleteListing = (req,res,next) => {
    const listingId = req.body.listingId;
    Listing.findByIdAndRemove(listingId).then(() => {
        res.redirect('/manage');
    }).catch(err => {
        console.error(err)
    })
}

exports.getManage = (req,res,next) => {
    Listing.find({
        userId:req.session.user._id
    }).then(listings => {
        res.render('manage' , {
            pageTitle : 'Manage Gigs',
            auth : req.session.loggedIn,
            listings:listings
        })
    }).catch(err => {
        console.error(err)
    })
}

exports.getEdit = (req,res,next) => {
    const listingId = req.params.listingId
    Listing.findById(listingId).then(listing => {
        res.render('edit' , {
            pageTitle : 'Edit a Gig',
            auth : req.session.loggedIn,
            listing : listing
        })

    }).catch(err => {
        console.error(err)
    })
}

exports.postEdit = (req,res,next) => {
    const listingId = req.body.listingId;
    const updatedCompany = req.body.company;
    const updatedTitle = req.body.jobTitle;
    const updatedLocation = req.body.jobLocation;
    const updatedEmail = req.body.contactEmail;
    const updatedApplicationURL = req.body.applicationURL;
    const updatedJobTags = req.body.jobTags;
    const updatedDescription = req.body.jobDescription;
    const updatedLogo = req.body.logo;
    const updatedFormattedTags = updatedJobTags.split(",");
    Listing.findById(listingId).then(listing => {
        listing.company = updatedCompany,
        listing.jobTitle = updatedTitle,
        listing.jobLocation = updatedLocation,
        listing.contactEmail = updatedEmail,
        listing.applicationJobURL = updatedApplicationURL,
        listing.jobTags = updatedFormattedTags,
        listing.jobDescription = updatedDescription,
        listing.jobLogo = updatedLogo
        
        return listing.save();
    }).then(result => {
        res.redirect(`/listing/${result._id}`)
    }).catch(err => {
        console.error(err)
    })
}