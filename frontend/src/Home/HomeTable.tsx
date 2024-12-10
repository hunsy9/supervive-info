import { useSuspenseQuery } from "@tanstack/react-query";
import { getHunters } from "../api/statistics";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HunterQueryData } from "../api/types";
import { useState } from "react";
//
// function sortByField<T extends keyof HunterQueryData>(
//   hunters: HunterQueryData[],
//   field: T,
//   ascending = true,
// ): HunterQueryData[] {
//   return hunters.sort((a, b) => {
//     const aValue = a[field];
//     const bValue = b[field];
//
//     if (typeof aValue === "string" && typeof bValue === "string") {
//       return ascending
//         ? aValue.localeCompare(bValue)
//         : bValue.localeCompare(aValue);
//     }
//
//     if (typeof aValue === "number" && typeof bValue === "number") {
//       return ascending ? aValue - bValue : bValue - aValue;
//     }
//
//     throw new Error("Invalid data type for sorting");
//   });
// }

export function HomeTable() {
  const { data: initialData } = useSuspenseQuery({
    queryKey: ["home-statistics"],
    queryFn: getHunters,
  });
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    ascending: boolean;
  } | null>(null);

  const sortData = (key: keyof (typeof initialData)[0]) => {
    const isAscending = sortConfig?.key === key ? !sortConfig.ascending : true;
    const sortedData = [...data].sort((a, b) => {
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return isAscending
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return isAscending ? a[key] - b[key] : b[key] - a[key];
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, ascending: isAscending });
  };
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead
            className="w-[100px] cursor-pointer"
            onClick={() => sortData("hunter_name")}
          >
            헌터{" "}
            {sortConfig?.key === "hunter_name" &&
              (sortConfig.ascending ? "↑" : "↓")}
          </TableHead>
          <TableHead
            className="w-[100px] cursor-pointer"
            onClick={() => sortData("win_rate")}
          >
            1위 비율{" "}
            {sortConfig?.key === "win_rate" &&
              (sortConfig.ascending ? "↑" : "↓")}
          </TableHead>
          <TableHead
            className="w-[100px] cursor-pointer"
            onClick={() => sortData("pick_rate")}
          >
            픽률{" "}
            {sortConfig?.key === "pick_rate" &&
              (sortConfig.ascending ? "↑" : "↓")}
          </TableHead>
          <TableHead
            className="w-[100px] text-left cursor-pointer"
            onClick={() => sortData("average_rank")}
          >
            평균 등수{" "}
            {sortConfig?.key === "average_rank" &&
              (sortConfig.ascending ? "↑" : "↓")}
          </TableHead>
          <TableHead
            className="w-[100px] text-left cursor-pointer"
            onClick={() => sortData("average_kd_rate")}
          >
            평균 K/D{" "}
            {sortConfig?.key === "average_kd_rate" &&
              (sortConfig.ascending ? "↑" : "↓")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((hunter) => (
          <TableRow key={hunter.hunter_name}>
            <TableCell className={"flex items-center gap-[10px]"}>
              <img
                className={"w-[25px]"}
                alt={"hunter image"}
                src={hunter.hunter_avatar}
              />
              {hunter.hunter_name}
            </TableCell>
            <TableCell>{hunter.win_rate}%</TableCell>
            <TableCell>{hunter.pick_rate}%</TableCell>
            <TableCell>{hunter.average_rank}</TableCell>
            <TableCell>{hunter.average_kd_rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
