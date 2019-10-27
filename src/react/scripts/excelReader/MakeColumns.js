import XLSX from 'xlsx';
/* generate an array of column objects */
export const make_cols = ws => {
    let result = [], columns = XLSX.utils.decode_range(ws['!ref']).e.c + 1;
    for(let i = 0; i < columns; ++i) result[i] = {name: ws[XLSX.utils.encode_cell({r: 0, c: i})].h, key:i}
    return result;
};