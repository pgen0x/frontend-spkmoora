import { useState, useRef, useEffect } from "react";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <a
          className="text-slate-500 py-1 px-3"
          href="#action"
          onClick={toggleDropdown}
        >
          <i className="fas fa-ellipsis-v"></i>
        </a>
        {isOpen && (
          <div className="absolute z-50 right-0 top-full mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
            <a
              href="#edit"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              onClick={() => {
                console.log("Another action clicked!");
                setIsOpen(false);
              }}
            >
              <i className="fas fa-pen mr-2"></i>Ubah
            </a>
            <a
              href="#delete"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              onClick={() => {
                console.log("Something else here clicked!");
                setIsOpen(false);
              }}
            >
              <i className="fas fa-trash mr-2"></i>Hapus
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown;
