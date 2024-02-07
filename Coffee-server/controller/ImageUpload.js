const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: "dhshpy5fh",
    api_key: "674579777977227",
    api_secret: "vPsxjCZnKbIu1gHGXiuEnv_nVwY",
})

const imageUploadController = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={imageUploadController};