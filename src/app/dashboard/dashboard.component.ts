import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/service/authentication';

interface StatusList {
  slug: any;
  count: number;
  display_name: string;
}
interface TagList {
  id: number;
  organisation_name: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  [x: string]: any;
  dataSource: any;
  labelList: any;
  displayedColumns: any;
  pageNumber: any;

  dataload!: boolean;
  channelList: any;
  selectedStatus: any;

  status: any;
  id: any;
  tags: any;
  tableList: any;
  page!: number;
  size!: number;

  pageIdentifier = new EventEmitter<object>();

  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}
  headerList!: {
    display_name: string;
    slug: string;
  }[];

  tagList: TagList[] = [];
  statusList: StatusList[] = [];
  // tagsList: TagList[] = [
  //   // { value: 'AD 1', viewValue: 'AD 1' },
  //   // { value: 'AD 2', viewValue: 'AD 2' },
  //   // { value: 'AD 3', viewValue: 'AD 3' },
  // ];

  // tableData: any = [
  //   {
  //     sl_no: 1,
  //     entity_name: '3M',
  //     entity_code: 7,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:05:46.178778Z',
  //     quality: '12345',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 2,
  //     entity_name: 'Schneider',
  //     entity_code: 8,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:06:09.161017Z',
  //     quality: '1345',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 3,
  //     entity_name: '3M',
  //     entity_code: 7,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:05:46.178778Z',
  //     quality: '12345',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 4,
  //     entity_name: 'Schneider',
  //     entity_code: 8,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:06:09.161017Z',
  //     quality: '1225',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 5,
  //     entity_name: 'Hubbel',
  //     entity_code: 9,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:06:28.752463Z',
  //     quality: '1255',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 6,
  //     entity_name: 'S1',
  //     entity_code: 10,
  //     status: 'OFFLINE',
  //     onboarded_on: '2023-01-03T14:42:41.026064Z',
  //     quality: '11125',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 7,
  //     entity_name: 'S2',
  //     entity_code: 11,
  //     status: 'ACTIVE',
  //     onboarded_on: '2023-01-03T14:42:50.901969Z',
  //     quality: '7655',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 8,
  //     entity_name: '3M',
  //     entity_code: 7,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:05:46.178778Z',
  //     quality: '0345',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 9,
  //     entity_name: 'Schneider',
  //     entity_code: 8,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:06:09.161017Z',
  //     quality: '1945',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 10,
  //     entity_name: 'Hubbel',
  //     entity_code: 9,
  //     status: 'ACTIVE',
  //     onboarded_on: '2022-12-26T05:06:28.752463Z',
  //     quality: '0725',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 11,
  //     entity_name: 'S1',
  //     entity_code: 10,
  //     status: 'OFFLINE',
  //     onboarded_on: '2023-01-03T14:42:41.026064Z',
  //     quality: '1985',
  //     actions: '----',
  //   },
  //   {
  //     sl_no: 12,
  //     entity_name: 'S2',
  //     entity_code: 11,
  //     status: 'ACTIVE',
  //     onboarded_on: '2023-01-03T14:42:50.901969Z',
  //     quality: '7345',
  //     actions: '----',
  //   },
  // ];

  ngOnInit(): void {
    this.pageNumber = this.page;
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.header();
    this.getTable;
    this.chal();

    this.getstatus();
    this.getchannel();

    this.dataSource.paginator = this.paginator;
  }

  getStatusValue = (status: string) => {
    this.status = status.toUpperCase();
    this.size = 5;
    this.page = 1;

    this.getTable(this.page, this.size, this.selectedStatus);
  };

  getChannelValue = (selectedStatus: any) => {
    this.size = 5;
    this.page = 1;

    this.getchanneltable(this.page, this.size, this.selectedStatus, this.id);
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getchannel() {
    this.authentication.getchannel().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.tagList = resp.data;
        this.tags = this.tagList?.map(
          (viewValue) => viewValue.organisation_name
        );
        console.log(this.tags);
      },
    });
  }

  getstatus() {
    this.authentication.getstatus().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.statusList = resp;
        this.status = this.statusList?.map((viewValue) => viewValue.slug);
      },
    });
  }

  chal() {
    this.authentication.chal().subscribe((resp) => {
      console.log(resp);
      const Table = resp.data;
      this.dataSource = new MatTableDataSource(Table);
      console.log(this.dataSource);
    });
  }
  header() {
    this.authentication.header().subscribe((resp) => {
      console.log(resp);
      this.headerList = resp;
      console.log(resp);
      this.displayedColumns = this.headerList?.map((column) => column.slug);
      console.log(this.displayedColumns);
    });
  }

  getchanneltable = (
    page: any,
    size: any,
    status: any,
    selectedStatus: any
  ) => {
    this.dataload = true;
    this.authentication
      .getchannelList(page, size, status, selectedStatus)
      .subscribe({
        next: (resp: any) => {
          this.channelList = resp.result;
          const ChannelList = this.channelList;
          this.dataSource = new MatTableDataSource(ChannelList);
        },
      });
  };

  getTable = (page: any, size: any, status: any) => {
    this.dataload = true;
    this.authentication.getstatusList(page, size, status).subscribe({
      next: (resp: any) => {
        this.tableList = resp.result;
        const TableList = this.tableList;
        this.dataSource = new MatTableDataSource(TableList);
      },
    });
  };

  logout() {
    this.router.navigate(['/logout']);
  }
}
