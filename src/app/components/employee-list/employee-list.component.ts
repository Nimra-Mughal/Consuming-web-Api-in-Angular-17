import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interface/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent {
  router=inject(Router);
  EmployeeList:IEmployee[]=[];
  httpservice=inject(HttpService);
  displayedColumns:string[]=[
    'id',
    'name',
    'gender',
    'age',
    'standard',
    'fathername',
    'action'
  ];
  ngOnInit(){
    this.httpservice.getallemployee().subscribe(result=>{
      this.EmployeeList=result;
      console.log(this.EmployeeList);
    })
  }
  edit(id:number){
    console.log(id);
    this.router.navigateByUrl("/employee/"+id)
  }
  delete(id:number){











    this.httpservice.deleteemployee(id).subscribe(()=>{
      console.log("deleted");
      this.router.navigateByUrl("/employee-list");
    });
  }
}
