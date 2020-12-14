import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-download-sheet',
  templateUrl: './download-sheet.component.html',
  styleUrls: ['./download-sheet.component.scss']
})
export class DownloadSheetComponent implements OnInit {

  list: string[] = [];
  folder = '';
  constructor(private bottomSheetRef: MatBottomSheetRef<DownloadSheetComponent>
    , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, @Inject('BASE_URL') public url: string) { }

  ngOnInit() {

    const l = this.data.fileName.split(';');

    l.pop();

    this.folder = this.data.folder;

    console.log(l)
    this.list = l;
  }

  async openLink(e: string/*event: MouseEvent*/) {
    // this.bottomSheetRef.dismiss();
    // console.log(p);
    const lastLettre = +e.substring(e.length - 1, e.length);

    e = isNaN(lastLettre) ? e : e.substring(0, e.length - 1);

    const url = `${this.url}/${this.folder}/${e}`;
    window.open(url);
    // try {
    //   await this.uow.rapports.download(p).toPromise();
    // } catch (e) {
    //   console.warn(e);
    // }

    // event.preventDefault();
  }

  show(e: string) {
    if (e === '') {
      return false;
    }

    const lastLettre = +e.substring(e.length - 1, e.length);

    if (isNaN(lastLettre)) {
      return true;
    }

    return lastLettre === 1;
  }

}
