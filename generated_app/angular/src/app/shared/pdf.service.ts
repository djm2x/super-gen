import { DatePipe } from '@angular/common';
// import { Injectable } from '@angular/core';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PageSize, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

// @Injectable({
//   providedIn: 'root'
// })
export class PdfService {
  pdfMake: any;
  // doc https://pdfmake.github.io/docs/document-definition-object/images/
  // play arround http://pdfmake.org/playground.html
  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;

      // this.pdfMake = pdfMake;
      // this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }
  }

  generatePdf(myBody: TableCell[][], format: PageSize, userName: string, title: string, border = false) {

    this.loadPdfMaker();
    if (!border) {
      myBody.forEach((e, i) => {
        e.forEach((o: any) => {
          o.border = [false, true, false, true];

          if (i === 0) {
            o.bold = true;
          }
        });
      });
    }

    // https://www.base64-image.de/
    // console.log(myBody);



    const documentDefinition: TDocumentDefinitions = {
      pageOrientation: 'portrait',
      pageSize: format,
      pageMargins: [15, 10],
      defaultStyle: {
        fontSize: 8,
        color: 'rgb(43, 43, 43)',
      },
      content: [
        { // title
          fontSize: 12,
          margin: [0, 7, 0, 5],
          decoration: 'underline',
          bold: true,
          alignment: 'center',
          text: title,
        },
        { // header
          fontSize: 10,
          margin: [0, 0, 0, 5],
          bold: true,
          columns: [
            {
              alignment: 'left',
              text: userName,
            },
            {
              alignment: 'right',
              text: `Le : ${new DatePipe('fr-FR').transform(new Date(), 'dd/MM/YYYY HH:mm:ss')}`,
            }
          ]
        },
        {// table
          table: {
            headerRows: 1,
            widths: myBody[0].map((e, i) => i === 0 ? '*' : 'auto'),
            body: myBody,
          },
        },
      ],
      styles: {}
    };

    this.pdfMake.createPdf(documentDefinition).open();
  }

  // image64 = () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAAA1CAYAAABSgkkvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFomlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0xMi0zMFQxNTowODowNCswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDItMTdUMTc6MzQ6MzUrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDItMTdUMTc6MzQ6MzUrMDE6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmU0MzdlNmQtYWQzZC1kYjRhLWJkZGEtNTM1ODlkMTdhMzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmJlNDM3ZTZkLWFkM2QtZGI0YS1iZGRhLTUzNTg5ZDE3YTM3MyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmJlNDM3ZTZkLWFkM2QtZGI0YS1iZGRhLTUzNTg5ZDE3YTM3MyI+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iQnJpay1BZnJpYyIgcGhvdG9zaG9wOkxheWVyVGV4dD0iQnJpay1BZnJpYyIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmU0MzdlNmQtYWQzZC1kYjRhLWJkZGEtNTM1ODlkMTdhMzczIiBzdEV2dDp3aGVuPSIyMDE5LTEyLTMwVDE1OjA4OjA0KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlFk9UoAAAnoSURBVHic7Z1vSBzpHcc/m8w2Zy5q9loPak+v7tq0vds7W+1drrF/3Lq5alpKypnD0kJasIYL3EtRQl6GEM8XhRbuWLEv8qpSPSgUoiXK2tIcBE4hIIU7dIV4tRApS862ltvtpS9mZjM788z/GdfE+cCCO/vMMw873+f373lmjT148ICIiDA5VOsBRDz+RCKLCJ1IZBGhE4ksInSkWg+glrTHl7ye2gH8AngReAB8GtCQHgfiwBZwda3UswoHXGQ+6AR+ALQgCyxK0R9yCPgIaFAPRCLzxkvAF4AjtR7IPqUBOKy+iWIy97wEvAB8ptYD2ceU0Fj3SGTu6QO+gmamRljj213GYrEgxuGZlJRPAF3KqwgsrJczBYfnerlkF3Dcy4leaGmr48xAU9WxG7PbbG7s7tUQfLOvY7KUlE8Cw8g3toAsoBldsxxwTncsLOX3AV9kjzzAhZFWRq4mDcdHribJnLjtWWgtbXUM/vLzpDvr2dzY5dZikbnZbb/DNUUosvb4UheQsDm3uFbqWQ5+SFXkgKzm/XBKyqd0lspunEHSB6QwEZnI6twvlrm1WHQtCDOBqbQmn/AssivvnKC7V/3aEgwONZNZ9i5aOwwiUwT2vpOT2+NLpKT8DDC5Xs4sBD04qgWmkkS2anvNMWSLetSsQfXNe8jqyg5nTzqfj40JieGRVi9jdIRojH5Ea4doRopurBXngJspKX8tgPHsZ14FWrGwYqKbB5DurKelrc7xhfpfe5rGhNHJ3Foscmux6Lif/UKQscVoSsqPBtgfiC1Wrb7lQaDJ7EMzgTn9XItIYBOXCpzvu8P5vjtkTtz2JTaRxbpfLHvuzw6nIisAC8rLyu6PKtleUFxQroly3bH1cibsOFBEM3J9zNQcBSmyU4K2uYm7lb/9urXLb3xYEenqyg4Tlwqsruz46tMKp9nl5FqpZ1x90x5fSiBnfXoXmUB2t/oM0BNKnBdGrOeGODCARdmiMSHRP2Bq5ADoH2ii8aIUqsVwyl67XU/ucq3UU1RENyn42DwlejSpA34MPGnWQGR5pqe2HLU7CPitkzl2XYobzSKLcFnNRpXjw8pnRWBGrYX5KbQKrp9U+kkqfS07HP+zQBrZognRu8LVlR1uLRYZHGo2tDOrRzUmJNKd9ZW/ra6xurJTsYiNCYlTvQla2+oq11WPDw41c6o3wcfFMjfevVe5tnqtdGe9qxKLWqJJd9bToIzxvcWibXHYr8jc3PCqomlKyp9Gvsk3kW++itbdBlJoVQT2Psaaml1fDcAPsShbgJwNapmb3WZudpv7b5erBNP/2tNcfuNDYR+DQ82WdbHr8x2VvycuFSox2pW3v1zlqs/33WF1ZYfr8x0V0YJsRVWR6c8B621PjQmJkatJw6QBWfwjV5PMzW5z+eIHwnDAb3bZJThm5uxFvkIvMH27oPzLNUFfTmK9BuCnWAT86c56g+VRrcl7urinMSG5SgDM0LrdBoHV0wtMvbbVOWY0JiSuz3cIBaalf6DJdJJ4Fpkm+NdSxHnQP4pYpIGSkvLnMFrDInLmasUh4HngGSwsnt4ibG7sVjI1UXAdRFz2sUXyMDzSahCYH379u+cd92dWC/Qksvb40jlkK6SX7vh6OeM0bXFb9HWNEtPlBB9dcBDbfQ74EfCEVSP9MpJWWCKR6duruMk6rcoNQVhKlcGhZmF/mxu75Cbukpu46yiWc2o3r7XHl+wq+mPr5cy4TRvTc5Hjs6AtWw6jmxwTLLKLaEOu8pvuG2tpqzPMXq2wVKumtQQtbXWkO+sNQpme2qpkpNfnOww318tWcbX+5dWyicoy01NbVXHlxKWC7TprULswlvFeib+wXs6opZDAamImbnLB4USQgOeQi7CmrlJklfRx2NzstuEmd/cmQi1+glxwVUXrpSYmWibb3NgVJi65ibuW1whqWakLyKWk/E2XFf8ZjcACw8RNFoDXHXbxLPA9LMoWYJzpc7PbBrcn+vLtCrd+mZvdFtbp3JDuOmY4dsNiO9Dqyo7pxAl6P1kW+D1w2mF7u+DbK6Js8nWTeHEUTXwYi8HJ7x7/7M/ffCZd9+ThOMCkYKZq61oqoi9ZrWlpszt1wTysXQ+XL37gu49WQRCvt9JOcWrJxtZKPTHtC9kqiNxbNiXl9VmnEBdJglv01y9YrHmqheAskI3FYtkXuuq//u1Xn4p39ybo7k0IYxp9bQzMZ/rcu/cMx4IM0PUEsXTlpsxhh+ee1ko9M8BMe3zpJsZMMYt4yWmvKFCd+SZTUn7UJB6riljbvlTHy985jiRZ12lFIjHLHEWpfXdvwrdLC5MgyyBByHUSschqyRiy29YympLykwLrWZXVfu1kAy9+o57DNiIT1busMiw9/QNN8BPHzR9pghCZyGXWdCV4vZyZSUn5BarFnkCO1fRx4DiKNTt67PCRTz75tO+3v/ro5Vjs4dNIejfYP9AkXF90S/9AU6h76/0gx4vB3MZ9/SCJT8YxWtThlJQf1xVi1ZpZ7D//+t8rf5y+dwabNc2g4imrBfNas1n4r+GY7Pbdh9FBiEzkGmuxB7+K9XJmISXlJzEmATnE2W8c+BbyjgvLhEgvsvvFsm3dS5SNWi2Y1xpR8pDuOgZT7vvyJTJl/VK05brWGw1VxjGKLJuS8lmTB1+6sFlGEu3Xn57aYuKS/bxaK/VUvVeFF3Zh1guiMQ0ONZN7a1NYernyzgla2uo433fH8JnTEkayPb6U1b1GkbfPiJaCAtkZ6xfFLY4JPtIXag8Dp4Cv4tKKgfVaohaRawy7MOuV1ZUdoZh+M/1c1XfQ3ZvgD7e7LHdpOBXZMPKCuPZ1DfEu2JmQHo/zyiTGQCKpe+hFAs4gP1NpGY+JROE0rnKzYL4fyL21aTiW7qzn+nwHa6Ue1ko9wm1FeoJ+EnqZ8Kr4nlBKFqL62CgP06engFew2DcGDxe3tbgJ3EUiEy2y7xemp7YCceUikXmtwo8Dp0Os4ntGKcLqgyZ1P1wc+CayVba0YiKr4+YmaPea2fW7X3hz8G+Ol7/MJpxIZAs4yw7Vx+TGgNR6OTNmIzD9so6Tazg5x2m/otgsiRzon0V+ptLV1u77xbLlorEIJ5ZPf1OthKz/zIkg3JyzubHL2ZPLlqsTqys7nO+7Y9om5vd3/Gv9qz5+SEn5GPLO1zwOLNlBR/sAClj+zsffgcG1Us9fIYA62aP8zyba40tHgO8ju85IYDaoonK7P+2g/wjeUeRnKhvsGkZ456CLLIkc9D/Oy2s156CL7Gfs4a8mHiCOo5m4B30GS8CfkeOxRze43F/EgG3gn+qBgy6yPwF/Uf6ORBYMh4B/A/9QD/guYURE2HHQY7KIPSASWUToRCKLCJ1IZBGhE4ksInT+D9cxaAmmiaOYAAAAAElFTkSuQmCC';
}
// {
// 	'4A0': [4767.87, 6740.79],
// 	'2A0': [3370.39, 4767.87],
// 	A0: [2383.94, 3370.39],
// 	A1: [1683.78, 2383.94],
// 	A2: [1190.55, 1683.78],
// 	A3: [841.89, 1190.55],
// 	A4: [595.28, 841.89],
// 	A5: [419.53, 595.28],
// 	A6: [297.64, 419.53],
// 	A7: [209.76, 297.64],
// 	A8: [147.40, 209.76],
// 	A9: [104.88, 147.40],
// 	A10: [73.70, 104.88],
// 	B0: [2834.65, 4008.19],
// 	B1: [2004.09, 2834.65],
// 	B2: [1417.32, 2004.09],
// 	B3: [1000.63, 1417.32],
// 	B4: [708.66, 1000.63],
// 	B5: [498.90, 708.66],
// 	B6: [354.33, 498.90],
// 	B7: [249.45, 354.33],
// 	B8: [175.75, 249.45],
// 	B9: [124.72, 175.75],
// 	B10: [87.87, 124.72],
// 	C0: [2599.37, 3676.54],
// 	C1: [1836.85, 2599.37],
// 	C2: [1298.27, 1836.85],
// 	C3: [918.43, 1298.27],
// 	C4: [649.13, 918.43],
// 	C5: [459.21, 649.13],
// 	C6: [323.15, 459.21],
// 	C7: [229.61, 323.15],
// 	C8: [161.57, 229.61],
// 	C9: [113.39, 161.57],
// 	C10: [79.37, 113.39],
// 	RA0: [2437.80, 3458.27],
// 	RA1: [1729.13, 2437.80],
// 	RA2: [1218.90, 1729.13],
// 	RA3: [864.57, 1218.90],
// 	RA4: [609.45, 864.57],
// 	SRA0: [2551.18, 3628.35],
// 	SRA1: [1814.17, 2551.18],
// 	SRA2: [1275.59, 1814.17],
// 	SRA3: [907.09, 1275.59],
// 	SRA4: [637.80, 907.09],
// 	EXECUTIVE: [521.86, 756.00],
// 	FOLIO: [612.00, 936.00],
// 	LEGAL: [612.00, 1008.00],
// 	LETTER: [612.00, 792.00],
// 	TABLOID: [792.00, 1224.00]
// };
