import { LightningElement, track } from 'lwc';
import AWS_Scan from '@salesforce/apex/Prithvi_AWS_DynamoDB_Controller.AWS_Scan';
const columns = [
    { label: 'IVRLanguageName', fieldName: 'IVRLanguageName' },
    { label: 'PhoneNumber', fieldName: 'PhoneNumber' },
    { label: 'Country', fieldName: 'Country'},
    { label: 'ReportingBrand', fieldName: 'ReportingBrand' },
    { label: 'ProductCategory', fieldName: 'ProductCategory' },
    { label: 'UnileverNGN', fieldName: 'UnileverNGN' }
];


export default class AwsDisplayTableData extends LightningElement {
    showSpinner = false;
    responseTrue = false;
    responseJSON;
    jsondata = [];
    columns = columns;
    PhoneNumber; Country; IVRLanguageName; ReportingBrand; ProductCategory; UnileverNGN; PromptBrandName;

    connectedCallback() {
        AWS_Scan({})
		.then(response => {
            this.showSpinner = true;
            this.responseJSON = JSON.parse(response);
            
            console.log(this.responseJSON);
            
            console.log(this.responseJSON.Items);
            console.log(this.responseJSON.Items.length);

            console.log(this.responseTrue);
            this.responseTrue = true;
            this.error = "undefined";
		})
		.catch(error => {
			this.error = error;
            console.log(this.error);
		})
      }

}