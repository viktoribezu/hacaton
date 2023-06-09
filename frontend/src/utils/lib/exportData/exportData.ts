import { mockedObject } from "@/utils/consts/mockedData";
import { utils, writeFile } from "xlsx";


export const exportData = <T>(url: string, fileName  = "DataSheet", itemsMocked = mockedObject ) => {
    // set loading
    // TODO: Добавить запрос для получения данных

    const worksheet = utils.json_to_sheet(itemsMocked);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    writeFile(workbook, `${fileName}.xlsx`);
};