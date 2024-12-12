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

type Hunter = {
  hunter_avatar: string;
  hunter_name: string;
  win_rate: number;
  pick_rate: number;
  average_rank: number;
  average_kd_rate: number;
};

type SortConfig = {
  key: keyof Hunter;
  descending: boolean;
} | null;

export function HomeTable() {
  const [filter, setFilter] = useState<string>("SQUAD");
  const { data: fetchData } = useSuspenseQuery<Hunter[]>({
    queryKey: ["home-statistics"],
    queryFn: () => getHunters(filter),
  });
  const [data, setData] = useState<Hunter[]>(fetchData);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const queryClient = useQueryClient();

  const sortData = (key: keyof Hunter) => {
    const isDescending =
      sortConfig?.key === key ? !sortConfig.descending : false;
    const sortedData = [...data].sort((a, b) => {
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return isDescending
          ? b[key].localeCompare(a[key])
          : a[key].localeCompare(b[key]);
      }
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return isDescending ? b[key] - a[key] : a[key] - b[key];
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, descending: isDescending });
  };

  const handleSelectChange = (value: string) => setFilter(value);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["home-statistics"] });
  }, [filter, queryClient]);

  useEffect(() => setData(fetchData), [fetchData]);

  const renderSortIndicator = (key: keyof Hunter) => {
    if (sortConfig?.key === key) {
      return sortConfig.descending ? "↓" : "↑";
    }
    return "↑";
  };

  const renderProgress = (value: number, multiplier: number) => (
    <div className="flex items-center justify-around">
      <Progress className="w-[60%]" value={value * multiplier} />
      {value}%
    </div>
  );

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
      <Table className="text-lg">
        <TableCaption>A list of your supervives.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">순위</TableHead>
            <TableHead className="w-[100px]">헌터 이름</TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => sortData("win_rate")}
            >
              1위 비율 {renderSortIndicator("win_rate")}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => sortData("pick_rate")}
            >
              픽률 {renderSortIndicator("pick_rate")}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => sortData("average_rank")}
            >
              평균 등수 {renderSortIndicator("average_rank")}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => sortData("average_kd_rate")}
            >
              평균 K/D {renderSortIndicator("average_kd_rate")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((hunter, idx) => (
            <TableRow key={idx}>
              <TableCell className="w-[6%]">{idx + 1}위</TableCell>
              <TableCell className="flex items-center gap-[10px]">
                <img
                  className="w-[40px]"
                  alt="hunter avatar"
                  src={hunter.hunter_avatar}
                />
                {hunter.hunter_name}
              </TableCell>
              <TableCell>{renderProgress(hunter.win_rate, 6)}</TableCell>
              <TableCell>{renderProgress(hunter.pick_rate, 6)}</TableCell>
              <TableCell>{hunter.average_rank}위</TableCell>
              <TableCell>{hunter.average_kd_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
