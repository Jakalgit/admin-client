import Admin from './page/admin/Admin';
import {
    ADMIN_ROUTE,
    CHANGE_TAG_ROUTE,
    CHANGEITEM_ROUTE, CHATS_ROUTE,
    CREATE_TAG_ROUTE,
    CREATEITEM_ROUTE,
    FINDCHANGE_ROUTE,
    ORDERPAGE_ROUTE,
    ORDERS_ROUTE,
    REQUEST_REPAIR_ROUTE,
} from "./utils/consts";
import CreateTag from "./page/admin/CreateTag";
import CreateItem from "./page/admin/CreateItem";
import Orders from './page/admin/Orders'
import FindChange from "./page/admin/FindChange";
import ChangeItem from "./page/admin/ChangeItem";
import OrderPage from "./page/admin/OrderPage";
import RequestRepair from "./page/admin/RequestRepair";
import Chats from "./page/admin/Chats";
import AdminChat from "./page/admin/AdminChat";
import ChangeTag from "./page/admin/ChangeTag";

export const routes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_TAG_ROUTE,
        Component: CreateTag
    },
    {
        path: CREATEITEM_ROUTE,
        Component: CreateItem
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERPAGE_ROUTE + '/:id',
        Component: OrderPage
    },
    {
        path: CHANGE_TAG_ROUTE,
        Component: ChangeTag
    },
    {
        path: FINDCHANGE_ROUTE,
        Component: FindChange
    },
    {
        path: CHANGEITEM_ROUTE + '/:id',
        Component: ChangeItem
    },
    {
        path: REQUEST_REPAIR_ROUTE,
        Component: RequestRepair
    },
    {
        path: CHATS_ROUTE,
        Component: Chats
    },
    {
        path: CHATS_ROUTE + '/:chatId',
        Component: AdminChat
    }
]