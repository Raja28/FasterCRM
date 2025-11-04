const Enquiry = require('../models/Enquiry')

exports.submitEnquiry = async (req, res) => {
    const { name, email, courseInterest } = req.body

    if (!name || !email || !courseInterest) {
        return res.status(400).json({
            success: false, message: 'All enquiry fields are required.'
        });
    }

    try {
        const newEnquiry = await Enquiry.create({ name, email, courseInterest });

        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully.',
            data: newEnquiry
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit enquiry.'
        });
    }
};

exports.getPublicEnquiries = async (req, res) => {
    try {

        const publicEnquiries = await Enquiry.find({ status: 'PUBLIC' })
            .select('-__v -claimedBy');

        res.status(200).json({
            success: true,
            count: publicEnquiries.length,
            data: publicEnquiries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch public enquiries.'
        });
    }
};

exports.claimEnquiry = async (req, res) => {
    const enquiryId = req.params.id;
    const employeeId = req.user._id;
    console.log(employeeId);
    
    try {

        const enquiry = await Enquiry.findById(enquiryId);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: 'Enquiry not found.'
            });
        }

        if (enquiry.status !== 'PUBLIC') {
            return res.status(400).json({
                success: false,
                message: `Enquiry is already ${enquiry.status}.`
            });
        }


        enquiry.status = 'CLAIMED';
        enquiry.claimedBy = employeeId;
        await enquiry.save();

        res.status(200).json({
            success: true,
            message: 'Enquiry claimed successfully.',
            data: enquiry
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to claim enquiry.'
        });
    }
};

exports.getClaimedEnquiries = async (req, res) => {
    const employeeId = req.user._id;

    try {

        const claimedEnquiries = await Enquiry.find({
            claimedBy: employeeId,
            status: "CLAIMED"
        }).select("-__v"); 

        res.status(200).json({
            success: true,
            count: claimedEnquiries.length,
            data: claimedEnquiries
        });
    } catch (error) {
        console.error("Error fetching claimed enquiries:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch claimed enquiries"
        });
    }
};