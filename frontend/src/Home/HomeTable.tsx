import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getHunters } from "../api/statistics";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Progress } from "../components/ui/progress";

import { Fragment, useEffect, useState } from "react";

export function HomeTable() {
  const [filter, setFilter] = useState("SQUAD");
  const { data: fetchData } = useSuspenseQuery({
    queryKey: ["home-statistics"],
    queryFn: () => getHunters(filter),
  });
  const [data, setData] = useState(fetchData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    descending: boolean;
  } | null>(null);
  const queryClient = useQueryClient();

  const sortData = (key: keyof (typeof fetchData)[0]) => {
    const isAscending =
      sortConfig?.key === key
        ? !sortConfig.descending
        : sortConfig?.descending === undefined
          ? true
          : !sortConfig.descending;
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
    setSortConfig({ key, descending: isAscending });
  };

  const handleSelectChange = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["home-statistics"] });
  }, [filter]);

  useEffect(() => {
    setData(fetchData);
  }, [fetchData]);

  return (
    <Fragment>
      <Select onValueChange={handleSelectChange} defaultValue={filter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="스쿼드" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SQUAD">스쿼드</SelectItem>
          <SelectItem value="DUO">듀오</SelectItem>
        </SelectContent>
      </Select>
      <Table className={"text-lg"}>
        <TableCaption>A list of your supervives.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] cursor-pointer">순위</TableHead>
            <TableHead className="w-[100px] cursor-pointer">
              헌터 이름
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => sortData("win_rate")}
            >
              1위 비율{" "}
              {sortConfig?.key === "win_rate"
                ? sortConfig.descending
                  ? "↑"
                  : "↓"
                : "↑"}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => sortData("pick_rate")}
            >
              픽률{" "}
              {sortConfig?.key === "pick_rate"
                ? sortConfig.descending
                  ? "↑"
                  : "↓"
                : "↑"}
            </TableHead>
            <TableHead
              className="w-[100px] text-left cursor-pointer"
              onClick={() => sortData("average_rank")}
            >
              평균 등수{" "}
              {sortConfig?.key === "average_rank"
                ? sortConfig.descending
                  ? "↑"
                  : "↓"
                : "↑"}
            </TableHead>
            <TableHead
              className="w-[100px] text-left cursor-pointer"
              onClick={() => sortData("average_kd_rate")}
            >
              평균 K/D{" "}
              {sortConfig?.key === "average_kd_rate"
                ? sortConfig.descending
                  ? "↑"
                  : "↓"
                : "↑"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((hunter, idx) => (
            <TableRow key={idx}>
              <TableCell className={"w-[6%]"}>{idx + 1}위</TableCell>
              <TableCell className={"flex items-center gap-[10px]"}>
                <img
                  className={"w-[40px]"}
                  alt={"hunter image"}
                  src={hunter.hunter_avatar}
                />
                {hunter.hunter_name}
              </TableCell>
              <TableCell>
                <div className={"flex items-center justify-around"}>
                  <Progress className={"w-[60%]"} value={hunter.win_rate * 6} />
                  {hunter.win_rate}%
                </div>
              </TableCell>
              <TableCell>
                <div className={"flex items-center justify-around"}>
                  <Progress
                    className={"w-[60%]"}
                    value={hunter.pick_rate * 6}
                  />
                  {hunter.pick_rate}%
                </div>
              </TableCell>
              <TableCell>{hunter.average_rank}위</TableCell>
              <TableCell>{hunter.average_kd_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
