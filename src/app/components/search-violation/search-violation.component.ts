import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViolationReportsComponent } from '../violation-reports/violation-reports.component';
import { ViolationContentComponent } from '../violation-content/violation-content.component';
import { MatInputModule } from '@angular/material/input';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-search-violation',
  templateUrl: './search-violation.component.html',
  styleUrls: ['./search-violation.component.css']
})
export class SearchViolationComponent implements OnInit {

  contentDialog = '';

    month: string;
    day: any;
    year: any;
    date: any;
    found: boolean;
    notFound: boolean;
    violations: any;
    violation: any;

    monthControl = new FormControl('', [Validators.required]);

        months = [
          {name: 'January', value: 'January'},
          {name: 'February', value: 'February'},
          {name: 'March', value: 'March'},
          {name: 'April', value: 'April'},
          {name: 'May', value: 'May'},
          {name: 'June', value: 'June'},
          {name: 'July', value: 'July'},
          {name: 'August', value: 'August'},
          {name: 'September', value: 'September'},
          {name: 'October', value: 'October'},
          {name: 'November', value: 'November'},
          {name: 'December', value: 'December'},
        ];


  constructor(
    public dialog: MatDialog,
    public thisDialogRef: MatDialogRef<ViolationReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  onSearch() {
    const monthLength = this.month.trim().length;
    const dayLength = this.day.trim().length;
    const yearLength = this.year.trim().length;


    if ( (monthLength !== 0)
       && (dayLength !== 0)
       && (yearLength !== 0)) {
        // setting the date to query
        this.date = this.month + ' ' + this.day + ' ' + this.year;
        console.log(this.date);
        this.found = false;
        this.notFound = false;

        this.violations = this.firebaseService.getViolationLog(this.date);
        if ( this.violations == null ) {
          this.notFound = true;
        }
        this.firebaseService.getViolationLog(this.date).subscribe(notification => {
          // console.log(notification);
          this.violation = notification;
          if (this.violation != null) {
            this.found = true;
          }
        });

      }

  }

  onCancel() {
    this.thisDialogRef.close('CLOSE');
  }

  open(content) {
    this.firebaseService.readViolationLogs(content);
    const dialogRef = this.dialog.open(ViolationContentComponent, {
      width: '800px',
      data: content
    });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed');
    this.contentDialog = result;
  });
  }

}
