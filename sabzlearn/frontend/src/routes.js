
import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Articles from "./Pages/Articles/Articles";
import Contact from "./Pages/Contact/Contact";
import Search from "./Pages/Search/Search";
import AdminIndex from "./Pages/AdminPanel/Index/AdminIndex";
import Users from "./Pages/AdminPanel/Users/Users";
import AdminCourses from "./Pages/AdminPanel/Courses/AdminCourses";
import Menus from "./Pages/AdminPanel/Menus/Menus";
import AdminArticles from "./Pages/AdminPanel/AdminArticles/AdminArticles";
import AdminCategory from "./Pages/AdminPanel/Category/AdminCategory";
import AdminContact from "./Pages/AdminPanel/AdminContact/AdminContact";


const routes = [
    { path: "/", element: <Index /> },
    { path: "/course-info/:courseName", element: <CourseInfo /> },
    { path: "/category-info/:categoryName/:page", element: <Category /> },
    { path: "/article-info/:articleName", element: <ArticleInfo /> },
    { path: "/contact", element: <Contact /> },
    { path: "/courses/:page", element: <Courses /> },
    { path: "/articles/:page", element: <Articles /> },
    { path: "/login/", element: <Login /> },
    { path: "/register/", element: <Register /> },
    { path: "/search/:value", element: <Search /> },
    {
        path: "/panel-admin/*",
        element: <AdminIndex />,
        children: [
            { path: "users", element: <Users /> },
            { path: "courses", element: <AdminCourses /> },
            { path: "menus", element: <Menus /> },
            { path: "articles", element: <AdminArticles /> },
            { path: "category", element: <AdminCategory/> },
            { path: "contact", element: <AdminContact/> },
        ]
    },
]

export default routes