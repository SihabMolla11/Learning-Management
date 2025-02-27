import { BsCcSquare } from "react-icons/bs";
import { FiHome } from "react-icons/fi";

export const sidebarItems = [
  {
    label: "Home",
    key: "/",
    icon: <FiHome />,
  },
  {
    label: "Manage Course",
    key: "/admin/dashboard/manage-course",
    icon: <BsCcSquare />,
  },
];
