import { Component, OnInit } from '@angular/core';
import { OpenAccountService } from 'src/app/shared/service/open-account.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test-idpass',
  templateUrl: './test-idpass.component.html',
  styleUrls: ['./test-idpass.component.sass']
})
export class TestIdpassComponent implements OnInit {

  constructor(private openAccountService: OpenAccountService, private http: HttpClient,) { }

  ngOnInit() {
//     this.openAccountService.testIdpass().subscribe(response => {
//       console.log('AAAAAAAAAAAAAAAAAAAAAAAAA: ', response)
   
//     this.http.get<any>('', {observe: 'response'}).subscribe(resp => {
//     console.log(resp.headers.get('location'));
//   });
// });
  }

}
