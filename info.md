## Tables

1. User table
   Contains
   ID
   EMAIL
   password_hash
   google_id
   Role - User/admin
   created_at
   updated_at

2. Support Task table - where we are using for the support our tasks
   Contains
   ID
   Title
   Status
   User_id

3. Banner Table - Upload the images
   Contains
   ID
   Image_URL - STORE in cloudinary
   cloudinary_url
   cloudinary_unique_id
   created_at
   updated_at
