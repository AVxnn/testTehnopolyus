import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { SEARCH_ITEMS } from "./apollo/comps/comps";
import { motion, useScroll, useSpring } from "framer-motion";
import { getTimeHM, getTimeUnix } from "./features/getTimeUnix";

function App() {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState([]);
  const [value, setValue] = useState("");
  const [sortPc, setSortPc] = useState("desc");
  const [sortCount, setSortCount] = useState("desc");

  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { data } = useQuery(SEARCH_ITEMS, {
    variables: {
      searchTerm: value,
      sortByComputer: sortPc,
      sortByPrice: sortCount,
    },
  });

  useEffect(() => {
    if (data?.comps.length > 0) {
      setDatas(data.comps);
    } else {
      setDatas([]);
    }
  }, [data]);

  return (
    <>
      <div className="max-w-screen-lg w-full flex gap-6 flex-col">
        <div className="w-1/1 max-w-screen-lg w-full p-4 mx-auto bg-gray-50 rounded-xl shadow-sm flex items-center space-x-4">
          <div className="flex w-full gap-x-4">
            <div className="flex relative w-full items-center">
              <svg
                className="absolute w-5 h-5 left-3 mr-2 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
              </svg>
              <input
                id="text-bron"
                name="text"
                onChange={(e) => setValue(e.target.value)}
                type="text"
                required
                className="flex-auto text-gray-700 bg-gray-50 text-lg border border-gray-300 rounded-lg max-w-96 w-full bg-white/5 pl-11 pr-3.5 py-2 shadow-sm focus:border-indigo-500 sm:leading-6"
                placeholder="Поиск по статусу"
              />
            </div>

            <div className="flex relative w-full flex-row-reverse">
              <button
                className="bg-white flex gap-2 border rounded-lg border-gray-300 text-gray-700 px-3 py-2"
                onClick={handleToggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="fill-gray-700"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path>
                </svg>
                <span>Фильтры</span>
              </button>

              {isDropdownOpen ? (
                <div className="absolute z-10 top-12 max-w-64 w-full right-0 rounded-lg border-gray-300 bg-white border shadow-md mt-2 py-2 px-4">
                  <div className="container mx-auto p-4">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sortByPrice"
                      >
                        Сорт. по стоимости:
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sortByPrice"
                        onChange={(e) => setSortCount(e.target.value)}
                      >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sortByComputer"
                      >
                        Сорт. по компьютерам:
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sortByComputer"
                        onChange={(e) => setSortPc(e.target.value)}
                      >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {datas.length > 0 ? (
          <>
            <div className="overflow-x-auto bg-gray-50 border rounded-xl shadow-sm">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="h-12 p-4">
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Устройство
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Зона
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Дата
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Время начала
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Время окончания
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Стоимость
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b">
                      Статус
                    </th>
                    <th className="py-2 px-4 text-xs text-gray-500 border-b"></th>
                  </tr>
                </thead>
                <tbody className="h-full p-4">
                  {datas.map(
                    (item: {
                      status: string;
                      count: number;
                      time_end: number;
                      time_start: number;
                      date: number;
                      zone: number;
                      pc: number;
                    }) => {
                      return (
                        <tr key={item.pc} className="h-20 p-4">
                          <td className="py-2 px-4 border-b">
                            <span className="bg-red-500 border border-gray-500 text-white py-1 px-2 rounded-xl">
                              {item.pc}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b">
                            <span className="bg-yellow-200 border border-gray-500 text-gray-700 py-1 px-2 rounded-xl">
                              {item.zone === 1 ? "VIP" : "DEFAULT"}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b">
                            <span className="bg-gray-500 border-1 border-gray-300 text-white py-2 px-2 rounded-xl">
                              {getTimeUnix(item.date)}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b text-gray-700">
                            {getTimeHM(item.time_start)}
                          </td>
                          <td className="py-2 px-4 border-b text-gray-700">
                            {getTimeHM(item.time_end)}
                          </td>
                          <td className="py-2 px-4 border-b text-gray-700">
                            {item.count} руб.
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.status === "success" ? (
                              <span className="bg-green-300 border border-gray-500 text-gray-700 py-1 px-2 rounded-xl">
                                {item.status}
                              </span>
                            ) : item.status === "wait" ? (
                              <span className="bg-yellow-200 border border-gray-500 text-gray-700 py-1 px-2 rounded-xl">
                                {item.status}
                              </span>
                            ) : (
                              <span className="bg-red-300 border border-gray-500 text-gray-700 py-1 px-2 rounded-xl">
                                {item.status}
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button className="flex relative items-start justify-center text-left w-8 h-8 p-0 bg-white hover:bg-red-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-gray-400 absolute top-1"
                              >
                                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              <div className="flex w-full p-4 justify-between items-center">
                <button className="bg-white h-9 flex gap-2 border rounded-lg border-gray-100 text-gray-200 px-3 py-1 hover:border-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-gray-200"
                  >
                    <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
                  </svg>
                  <span>Previous</span>
                </button>
                <div className="flex gap-2">
                  <button className="bg-red-100 w-10 h-10 text-center gap-2 rounded-lg text-red-500 px-3 py-2">
                    <span>1</span>
                  </button>
                </div>
                <button className="bg-white h-9 flex gap-2 border rounded-lg border-gray-300 text-gray-700 px-3 py-1">
                  <span>Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-gray-700"
                  >
                    <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <span className="w-fill bg-white rounded-lg text-center p-10">
            Loading...
          </span>
        )}
      </div>
      <div className="block">
        <div className="progress">
          <div className="progress">
            <div className="progress-block"></div>
            <motion.div className="progress-bar" style={{ scaleY: scaleY }} />
          </div>
        </div>
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10.12 22a7.71 7.71 0 0 0 6.57-5 7.23 7.23 0 0 0 .46-3.21 3.26 3.26 0 0 1 1-2.57l.61-.61A3.89 3.89 0 0 0 19.43 6l2.28-2.28-1.42-1.43L18 4.55a3.82 3.82 0 0 0-4.66.57l-.75.75a3.22 3.22 0 0 1-2.52 1 7.05 7.05 0 0 0-3.32.57A7.75 7.75 0 0 0 2 14.11 7.59 7.59 0 0 0 10.12 22zM9.5 9.25v1.5a3.75 3.75 0 0 0-3.75 3.75h-1.5A5.26 5.26 0 0 1 9.5 9.25z"></path>
          </svg>
        </div>
        <div className="icon-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <ellipse cx="12.07" cy="7" rx="3" ry="1.71"></ellipse>
            <path d="M12.07 22c4.48 0 8-2.2 8-5V7c0-2.8-3.52-5-8-5s-8 2.2-8 5v10c0 2.8 3.51 5 8 5zm0-18c3.53 0 6 1.58 6 3a2 2 0 0 1-.29.87c-.68 1-2.53 2-5 2.12h-1.39C8.88 9.83 7 8.89 6.35 7.84a2.16 2.16 0 0 1-.28-.76V7c0-1.42 2.46-3 6-3z"></path>
          </svg>
        </div>
        <div className="icon-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7.08 11.25A4.84 4.84 0 0 1 8 9.05L4.43 5.49A9.88 9.88 0 0 0 2 11.25zM9.05 8a4.84 4.84 0 0 1 2.2-.91V2a9.88 9.88 0 0 0-5.76 2.43zm3.7-6v5A4.84 4.84 0 0 1 15 8l3.56-3.56A9.88 9.88 0 0 0 12.75 2zM8 15a4.84 4.84 0 0 1-.91-2.2H2a9.88 9.88 0 0 0 2.39 5.76zm3.25 1.92a4.84 4.84 0 0 1-2.2-.92l-3.56 3.57A9.88 9.88 0 0 0 11.25 22zM16 9.05a4.84 4.84 0 0 1 .91 2.2h5a9.88 9.88 0 0 0-2.39-5.76zM15 16a4.84 4.84 0 0 1-2.2.91v5a9.88 9.88 0 0 0 5.76-2.39zm1.92-3.25A4.84 4.84 0 0 1 16 15l3.56 3.56A9.88 9.88 0 0 0 22 12.75z"></path>
          </svg>
        </div>
      </div>
    </>
  );
}

export default App;
