import { createBrowserRouter } from "react-router-dom"

import Contents from "../pages/contents"
import Authors from "../pages/authors"
import { ProtectedRoute } from "./protectedRoute"
import { AdminLayout } from "../layouts/AdminLayout"
import ContentDetail from "../pages/contents/contentDetail/contentDetail"
import CreateContent from "../pages/createContent/createContent"
import MyContents from "../pages/myContents/myContents"
import PurchasedContents from "../pages/purchasedContents/purchasedContents"
import PendingContents from "../pages/pendingContents/pendingContents"
import GrantAccess from "../pages/grantAccess/grantAccess"
import AuthPage from "../pages/auth/auth"

export const rootRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute
        children={<AdminLayout />}
        allowedRoles={["admin", "user", "author"]}
      />
    ),
    children: [
      {
        path: "/dashboard/contents",
        element: (
          <ProtectedRoute
            children={<Contents />}
            allowedRoles={["admin", "user"]}
          />
        ),
        errorElement: <div>Not Found</div>,
      },

      {
        path: "/dashboard/contents/:id",
        element: (
          <ProtectedRoute
            children={<ContentDetail />}
            allowedRoles={["admin", "user", "author"]}
          />
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: "/dashboard/authors",
        element: (
          <ProtectedRoute children={<Authors />} allowedRoles={["admin"]} />
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: "/dashboard/mycontents",
        element: (
          <ProtectedRoute children={<MyContents />} allowedRoles={["author"]} />
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: "/dashboard/purchasedcontents",
        element: (
          <ProtectedRoute
            children={<PurchasedContents />}
            allowedRoles={["author"]}
          />
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: "/dashboard/pendingcontents",
        element: (
          <ProtectedRoute
            children={<PendingContents />}
            allowedRoles={["admin"]}
          />
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: "/dashboard/grantaccess",
        element: (
          <ProtectedRoute
            children={<GrantAccess />}
            allowedRoles={["author"]}
          />
        ),
        errorElement: <div>Not Found</div>,
      },
      {
        path: "/dashboard/create",
        element: (
          <ProtectedRoute
            children={<CreateContent />}
            allowedRoles={["author"]}
          />
        ),
        errorElement: <div>Not Found</div>,
      },
    ],
  },
])
