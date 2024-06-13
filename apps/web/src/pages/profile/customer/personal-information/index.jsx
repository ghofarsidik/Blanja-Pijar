import { Input, Radio } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../../components/base/select";
import foto from "../../../../assets/images/profile/Mask Group.png";

export default function PersonalInformation({ activeUser }) {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [detailProfile, setDetailProfile] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
  });
  console.log(detailProfile);
  const handleChange = (e) => {
    setDetailProfile({ ...detailProfile, [e?.target?.name]: e?.target?.value });
  };
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  useEffect(() => {
    const days = Array.from(
      { length: dayjs(`${selectedYear}-${selectedMonth}`).daysInMonth() },
      (_, i) => i + 1
    );
    setDaysInMonth(days);
  }, [selectedYear, selectedMonth]);
  useEffect(() => {
    setDetailProfile({
      ...detailProfile,
      name: activeUser?.name,
      phone_number: activeUser?.phone_number,
      gender: activeUser?.gender,
      email: activeUser?.email,
    });
  }, []);
  return (
    <>
      <div className="border-b border-gray-300 py-3">
        <h1 className="font-semibold text-2xl leading-relaxed">My Profile</h1>
        <p className="text-gray-500">Manage your profile information</p>
      </div>
      <div className="flex justify-between py-10">
        <div className="w-[520px] flex flex-col gap-y-5 text-end pr-18">
          <div className="flex gap-10 justify-end items-center">
            <label htmlFor="" className="text-gray-400 text-end">
              Name
            </label>
            <div className="w-2/3">
              <Input
                onChange={(e) => handleChange(e)}
                label="Name"
                value={detailProfile?.name}
                name="name"
              />
            </div>
          </div>
          <div className="flex gap-10 justify-end items-center ">
            <label htmlFor="" className="text-gray-400 text-end">
              Email
            </label>
            <div className="w-2/3">
              <Input
                onChange={(e) => handleChange(e)}
                label="Email"
                value={detailProfile?.email}
                name="email"
              />
            </div>
          </div>
          <div className="flex gap-10 justify-end items-center ">
            <label htmlFor="" className="text-gray-400 text-end">
              Phone Number
            </label>
            <div className="w-2/3">
              <Input
                onChange={(e) => handleChange(e)}
                label="Phone Number"
                value={detailProfile?.phone_number}
                name="phone_number"
              />
            </div>
          </div>
          <div className="flex gap-10 justify-end items-center ">
            <label htmlFor="" className="text-gray-400 text-end">
              Gender
            </label>
            <div className="flex gap-10 w-2/3">
              <Radio
                name="type"
                label="Male"
                color="red"
                value={"male"}
                onChange={(e) =>
                  setDetailProfile({
                    ...detailProfile,
                    gender: e?.target?.value,
                  })
                }
                checked={detailProfile?.gender === "male"}
              />
              <Radio
                name="type"
                label="Female"
                color="red"
                value={"female"}
                onChange={(e) =>
                  setDetailProfile({
                    ...detailProfile,
                    gender: e?.target?.value,
                  })
                }
                checked={detailProfile?.gender === "female"}
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <label htmlFor="" className="text-gray-400 text-end">
              Date of birth
            </label>
            <div className="flex gap-5">
              <SelectOption>
                {daysInMonth.map((day, i) => (
                  <option key={i} value={day}>
                    {day}
                  </option>
                ))}
              </SelectOption>
              <SelectOption
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {dayjs()
                      .month(month - 1)
                      .format("MMMM")}
                  </option>
                ))}
              </SelectOption>
              <SelectOption
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </SelectOption>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 h-[150px] w-0.5"></div>
        <div className="w-[200px] items-center flex flex-col pr-20">
          <img
            src={activeUser?.image}
            alt=""
            className="w-28 h-28 rounded-full"
          />
          <button className="border-2 border-gray-200 rounded-full py-1 px-3 mt-5 text-sm text-gray-500">
            Select image
          </button>
        </div>
      </div>
    </>
  );
}
