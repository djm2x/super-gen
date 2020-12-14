import {  ElementRef } from '@angular/core';
// import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx/types';
// import * as excel from 'xlsx';
// import { saveAs, FileSaverOptions } from 'file-saver';

// @Injectable({
//   providedIn: 'root'
// })
export class ExcelService {
  excel: any;
  constructor() { }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

  async loadPdfMaker() {
    if (!this.excel) {
      const module = await import('xlsx');
      this.excel = module.default;
    }
  }

  async table_to_sheet(table: ElementRef) {
    await this.loadPdfMaker();

    const ws = this.excel.utils.table_to_sheet(table.nativeElement);
    const wb = this.excel.utils.book_new();
    this.excel.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.excel.writeFile(wb, `sheet_${new Date().toISOString()}.xlsx`);
  }

  async json_to_sheet(data: any[]) {
    await this.loadPdfMaker();

    const ws = this.excel.utils.json_to_sheet(data);
    const wb = this.excel.utils.book_new();
    this.excel.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.excel.writeFile(wb, `sheet_${new Date().toISOString()}.xlsx`);
  }



  // test106(datasource: { libelle: string, articles: Article[] }[], excelFileName = 'somename') {
  //   const sheetNames: string[] = datasource.map(e => e.libelle);

  //   const sheets: { [sheet: string]: XLSX.WorkSheet } = {};

  //   datasource.map((e, i) => {
  //     sheets[e.libelle] = XLSX.utils.json_to_sheet(e.articles);
  //   });

  //   const workbook: XLSX.WorkBook = {
  //     SheetNames: sheetNames, // <-- include the sheet names in the array
  //     Sheets: sheets
  //   };

  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   // return
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }



}
