import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PencilSquareIcon,
  PowerIcon,
  Bars3Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/journal");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <UserCircleIcon className="h-6 w-6" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        return (
        <MenuItem
          onClick={() => alert("the click works")}
          className="flex items-center gap-2 rounded"
        >
          <UserCircleIcon className="h-4 w-4" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => alert("the click works")}
          className="flex items-center gap-2 rounded"
        >
          <Cog6ToothIcon className="h-4 w-4" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Edit Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => alert("the click works")}
          className="flex items-center gap-2 rounded"
        >
          <InboxArrowDownIcon className="h-4 w-4" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Inbox
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => alert("the click works")}
          className="flex items-center gap-2 rounded"
        >
          <LifebuoyIcon className="h-4 w-4" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Help
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <PowerIcon className="h-4 w-4 text-red-500" strokeWidth="2" />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
        );
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Entries",
    icon: BookOpenIcon,
  },
  {
    label: "Calendar",
    icon: CalendarDaysIcon,
  },
  {
    label: "Friends",
    icon: UsersIcon,
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

// Main NavBar component
export function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen(cur => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <PencilSquareIcon className="h-6 w-6" />
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Journal++
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
