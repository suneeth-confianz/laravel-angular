import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendConnectorService } from '../../../services/backend-connector.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  public form: FormGroup;
  public incomeList: FormArray;

  // returns all form groups under contacts
  get incomeFormGroup() {
    return this.form.get('incomes') as FormArray;
  }

  constructor(private fb: FormBuilder,private BackendConnector:BackendConnectorService) {}

  ngOnInit() {
    this.form = this.fb.group({
      recieptNumber: [null, Validators.compose([Validators.required])],
      recieptAmount: [null, Validators.compose([Validators.required])],
      incomes: this.fb.array([this.createIncome()])
    });
    
    // set contactlist to this field
    this.incomeList = this.form.get('incomes') as FormArray
  }

  // contact formgroup
  createIncome(): FormGroup {
    return this.fb.group({
      incomeCategory: [null, Validators.compose([Validators.required])], // i.e Email, Phone
      amount: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      isMember: [{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      member: [{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      guest: [{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      guestAddress: [{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      memberMonthlyFeeFrom:[{disabled: true, year: 2020, month: '' }, Validators.compose([Validators.required])],
      memberMonthlyFeeTo:[{ disabled: true, year: 2020, month: '' }, Validators.compose([Validators.required])],
      auctionDate:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      auctionAmount:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      auctionFine:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      auctionItem:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      auctionPayDate:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      rentDate:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      rentAmount:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      rentItem:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      rentPayDate:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      donationDate:[{ disabled: true, value: '' }, Validators.compose([Validators.required])],
      donationAmount:[{ disabled: true, value: '' }, Validators.compose([Validators.required])]
    });
  }

  addIncome() {
    this.incomeList.push(this.createIncome());
  }

  removeIncome(i: number) {
    this.incomeList.removeAt(i);
  }

  // get the formgroup under contacts form array
  getIncomesFormGroup(index, category): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.incomeList.controls[index] as FormGroup;
    console.log(formGroup);
    return formGroup;
  }

  showFieldsBasedOnCategory(event, index){
    const formGroup = this.incomeList.controls[index] as FormGroup;
    //formGroup.controls.isMember.enable();
    $('.check-for-member-'+index).hide();
    $('.not-member-'+index).hide();
    $('.auction-fields-'+index).hide();
    $('.rent-fields-'+index).hide();
    $('.donation-fields-'+index).hide();
    $('.member-'+index).hide();
    $('.member-monthly-fee-'+index).hide();
    this.disableAllDynamicFields(formGroup);

    if(event.target.value != 'monthly_fee'){      
      $('.check-for-member-'+index).show();
      $('.member-'+index).hide();
      $('.member-monthly-fee-'+index).hide();
      formGroup.controls.isMember.enable();
      formGroup.controls.member.disable();
      formGroup.controls.memberMonthlyFeeFrom.disable();
      formGroup.controls.memberMonthlyFeeTo.disable();
    } else {
      formGroup.controls.isMember.disable();
      formGroup.controls.member.enable();
      formGroup.controls.memberMonthlyFeeFrom.enable();
      formGroup.controls.memberMonthlyFeeTo.enable();
      $('.member-'+index).show();
      $('.member-monthly-fee-'+index).show();
    }

    if(event.target.value == 'auction'){
      $('.auction-fields-'+index).show();
      formGroup.controls.auctionDate.enable();
      formGroup.controls.auctionAmount.enable();
      formGroup.controls.auctionItem.enable();
      formGroup.controls.auctionPayDate.enable();
      formGroup.controls.auctionFine.enable();
    } 
    
    if(event.target.value == 'rent'){
      $('.rent-fields-'+index).show();
      formGroup.controls.rentDate.enable();
      formGroup.controls.rentItem.enable();
      formGroup.controls.rentAmount.enable();
      formGroup.controls.rentPayDate.enable();
    }

    if(event.target.value == 'donation'){
      $('.donation-fields-'+index).show();
      formGroup.controls.donationDate.enable();
      formGroup.controls.donationAmount.enable();
    }

  }

  disableAllDynamicFields(formGroup) {
    formGroup.controls.isMember.enable();
    formGroup.controls.member.disable();
    formGroup.controls.memberMonthlyFeeFrom.disable();
    formGroup.controls.memberMonthlyFeeTo.disable();
    formGroup.controls.guest.disable();
    formGroup.controls.guestAddress.disable();
    formGroup.controls.auctionDate.disable();
    formGroup.controls.auctionAmount.disable();
    formGroup.controls.auctionItem.disable();
    formGroup.controls.auctionPayDate.disable();
    formGroup.controls.auctionFine.disable();
    formGroup.controls.rentDate.disable();
    formGroup.controls.rentItem.disable();
    formGroup.controls.rentAmount.disable();
    formGroup.controls.rentPayDate.disable();
    formGroup.controls.donationDate.disable();
    formGroup.controls.donationAmount.disable();
  }

  showMember(event, index){
    const formGroup = this.incomeList.controls[index] as FormGroup;
    if(event.target.value == 'yes'){
      formGroup.controls.guest.disable();
      formGroup.controls.guestAddress.disable();
      formGroup.controls.member.enable();
      $('.member-'+index).show();
      $('.not-member-'+index).hide();
    } else {
      formGroup.controls.guest.enable();
      formGroup.controls.guestAddress.enable();
      formGroup.controls.member.disable();
      $('.not-member-'+index).show();
      $('.member-'+index).hide();
    }

  }

  onDateSelect(event){
    console.log('asd');
    return false;
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
    return false;
    /* this.BackendConnector.addUser(this.form).subscribe(
      
      
    ) */
  }
  

}
