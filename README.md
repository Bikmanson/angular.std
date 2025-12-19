# Angular 19 Monorepo Project

A comprehensive Angular 19 monorepo showcasing modern Angular development with two applications: an admin panel for data management and a user-facing task management app.

## 🚀 Features

### Admin App
- **User Management**: Full CRUD operations for users with role assignment
- **Task Management**: Create, edit, and assign tasks to users
- **Role-Based Access Control**: Different permissions for admins and editors
- **Real-time Data Updates**: Integration with JSON Server for mock API

### User App
- **Task List**: View all assigned tasks with filtering and pagination
- **Task Details**: Detailed view with commenting functionality
- **Real-time Updates**: Using Angular Signals for reactive state management
- **Task Completion**: Mark tasks as completed
- **Responsive Design**: Mobile-friendly interface

### Shared Library
- Reusable components (Table, Alert, Breadcrumbs)
- Shared services (Gateway for HTTP operations)
- Common interfaces and utilities
- Consistent styling and theming

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19 or higher)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-app.std
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Angular CLI globally (if not already installed)**
   ```bash
   npm install -g @angular/cli@19
   ```

## 🏃 Running the Applications

### Start JSON Server (Mock API)
```bash
npm run db
```
This will start JSON Server on `http://localhost:3000`

### Start Admin App
```bash
npm run start:admin
```
Navigate to `http://localhost:4200`

### Start User App
```bash
npm run start:user
```
Navigate to `http://localhost:4200`

**Note**: Run admin and user apps in separate terminal windows, or use different ports.

## 📁 Project Structure

```
angular-app.std/
├── projects/
│   ├── apps/
│   │   ├── admin/              # Admin application
│   │   │   └── src/
│   │   │       └── app/
│   │   │           ├── components/
│   │   │           │   ├── users/       # User list
│   │   │           │   ├── user/        # User form
│   │   │           │   ├── tasks/       # Task list
│   │   │           │   └── task-form/   # Task form
│   │   │           ├── core/
│   │   │           │   ├── app.config.ts
│   │   │           │   └── app.routes.ts
│   │   │           └── interfaces/
│   │   │
│   │   └── user/               # User application
│   │       └── src/
│   │           └── app/
│   │               ├── components/
│   │               │   ├── task-list/      # Task list with filters
│   │               │   └── task-detail/    # Task detail view
│   │               ├── core/
│   │               └── interfaces/
│   │
│   └── shared/                 # Shared library
│       ├── components/
│       │   ├── alert/
│       │   ├── breadcrumbs/
│       │   └── table/
│       ├── services/
│       │   └── gateway.service.ts
│       ├── interfaces/
│       ├── constants/
│       └── utils/
│
├── db.json                     # Mock database
├── angular.json                # Angular workspace config
├── package.json
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
└── README.md
```

## 🎯 Available Scripts

### Development
- `npm run start:admin` - Start admin app in development mode
- `npm run start:user` - Start user app in development mode
- `npm run db` - Start JSON Server on port 3000

### Build
- `npm run build:admin` - Build admin app for production
- `npm run build:user` - Build user app for production
- `npm run build` - Build both apps

### Code Quality
- `npm run lint` - Lint all files
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm test` - Run unit tests

### SSR (Server-Side Rendering)
- `npm run serve:ssr:admin` - Serve admin app with SSR
- `npm run serve:ssr:user` - Serve user app with SSR

## 🗄️ Database Schema

The `db.json` file contains the following collections:

### Users
```json
{
  "id": number,
  "name": string,
  "email": string,
  "roleId": number
}
```

### Tasks
```json
{
  "id": number,
  "title": string,
  "description": string,
  "status": "pending" | "in-progress" | "completed",
  "priority": "low" | "medium" | "high",
  "dueDate": string,
  "assignedTo": number,
  "createdAt": string,
  "completedAt": string,
  "comments": []
}
```

### Roles
```json
{
  "id": number,
  "name": string
}
```

## 🎨 Technologies Used

- **Angular 19**: Latest Angular framework with standalone components
- **Angular Signals**: For reactive state management
- **PrimeNG**: UI component library
- **Bootstrap**: For responsive layouts
- **RxJS**: Reactive programming
- **JSON Server**: Mock REST API
- **TypeScript**: Type-safe development
- **SCSS**: Styling
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality

## 🔧 Configuration

### Path Aliases
The project uses TypeScript path aliases for cleaner imports:
- `@shared/*` - Points to the shared library

### Environment Variables
Environment-specific configurations can be added in:
- `projects/apps/admin/src/environments/`
- `projects/apps/user/src/environments/`

## 🧪 Testing

Unit tests are written using Jasmine and Karma. Test files are located next to their corresponding component files with the `.spec.ts` extension.

Run tests with:
```bash
npm test
```

## 📝 Code Quality

### ESLint
The project uses ESLint with Angular-specific rules. Configuration is in `.eslintrc.json`.

### Prettier
Code formatting is enforced using Prettier. Configuration is in `.prettierrc`.

### Pre-commit Hooks
Husky is configured to run linting and formatting before each commit to ensure code quality.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates optimized production builds in the `dist/` folder.

### SSR Deployment
The apps support Server-Side Rendering for improved performance and SEO:
```bash
# Build with SSR
npm run build:admin
npm run build:user

# Serve with SSR
npm run serve:ssr:admin
npm run serve:ssr:user
```

## 📚 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [PrimeNG Documentation](https://primeng.org)
- [RxJS Documentation](https://rxjs.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🎉**

