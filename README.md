# Full-Stack Blog Application (React + Django)

A complete blog app where users can **Create, Read (view + search), Update, and Delete** blog posts.

- **Backend:** Django + Django REST Framework (REST API, SQLite database)
- **Frontend:** React (React Router, Axios)

---

## Project Structure

```
blog-project/
├── backend/                 # Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/              # Project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── blogapp/               # Blog app
│       ├── models.py          # Post model
│       ├── serializers.py     # DRF serializer
│       ├── views.py           # CRUD ViewSet + search
│       ├── urls.py            # API routes
│       ├── admin.py           # Django admin registration
│       └── migrations/
└── frontend/                 # React app
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js             # Routes
        ├── api.js             # Axios calls to Django API
        └── components/
            ├── Navbar.js
            ├── SearchBar.js
            ├── BlogList.js     # List + search + delete
            ├── BlogDetail.js   # View single post
            └── BlogForm.js     # Create / Edit form
```

---

## 1. Backend Setup (Django)

```bash
cd backend

# create & activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# create database tables
python manage.py makemigrations
python manage.py migrate

# (optional) create an admin user to use /admin/
python manage.py createsuperuser

# run the server
python manage.py runserver
```

The API will be live at **http://127.0.0.1:8000/api/posts/**

### API Endpoints

| Method | Endpoint                     | Description                          |
|--------|-------------------------------|---------------------------------------|
| GET    | `/api/posts/`                 | List all posts                        |
| GET    | `/api/posts/?search=term`     | Search posts by title/content/author  |
| POST   | `/api/posts/`                 | Create a new post                     |
| GET    | `/api/posts/{id}/`            | Retrieve a single post                |
| PUT    | `/api/posts/{id}/`            | Update a post (full)                  |
| PATCH  | `/api/posts/{id}/`            | Update a post (partial)               |
| DELETE | `/api/posts/{id}/`            | Delete a post                         |

Django admin is available at **http://127.0.0.1:8000/admin/**

---

## 2. Frontend Setup (React)

Open a **new terminal window** (keep Django running in the first one):

```bash
cd frontend

# install dependencies
npm install

# start the React dev server
npm start
```

The app will open at **http://localhost:3000**

The frontend is already configured to call the API at `http://127.0.0.1:8000/api`
(see `src/api.js`) — no extra configuration needed as long as the Django
server is running on port 8000.

---

## Features

- ✅ **Create** a new blog post (title, content, author)
- ✅ **View** all posts in a list, and view a single post in detail
- ✅ **Search** posts by title, content, or author
- ✅ **Edit / Update** an existing post
- ✅ **Delete** a post with a confirmation prompt
- ✅ CORS configured so React (port 3000) can talk to Django (port 8000)
- ✅ Django admin panel for managing posts directly

---

## Notes / Next Steps for Production

- `SECRET_KEY` and `DEBUG=True` in `backend/settings.py` are for local
  development only — replace before deploying.
- `CORS_ALLOW_ALL_ORIGINS = True` should be restricted to your real frontend
  domain in production.
- Add authentication (e.g. `djangorestframework-simplejwt`) if you want
  posts to be tied to logged-in users only.
- Switch `DATABASES` to PostgreSQL/MySQL for production use.
