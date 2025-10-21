
This web app: Allows users to create, view, edit, delete, comment on, and upvote posts related to cars. Each post can optionally include an external image, additional text, a topic, a car model, and a random auto-generated username to simulate a real car enthusiast community.


---

## Features  
Features
- [x] **The user is able to perform all four CRUD operations**  
  - **Create**: Users can submit a new challenge via a form input.  
  - **Read**: All submitted challenges are displayed on the homepage.  
  - **Update**: Each challenge includes an edit button, allowing users to update its content.  
  - **Delete**: A delete button is provided to remove a challenge from the database and the homepage.

- [x] **All submitted posts can be read on the homepage**  
  - - A list of all posts is dynamically rendered and viewable, showing title, upvotes, and creation time by default.

- [x] **A create form allows users to submit a new post**    
  -  Form inputs include a title (required), optional content, optional external image URL, car model, and topic.

- [x] **A post can be updated once it has been submitted**  
  - An “Edit” feature enables users to revise the existing challenge details through a form.

- [x] **A post can be deleted once it has been submitted**  
  - Users can delete a challenge and it will be removed from both the database and frontend display.
     
- [x] **Users can interact with posts in different ways**  
  - Each post page includes:
    - Full content
    - Image
    - Comments section
    - Upvote button to increase the post's upvote count by one
    - Users can upvote any post unlimited time
 - [x] **Users can view posts in different ways**  
  - Users can sort posts by either:
    - Creation time (newest first)
    - Upvotes count (highest first)
  - Users can search posts by title or car model keywords.

---

## Video Walkthrough  
Here's a walkthrough of implemented user stories:

**GIF created with ShareX**  
- LocalHost GIF with SupaBase 
![chrome_jYkCHQaDY7](https://github.com/user-attachments/assets/e5745889-51bf-400a-aa0d-7140d8f091ef)
- Netlify GIF
![chrome_5DUfPfQRn1-ezgif com-optimize](https://github.com/user-attachments/assets/3a70deba-69b7-4fdc-83e1-e07954dead27)

---

## Notes  
**Some challenges encountered:**

- **Supabase Row-Level Security Policies**: Setting up insert, update, and select permissions for both posts and comments required careful attention to database roles and policies.
- **Dynamic Search and Sort**: Making sure that filtering posts by both title and car model while sorting live on the frontend required fine-tuning array filters and avoiding extra API calls.
- **UI Consistency Across Pages**: Designing a cohesive user interface across Create, Home, and PostDetail pages with different layouts while keeping it car-themed was a challenge, but it adds to the final polish of the project.

---

## License

    Copyright [2025] [Giovanni Nembhard]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
---
Netlify link for deployment
https://gnembhard-carforum-final.netlify.app/
