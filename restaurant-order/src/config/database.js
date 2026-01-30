const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
        await mongoose.connect(dbUri);
        console.log(`Database connected successfully: ${dbUri}`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;    