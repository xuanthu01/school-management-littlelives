import { ExportToCsv, Options } from 'export-to-csv';
import { utils, read, stream } from 'xlsx';
const options: Options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: `${new Date().toISOString()}_Report`,
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

const csvExporter = new ExportToCsv(options);

export default function exportCSV(data: any) {
  const d = csvExporter.generateCsv(data, true);
  return d;
  // const wb = read(d);
  // console.log("exportCSV -> wb", wb.Sheets['Sheet1'].A1)
  // return stream.to_csv(wb);
}
