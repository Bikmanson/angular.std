# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Mock API (Terminal 1)
```bash
npm run db
```
This starts JSON Server on `http://localhost:3000`

### 3. Start the Admin App (Terminal 2)
```bash
npm run start:admin
```
Navigate to `http://localhost:4200`

**Admin App Features:**
- User Management: View, create, edit users
- Task Management: Create, assign, and manage tasks
- Navigate using the top menu: Users | Tasks

### 4. Start the User App (Terminal 3)
```bash
npm run start:user
```
Navigate to `http://localhost:4201` (or different port if 4200 is taken)

**User App Features:**
- View assigned tasks with filters
- Click any task to see details
- Add comments to tasks
- Mark tasks as completed

## 📊 Available Data

### Users (10 users)
- Viktor (Admin)
- Victory (Manager)
- Lena (Team Lead)
- Maxim (QA)
- And 6 more...

### Tasks (10 tasks)
- Various priorities: High, Medium, Low
- Different statuses: Pending, In Progress, Completed
- Assigned to different users

### Roles
- Admin
- Manager
- Team Lead
- Developer
- BA
- QA

## 🎯 Try These Features

### In Admin App:
1. **View Users**: Click "Users" in the navigation
2. **Edit a User**: Click on any user row
3. **Create Task**: Click "Tasks" → "Add New Task"
4. **Assign Task**: Select a user from the dropdown

### In User App:
1. **Filter Tasks**: Use status/priority dropdowns
2. **Search**: Type in the search box
3. **View Details**: Click "View" on any task
4. **Add Comment**: Scroll to bottom of task detail
5. **Complete Task**: Click "Mark as Completed"

## 🔧 Troubleshooting

**Port Already in Use?**
```bash
# For admin app
ng serve admin --port 4300

# For user app  
ng serve user --port 4400
```

**JSON Server not starting?**
- Check if port 3000 is available
- Try: `npm run db -- --port 3001`
- Update `projects/shared/constants/link.constant.ts` with new port

**Build Errors?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📝 Code Quality

Run before committing:
```bash
npm run lint:fix
npm run format
```

## 🧪 Testing

```bash
npm test
```

## 🎨 Customization

### Change Theme Colors
Edit the app component SCSS files:
- Admin: `projects/apps/admin/src/app/app.component.scss`
- User: `projects/apps/user/src/app/app.component.scss`

### Modify Data
Edit `db.json` and restart JSON Server

## 📚 Next Steps

1. Explore the shared library in `projects/shared/`
2. Add new components using Angular CLI
3. Implement authentication guards
4. Add more CRUD operations
5. Enhance UI with PrimeNG components

## 💡 Tips

- Both apps share the same API endpoint
- Changes in JSON Server are immediately reflected
- Angular Signals provide reactive state management
- All components are standalone (no NgModules)

Happy coding! 🎉

