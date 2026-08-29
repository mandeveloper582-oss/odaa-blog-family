const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

// Load environment from backend/.env explicitly so running from repo root works
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: "odaa-blog-family API is running. Visit the frontend at https://odaa-blog-family.vercel.app/",

	});
});

app.use(express.json({ limit: '10mb' }));

// Support multiple allowed frontend origins (comma-separated) and local dev hosts
const FRONTEND_URLS = process.env.FRONTEND_URL || 'odaa-blog-family-4hfy.vercel.app';
const allowedOrigins = FRONTEND_URLS.split(',').map((u) => u.trim()).filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
	// allow common local dev hosts
	allowedOrigins.push('http://localhost:5173', 'http://localhost:3000');
}

app.use(
	cors({
		origin: function (origin, callback) {
			// allow non-browser requests such as curl or server-to-server
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
			return callback(new Error('CORS policy disallows access from this origin'));
		},
	})
);

// Ensure uploads folder exists for local fallback
const fs = require('fs');
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

// Health endpoint that reports DB connection status
app.get('/health', (req, res) => {
	try {
		const mongoose = require('mongoose');
		const state = mongoose.connection.readyState; // 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
		const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
		res.json({ ok: state === 1, dbState: states[state] || state });
	} catch (err) {
		res.status(500).json({ ok: false, error: String(err) });
	}
});

// Only connect and listen when this file is run directly.
if (require.main === module) {
	const PORT = process.env.PORT || 5000;

	const startServer = async () => {
		if (process.env.SKIP_DB === 'true') {
			console.log('SKIP_DB=true — skipping MongoDB connection (development/test mode)');
		} else {
			await connectDB();
		}
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