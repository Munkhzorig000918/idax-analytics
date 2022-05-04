import * as XLSX from 'xlsx'

export const downloadExcel = (title, data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${title}.xlsx`);
}

export const imgLoader = ({ src, width }) => {
    return `${src}?w=${width}&q=75`
}