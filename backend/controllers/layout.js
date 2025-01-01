const Layout = require("../models/Layout");


exports.saveLayout = async (req, res) => {
    const { layout } = req.body;

    try {
        console.log("helloBuddy");

        const existingLayout = await Layout.findOne({ userId: req.user.id });
        if (existingLayout) {
            existingLayout.layout = layout;
            await existingLayout.save();
        } else {
            const newLayout = new Layout({ userId: req.user.id, layout });
            await newLayout.save();
        }
        res.json({ message: "Layout saved" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.loadLayout = async (req, res) => {
    try {
        const layout = await Layout.findOne({ userId: req.user.id });
        res.json(layout ? layout.layout : {});
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}