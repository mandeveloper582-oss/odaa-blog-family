const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'odaa-blog-family-git-fix-po-5c0b79-mandeveloper582-oss-projects.vercel.app' }));

// Ensure uploads folder exists for local fallback
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve uploaded images when using local fallback
app.use('/uploads', express.static(uploadsDir));

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
	console.warn('Cloudinary not configured — using local uploads fallback');
}

// Register routes and error handling for both direct runs and imports.
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use(errorHandler);

// Only connect and listen when this file is run directly.
if (require.main === module) {
	const PORT = process.env.PORT || 5000;

	const startServer = async () => {
		await connectDB();
		const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
		server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.error(`Port ${PORT} is already in use. Please stop the process using the port or set PORT to a free value.`);
			} else {
				console.error('Server error:', err);
			}
			process.exit(1);
		});
	};

	startServer().catch(err => {
		console.error('Server failed to start:', err);
		process.exit(1);
	});
}

module.exports = app;
