import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // 1. Якщо користувач взагалі не залогінений — на сторінку входу
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Якщо роль не збігається (наприклад, юзер лізе в адмінку) — на головну
  if (requiredRole && user.role !== requiredRole) {
    alert("У вас немає прав доступу до цієї сторінки!");
    return <Navigate to="/" replace />;
  }

  // 3. Якщо все ок — показуємо вміст сторінки (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;