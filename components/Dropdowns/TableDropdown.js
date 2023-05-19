import Link from "next/link";
import { useState, useRef, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const TableDropdown = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const token = Cookies.get("token");

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/${router.pathname
          .split("/")
          .pop()}/delete/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setIsModalOpen(false);
      toast.success("Data perhitungan berhasil di hapus");
      router.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If token is expired, log out the user or refresh the token
        Cookies.remove("token");
        toast.error("Token kedaluwarsa. Silahkan login kembali");
        router.push("/");
      } else {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  return (
    <Fragment>
      <div ref={dropdownRef} className="relative">
        <a
          className="text-slate-500 py-1 px-3 cursor-pointer"
          onClick={toggleDropdown}
        >
          <i className="fas fa-ellipsis-v"></i>
        </a>
        {isOpen && (
          <div className="absolute z-50 right-0 top-full mt-2">
            <div className="w-48 bg-white rounded-md shadow-lg">
              <Link
                href={`${router.pathname}/ubah/${id}`}
                className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <i className="fas fa-pen mr-2"></i>Ubah
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
              >
                <i className="fas fa-trash mr-2"></i>Hapus
              </a>
            </div>
          </div>
        )}
      </div>

      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto backdrop-blur-sm bg-white/30 z-50"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg px-4 py-6 sm:px-6 border-2 ">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-slate-900"
                    >
                      Hapus Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Anda yakin ingin menghapus item ini?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      // Perform delete operation with the provided id
                      handleDelete(id);
                    }}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

export default TableDropdown;
