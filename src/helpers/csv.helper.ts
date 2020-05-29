import { ExportToCsv, Options } from 'export-to-csv';

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
  return csvExporter.generateCsv(data, true);
}