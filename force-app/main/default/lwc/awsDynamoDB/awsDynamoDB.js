import { LightningElement, track, wire} from 'lwc';
import AWS_GetItem from '@salesforce/apex/Prithvi_AWS_DynamoDB_Controller.AWS_GetItem';
const columns = [
    { label: 'IVRLanguageName', fieldName: 'IVRLanguageName' },
    { label: 'PhoneNumber', fieldName: 'PhoneNumber' },
    { label: 'Country', fieldName: 'Country'},
    { label: 'ReportingBrand', fieldName: 'ReportingBrand' },
    { label: 'ProductCategory', fieldName: 'ProductCategory' },
    { label: 'UnileverNGN', fieldName: 'UnileverNGN' }
];
export default class AwsDynamoDB extends LightningElement {

    showSpinner = false;
    responseTrue = false;
    responseJSON;
    error;
    PhoneNumber;
    Country;
    IVRLanguageName;
    ReportingBrand;
    ProductCategory;
    UnileverNGN;    
    data = [];
    columns = columns;

    handleKeyClick(event){
        this.showSpinner = true;
		AWS_GetItem({})
		.then(response => {
            this.showSpinner = false;
            this.responseJSON = JSON.parse(response);
            console.log(this.responseJSON.Item);
            this.PhoneNumber = this.responseJSON.Item.PhoneNumber.S;
            this.Country = this.responseJSON.Item.Country.S;
            this.IVRLanguageName = this.responseJSON.Item.IVRLanguageName.S;
            this.ReportingBrand = this.responseJSON.Item.ReportingBrand.S;
            this.ProductCategory = this.responseJSON.Item.ProductCategory.S;
            this.UnileverNGN = this.responseJSON.Item.UnileverNGN.S;
            
            this.responseTrue = true;
            this.error = "undefined";
		})
		.catch(error => {
			this.error = error;
            console.log(this.error);
		})
	} 

}