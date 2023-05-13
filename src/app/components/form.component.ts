import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  thoughtsForm!: FormGroup;
  thoughts!:string;

  @Input()
  canShare=false

  @Output()
  onShare = new Subject<string>()

  

   //@Autorwire
   fb:FormBuilder = inject(FormBuilder)

   ngOnInit(): void{
    console.info('>>>Form Component initialising')
     //call the form
    // this.friendsForm = this.createForm()

    //with form builder
    this.thoughtsForm = this.createFormWithFormBuilder()
    // or sessionStorage
    const data = localStorage.getItem('thoughts')
    if(!!data){
      this.thoughts = JSON.parse(data);
      console.info('>> My thoughts from storage', this.thoughts)
    }
   
  }

    //method 1
    private createFormWithFormBuilder(): FormGroup{
      return this.fb.group({
        // [this.nameField]: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
        thoughts: this.fb.control<string>('', [Validators.required, Validators.minLength(5)])
      })
    }


   invalidField(ctrlName:string): boolean{
    return !!(this.thoughtsForm.get(ctrlName)?.invalid && this.thoughtsForm.get(ctrlName)?.dirty)
  }

  invalidForm() {
    return this.thoughtsForm.invalid || !this.canShare;
  }


  processForm(){
    const thoughts: string = this.thoughtsForm.value['thoughts'];
    console.info('>>Processing form: ', thoughts);
    //store in browser db. 
    localStorage.setItem('thoughts', JSON.stringify(thoughts))
    this.onShare.next(thoughts)
    this.thoughtsForm.reset();
  }

  clearForm(){
    this.thoughtsForm.reset();
  }






}
