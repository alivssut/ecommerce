# Full-Stack Ecommerce Project

A modern, containerized Ecommerce platform featuring a **Django REST Framework** backend and a **React.js** frontend, orchestrated with **Docker** and **Nginx**.

## 📸 Product Preview
Below are the sample product images included in this project (`/images` directory):

| Product 1 | Product 2 | Product 3 | Product 4 |
|:---:|:---:|:---:|:---:|
| <img src="images/1.png" width="150"> | <img src="images/2.png" width="150"> | <img src="images/3.png" width="150"> | <img src="images/4.png" width="150"> |
| **Product 5** | **Product 6** | **Product 7** | **Product 8** |
| <img src="images/5.png" width="150"> | <img src="images/6.png" width="150"> | <img src="images/7.png" width="150"> | <img src="images/8.png" width="150"> |

---

## 🏗 Project Architecture

This project is divided into three main services:
- **Frontend**: React application (Single Page Application).
- **Backend**: Django API with Gunicorn production server.
- **Reverse Proxy**: Nginx handling requests and serving static/media files.
- **Database**: PostgreSQL for persistent data storage.

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation & Setup

1. **Clone the Repository:**
```bash
   git clone https://github.com/alivssut/ecommerce.git
   cd ecommerce
   
