import { Component, OnInit, ViewChild, EventEmitter, Inject } from '@angular/core';
import { merge } from 'rxjs';
import { UpdateComponent } from './update/update.component';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from 'src/app/components/delete/delete.service';
import { Category } from 'src/app/models/models';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new EventEmitter();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  dataSource = [];

  displayedColumns = [ 'name', 'option'];

  panelOpenState = false;

  name = new FormControl('');


  

  constructor(private uow: UowService, public dialog: MatDialog
    , private mydialog: DeleteService, @Inject('BASE_URL') private url: string ) { }

  ngOnInit() {
    merge(...[this.sort.sortChange, this.paginator.page, this.update]).pipe(startWith(null as any)).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.name.value === '' ? '*' : this.name.value,

        );
      }
    );
  }

  reset() {
    this.name.setValue('');

    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, name,) {
    this.uow.categorys.getAll(startIndex, pageSize, sortBy, sortDir,  name,).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );
  }

  openDialog(o: Category, text) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '750px',
      disableClose: true,
      data: { model: o, title: text }
    });

    return dialogRef.afterClosed();
  }

  add() {
    this.openDialog(new Category(), 'Ajouter category').subscribe(result => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  edit(o: Category) {
    this.openDialog(o, 'Modifier category').subscribe((result: Category) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  async delete(id: number) {
    const r = await this.mydialog.openDialog('category').toPromise();
    if (r === 'ok') {
      this.uow.categorys.delete(id).subscribe(() => this.update.next(true));
    }
  }

  displayImage(urlImage: string) {
    if (!urlImage) {
      return 'assets/404.jpg';
    }
    if (urlImage && urlImage.startsWith('http')) {
      return urlImage;
    }

    return `${this.url}/categorys/${urlImage.replace(';', '')}`;
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }

}

