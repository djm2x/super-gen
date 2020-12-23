import { Component, OnInit, ViewChild, EventEmitter, Inject } from '@angular/core';
import { merge } from 'rxjs';
import { UpdateComponent } from './update/update.component';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from 'src/app/components/delete/delete.service';
import { Blog } from 'src/app/models/models';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new EventEmitter();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  dataSource = [];

  displayedColumns = [ 'imageUrl', 'title', 'date', 'user', 'category', 'option'];

  panelOpenState = false;

  title = new FormControl('');
idUser = new FormControl(0);
idCategory = new FormControl(0);


  users = this.uow.users.get();
categorys = this.uow.categorys.get();


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
          this.title.value === '' ? '*' : this.title.value,
this.idUser.value === 0 ? 0 : this.idUser.value,
this.idCategory.value === 0 ? 0 : this.idCategory.value,

        );
      }
    );
  }

  reset() {
    this.title.setValue('');
this.idUser.setValue(0);
this.idCategory.setValue(0);

    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, title, idUser, idCategory,) {
    this.uow.blogs.getAll(startIndex, pageSize, sortBy, sortDir,  title, idUser, idCategory,).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );
  }

  openDialog(o: Blog, text) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '750px',
      disableClose: true,
      data: { model: o, title: text }
    });

    return dialogRef.afterClosed();
  }

  add() {
    this.openDialog(new Blog(), 'Ajouter blog').subscribe(result => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  edit(o: Blog) {
    this.openDialog(o, 'Modifier blog').subscribe((result: Blog) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  async delete(id: number) {
    const r = await this.mydialog.openDialog('blog').toPromise();
    if (r === 'ok') {
      this.uow.blogs.delete(id).subscribe(() => this.update.next(true));
    }
  }

  displayImage(urlImage: string) {
    if (!urlImage) {
      return 'assets/404.jpg';
    }
    if (urlImage && urlImage.startsWith('http')) {
      return urlImage;
    }

    return `${this.url}/blogs/${urlImage.replace(';', '')}`;
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }

}

