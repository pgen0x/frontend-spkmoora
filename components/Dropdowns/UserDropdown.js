import React from "react";
import { createPopper } from "@popperjs/core";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import Link from "next/link";

const UserDropdown = ({ isMobile }) => {
  const router = useRouter();
  const email = Cookies.get("email");

  const signOutUser = () => {
    Cookies.remove("email");
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <>
      <div className="relative flex w-full flex-wrap items-stretch">
        <Menu>
          <Menu.Button>
            <img
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
              src="/img/avatar.png"
            />
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 mt-16 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
            <Link href={"/admin/profile"}>
              <div className="block px-4 py-3">
                <p className="text-sm leading-5">Masuk sebagai</p>
                <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                  {email}
                </p>
              </div>
            </Link>

            <div className="py-1 lg:pr-4">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      signOutUser();
                    }}
                    className={`${
                      active ? "bg-gray-100 text-gray-900 " : "text-gray-700"
                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </>
  );
};

export default UserDropdown;
