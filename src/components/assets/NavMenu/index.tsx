import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import ProfilePicture from "../ProfilePicture";
import { useUser } from "../../../services/user/query";
import { useSearchParams } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavMenu() {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const userQuery = useUser();
  const userId = userQuery?.data?.data?._id || "";
  const searchParams = useSearchParams();

  useEffect(() => {
    if (userQuery?.isSuccess) {
      localStorage.setItem("firstTime", userQuery.data?.data?.firstTime);
    }
  }, [userQuery?.dataUpdatedAt]);

  return (
    <>
      {modalDisplay && <ProfilePicture setModalDisplay={setModalDisplay} />}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={`https://${import.meta.env.VITE_APP_BUCKET_NAME}.s3.${
                import.meta.env.VITE_APP_REGION
              }.amazonaws.com/${
                import.meta.env.VITE_APP_FOLDER_NAME
              }/${userId}.jpg?${new Date().getTime()}`}
              alt="Profile picture"
              onError={({ currentTarget }) => {
                currentTarget.src =
                  "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";
              }}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => setModalDisplay(true)}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                  onClick={() => {
                    localStorage.removeItem("name");
                    localStorage.removeItem("firstTime");
                    searchParams[1]({});
                    window.location.reload();
                  }}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default NavMenu;
