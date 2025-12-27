import { Icon } from "@iconify/react";

export default function Navbar() {
  return (
    <div className="shadow py-4 px-10 flex justify-between items-center bg-white">
      <div className="flex items-center gap-1">
        <img src="/src/assets/Logo.png" alt="Logo" className="h-8" />
        <h1 className="text-2xl inter-font text-gray-700 flex items-center">
          Review
          <span className="mx-1 text-transparent bg-clip-text bg-[linear-gradient(136.93deg,#D100F3_9.08%,#002BC5_108.36%)]">
            &
          </span>
          <span className="text-black font-bold">RATE</span>
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-[350px] border border-gray-300 rounded px-4 py-2 flex items-center gap-2">
          <input className="w-full outline-none poppins-regular" placeholder="Search..." />
          <Icon icon="akar-icons:search" className="w-6 h-6 text-[#8A00FF]" />
        </div>
        <button className="font-poppins-medium text-gray-900">SignUp</button>
        <button className="font-poppins-medium text-gray-900">Login</button>
      </div>
    </div>
  );
}
