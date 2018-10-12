import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map, startWith, mergeMap, concat } from 'rxjs/operators';

import { DetailComponent } from './detail.component';
import { Photo } from '../../api/models/photo';
import { RestApiService } from '../../api/services/rest-api.service';
import { ModalService } from '../../ui/services/modal.service';

const LIMIT = 9;

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [
    './gallery.component.css'
  ]
})
export class GalleryComponent {
  public page: number = 0;
  public total: number = 0;
  public pageStream = new Subject<number>();
  public photos: Photo[] = [];
  public photoStream: Observable<{total: number, data: Photo[]}>;
  public disableBtn: boolean = false;

  constructor(protected restApi: RestApiService,
              protected modalService: ModalService) { }

  public ngOnInit() {
    this.photoStream = this.pageStream.pipe(
      map(page => {
        return {
          page
        };
      }),
      startWith({
        page: this.page
      }),
      mergeMap((params: {page: number}) => {
        return this.restApi.photos(LIMIT * params.page, LIMIT);
      })
    );

    this.photoStream.subscribe(({ total, data }) => {
      this.total = total;
      this.disableBtn = (this.page + 1) * LIMIT > total;

      this.photos = this.photos.concat(data);
    });
  }

  public nextPage() {
    this.page++;

    this.pageStream.next(this.page);
  }

  public openDetailModal(url: string) {
    this.modalService.open(DetailComponent, {
      url
    }, {});
  }
}
