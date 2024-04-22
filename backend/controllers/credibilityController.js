const vendor = require('../models/vendormodel');

//retrieve vendor information
const getVendorInfo = async (req, res)=>{
    try{
        const vendors = await vendor.findAll();

        res.status(200).json(vendors);
    } catch(error) {
        console.error('Error retrieving vendor Information:', error)

        res.status(500).json({message: 'Internal server error'});
    }
};

const calculateCredibilityScore = (vendor, criteria) => {
    let totalScore = 0;
    //if vendor has a portfolio, assign full score
    if (vendor.portfolio){
        totalScore += criteria.weight.portfolio;
    }
    //Assign points based on years of experience
    totalScore +=
    Math.min(vendor.yearsOfExperience, criteria.weight.maxyearsOfExperience);

    //chech if vendors meet location criterion
    if (criteria.location.includes(vendor.category)){
        totalScore += criteria.weight.category;
    }
    return totalScore;
};
//credibility scoring
const scoreVendors = async (req,res) =>{
    try {
        const { location, category} = req.body;

        //weights for each criterion
        const criteriaWeights = {
            portfolio: 10,
            maxyearsOfExperience: 5,
            location: 8,
            category: 7
        };
        // retrieve all vendors
        const vendors = await
        vendor.findAll();

        //calculate score for each vendor
        const vendorScores =
        vendors.map(vendor =>({
            vendorId: vendor.Id,
            name: vendor.name,
            credibilityScore: calculateCredibilityScore(vendor, {weights: criteriaWeights, location, category})

        }));
        //sort scores in descending order based on credibility score

        vendorScores.sort((a, b)=>
        b.credibilityScore - a.credibilityScore);

        //list vendors
        res.json({vendorScores});
    }catch (error){{
        console.error('Error scoring vendors:', error);
       res.status(500).json({message: 'internal server error'});
    }}
};




module.exports = {
    getVendorInfo,
    scoreVendors
};