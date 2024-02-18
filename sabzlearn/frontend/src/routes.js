
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
import Session from "./Pages/AdminPanel/Session/Session";
import SessionInfo from "./Pages/SessionInfo/SessionInfo";
import Comments from "./Pages/AdminPanel/Comments/Comments";
import Offs from "./Pages/AdminPanel/Offs/Offs"
import Draft from "./Pages/AdminPanel/AdminArticles/Draft";
import MainPage from "./Pages/AdminPanel/MainPage/MainPage";
import UserIndex from "./Pages/UserPanel/UserIndex/UserIndex";
import UserPanelMain from "./Pages/UserPanel/MainPage/UserPanelMain";
import Orders from "./Pages/UserPanel/Orders/Orders";
import MainOrder from "./Pages/UserPanel/Orders/MainOrder";
import PanelCourses from "./Pages/UserPanel/Courses/PanelCourses"
import SendTicket from "./Pages/UserPanel/Tickets/SendTicket/SendTicket";


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
    { path: "/:courseName/:sessionID", element: <SessionInfo /> },
    {
        path: "/panel-admin/*",
        element: <AdminIndex />,
        children: [
            { path: "", element: <MainPage /> },
            { path: "users", element: <Users /> },
            { path: "courses", element: <AdminCourses /> },
            { path: "menus", element: <Menus /> },
            { path: "articles", element: <AdminArticles /> },
            { path: "articles/draft/:shortName", element: <Draft /> },
            { path: "category", element: <AdminCategory /> },
            { path: "contact", element: <AdminContact /> },
            { path: "sessions", element: <Session /> },
            { path: "comments", element: <Comments /> },
            { path: "offs", element: <Offs /> },
        ]
    },
    {
        path: "/my-account/*",
        element: <UserIndex />,
        children: [
            { path: "", element: <UserPanelMain /> },
            { path: "orders", element: <Orders /> },
            { path: "orders/:ordersID", element: <MainOrder /> },
            { path: "buyed", element: <PanelCourses /> },
            { path: "send-ticket", element: <SendTicket/> },
            // { path: "menus", element: <Menus /> },
            // { path: "articles", element: <AdminArticles /> },
            // { path: "articles/draft/:shortName", element: <Draft /> },
            // { path: "category", element: <AdminCategory/> },
            // { path: "contact", element: <AdminContact/> },
            // { path: "sessions", element: <Session/> },
            // { path: "comments", element: <Comments/> },
            // { path: "offs", element: <Offs/> },
        ]
    },
]

export default routes