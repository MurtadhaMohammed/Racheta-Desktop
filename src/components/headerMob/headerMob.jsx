import { Button, Space } from "antd";
import { FaUserInjured, FaClipboardList, FaFlask } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdDateRange } from "react-icons/md";

import { FiSearch } from "react-icons/fi";
import { useLocation, useParams } from "react-router-dom";
import { useAppStore } from "../../lib/store";
import { MenuMob } from "./menu";
import { useState } from "react";

export const HeaderMob = () => {
  const [isMenu, setIsMenu] = useState(false);
  const location = useLocation();
  const { selectedName } = useAppStore();
  let page = "/" + location.pathname.split("/")[1];

  const titles = [
    {
      key: "/",
      title: (
        <Space size={8}>
          <FaUserInjured size={18} />
          <b className="text-[20px]">Patients</b>
        </Space>
      ),
    },
    {
      key: "/patients",
      title: (
        <Space size={8}>
          <Button
            onClick={() => history.back()}
            type="text"
            icon={<IoIosArrowBack size={24} />}
          />
          <b className="text-[20px]">{selectedName}</b>
        </Space>
      ),
      child: true,
    },
    {
      key: "/schedule",
      title: (
        <Space size={8}>
          <MdDateRange size={18} />
          <b className="text-[20px]">Schedule</b>
        </Space>
      ),
    },
    {
      key: "/attachements",
      title: (
        <Space size={8}>
          <FaClipboardList size={18} />
          <b className="text-[20px]">Attachements</b>
        </Space>
      ),
    },
    {
      key: "/drugs",
      title: (
        <Space size={8}>
          <FaFlask size={18} />
          <b className="text-[20px]">Drugs</b>
        </Space>
      ),
    },
  ];

  return (
    <div className="sticky sm:hidden  p-[16px] bg-white border border-b-[#eee]">
      <div className="flex items-center justify-between">
        {titles?.find((el) => el.key === page)?.title}
        <Button
          className="flex items-center justify-center"
          type="text"
          onClick={() => setIsMenu(true)}
          icon={<IoMenu size={28} />}
        />
      </div>
      {!titles?.find((el) => el.key === page)?.child && (
        <div className="flex items-center justify-between bg-[#f6f6f6] border border-[#f6f6f6] rounded-[8px] py-[12px] px-[16px] mt-[12px]">
          <input
            className="bg-[#f6f6f6] w-full text-[18px] outline-0"
            placeholder="Search..."
          />
          <FiSearch className="opacity-40" size={22} />
        </div>
      )}
      <MenuMob open={isMenu} onClose={() => setIsMenu(false)} page={page} />
    </div>
  );
};