import { LightningElement } from 'lwc';
import AWS_ListTables from '@salesforce/apex/Prithvi_AWS_DynamoDB_Controller.AWS_ListTables';

export default class AwsListTables extends LightningElement {
    showSpinner = false;
    responseTrue = false;
    responseJSON;
    tableNames = [];

    connectedCallback() {
        this.showSpinner = true;

        AWS_ListTables({})
		.then(response => {
            this.showSpinner = false;
            this.responseJSON = JSON.parse(response);
            this.tableNames = this.responseJSON.TableNames;
            console.log(this.tableNames);
            this.responseTrue = true;
            this.error = "undefined";
		})
		.catch(error => {
			this.error = error;
            console.log(this.error);
		})
      }
    
}