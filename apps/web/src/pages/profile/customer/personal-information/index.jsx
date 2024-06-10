import { Input, Radio } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../../components/base/select";
import foto from "../../../../assets/images/profile/Mask Group.png";

export default function PersonalInformation() {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState([]);

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
              <Input label="Johanes Mikael" />
            </div>
          </div>
          <div className="flex gap-10 justify-end items-center ">
            <label htmlFor="" className="text-gray-400 text-end">
              Email
            </label>
            <div className="w-2/3">
              <Input label="Johanes Mikael" />
            </div>
          </div>
          <div className="flex gap-10 justify-end items-center ">
            <label htmlFor="" className="text-gray-400 text-end">
              Phone Number
            </label>
            <div className="w-2/3">
              <Input label="Johanes Mikael" />
            </div>
          </div>
          <div className="flex gap-10 justify-end items-center ">
            <label htmlFor="" className="text-gray-400 text-end">
              Gender
            </label>
            <div className="flex gap-10 w-2/3">
              <Radio name="type" label="Male" color="orange" />
              <Radio name="type" label="Female" color="orange" />
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
          <img src={foto} alt="" className="w-28 h-28" />
          <button className="border-2 border-gray-200 rounded-full py-1 px-3 mt-5 text-sm text-gray-500">
            Select image
          </button>
        </div>
      </div>
    </>
  );
}
