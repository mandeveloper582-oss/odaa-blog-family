API quick tests (curl)

1) Admin login (uses ADMIN_EMAIL & ADMIN_PASSWORD_HASH in .env)

curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"YourPlainPassword"}'

Response: { "token": "..." }

2) Create post with image (multipart)

curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer <TOKEN>" \
  -F "title=My Post" \
  -F "content=Hello from curl" \
  -F "image=@./path/to/image.jpg"

3) Get posts

curl http://localhost:5000/api/posts

4) Get single post (increments views)

curl http://localhost:5000/api/posts/<POST_ID>

5) Like post

curl -X POST http://localhost:5000/api/posts/<POST_ID>/like -H "Content-Type: application/json" -d '{}'

6) Comment

curl -X POST http://localhost:5000/api/posts/<POST_ID>/comment -H "Content-Type: application/json" -d '{"name":"Jane","text":"Nice post"}'

7) Delete comment (admin)

curl -X DELETE http://localhost:5000/api/posts/<POST_ID>/comment/<COMMENT_ID> -H "Authorization: Bearer <TOKEN>"

Notes:
- If Cloudinary is configured via env vars, images are uploaded to Cloudinary and `imageUrl` will be the secure URL.
- If not configured, images are stored in `backend/uploads` and served at `http://localhost:5000/uploads/<filename>`.
