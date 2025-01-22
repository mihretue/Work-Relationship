import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useState } from "react";
import { getDataByUrl } from "../service/api";

export const CustomizableMantineTable = ({
  endPoint,
  columns,
  rowCount = 5,
  pageCount = 5,
  refetch = false,
  setRefetch,
  useNestedDataField = false,
  hasData = false,
  finalData = [],
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasData) {
      setLoading(true);
      getDataByUrl(endPoint)
        .then((res) => {
          
          const incomingData = useNestedDataField ? res?.data : res;
          // const sortedData = incomingData.sort(
          //   (a, b) =>
          //     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          // );
          console.log("sorted Data for work relation",incomingData)
          setData(incomingData);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        })
        .finally(() => {
          setLoading(false);
          setRefetch && setRefetch(false);
        });
    }
  }, [endPoint, refetch, hasData, useNestedDataField, setRefetch]);

  useEffect(() => {
    if (hasData) {
      console.log("Final Data:", hasData);
      setData(finalData);
    }
  }, [hasData, finalData]);
  console.log("Props in CustomizableMantineTable:", {
    hasData,
    finalData,
    endPoint,
    columns,
    refetch,
  });
  
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enableSorting
      enablePagination
      enableGlobalFilter
      enableStickyHeader
      rowCount={rowCount}
      pageCount={pageCount}
      state={{ isLoading: loading }}
      
    />
  );
};
