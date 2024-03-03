import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IEmployee } from '../../interface/employee';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  route=inject(ActivatedRoute);
  router=inject(Router);
  formBuilder=inject(FormBuilder);
  httpService = inject(HttpService);
  employeeform= this.formBuilder.group({
    name:['',[Validators.required]],
    gender:['',[Validators.required]],
    age:[0,[Validators.required]],
    standard:[0,[Validators.required]],
    fathername:['',[Validators.required]]
  });

  employeeid!:number;
  isedit=true;
  ngOnInit(){
    this.employeeid=this.route.snapshot.params['id'];
    if(this.employeeid){
      this.isedit=true;
      this.httpService.getemployee(this.employeeid).subscribe(result=>{
        console.log(result);
        this.employeeform.patchValue(result);
      })
    }
  }
  save(){
    console.log(this.employeeform.value);
    const employee:IEmployee={
      name:this.employeeform.value.name!,
      age:this.employeeform.value.age!,
      gender:this.employeeform.value.gender!,
      standard:this.employeeform.value.standard!,
      fathername:this.employeeform.value.fathername!,
    };
    if(this.isedit){
      this.httpService.updateemployee(this.employeeid,employee).subscribe(()=>{
        console.log("success");
        this.router.navigateByUrl("/employee-list")
      });
    }
    else{
      this.httpService.createemployee(employee).subscribe(()=>{
        console.log("success");
        this.router.navigateByUrl("/employee-list");
      });
    }
  
  }
}
