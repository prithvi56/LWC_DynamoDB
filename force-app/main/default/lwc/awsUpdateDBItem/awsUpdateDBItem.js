import { LightningElement,track} from 'lwc';
import AWS_GetSearchedItem from '@salesforce/apex/Prithvi_AWS_DynamoDB_Controller.AWS_GetSearchedItem';
import AWS_UpdateKeyItem from '@salesforce/apex/Prithvi_AWS_DynamoDB_Controller.AWS_UpdateKeyItem';

export default class AwsGetItem extends LightningElement {
    showSpinner = false;
    responseTrue = false;
    phoneInput;
    responseJSON;
    error;
    PhoneNumber; Country; IVRLanguageName; ReportingBrand; ProductCategory; UnileverNGN; PromptBrandName;

    @track theRecord = {
        "IVRLanguageName" : '',
        "Country" : '',
        "ProductCategory" : '',
        "PromptBrandName" : '',
        "ReportingBrand" : '',
        "UnileverNGN" : ''
    };

    @track jsonBody = {
            "TableName":'',
            "Key":{
               "PhoneNumber":{
                  "S":''
               }
            },
            "UpdateExpression":'',
            "ExpressionAttributeValues":{
               ":val1":{
                  "S":''
               },
               ":val2":{
                  "S":''
               },
               ":val3":{
                  "S":''
               },
               ":val4":{
                  "S":''
               },
               ":val5":{
                  "S":''
               },
               ":val6":{
                  "S":''
               }
            },
            "ReturnValues":"ALL_NEW"
         }

    keyItem;

    handleInputChange(event){
    this.phoneInput = event.target.value;  
    console.log(this.phoneInput); 
    }

    handleInputFieldChange(event){

        console.log('before' +this.theRecord);
        this.jsonBody.TableName = 'DDBNumberToIVR';
        this.jsonBody.Key.PhoneNumber.S = this.keyItem;
        this.jsonBody.UpdateExpression = 'SET Country = :val1,IVRLanguageName = :val2,ProductCategory = :val3,PromptBrandName = :val4,ReportingBrand = :val5,UnileverNGN = :val6';
        this.jsonBody.ReturnValues = 'ALL_NEW';

        if(event.target.name == 'Country'){ 
            this.jsonBody.ExpressionAttributeValues[':val1'].S =  event.target.value;            
        }
        if(event.target.name == 'IVRLanguageName'){
            this.jsonBody.ExpressionAttributeValues[':val2'].S =  event.target.value;
        }
        if(event.target.name == 'ProductCategory'){
            this.jsonBody.ExpressionAttributeValues[':val3'].S =  event.target.value;
        }
        if(event.target.name == 'PromptBrandName'){
            this.jsonBody.ExpressionAttributeValues[':val4'].S =  event.target.value;
        }
        if(event.target.name == 'ReportingBrand'){
            this.jsonBody.ExpressionAttributeValues[':val5'].S =  event.target.value;
        }
        if(event.target.name == 'UnileverNGN'){
            this.jsonBody.ExpressionAttributeValues[':val6'].S =  event.target.value;
        }

        console.log('JSON BODY IVRLanguageName ->>> '+JSON.stringify(this.jsonBody));
        
        
    }

    handleSaveChanges(event){
        const keyToUpdate = this.keyItem;
        const newData = JSON.stringify(this.jsonBody);
        console.log('apex parameter -> '+keyToUpdate);
        console.log('apex parameter -> '+newData);

        AWS_UpdateKeyItem({newValues : newData})
        .then(response => {
            this.updateResponse = JSON.parse(response);
            console.log(this.updateResponse);
        })
        .catch(error => {
            this.error = error;
            console.log(this.error);
        })
    }

    handleKeyClick(event){
        this.showSpinner = true;
        const searchKey = this.phoneInput;
        console.log(searchKey);
		AWS_GetSearchedItem({phoneKey: searchKey})
		.then(response => {
            this.showSpinner = false;
            this.responseJSON = JSON.parse(response);
            console.log(this.responseJSON);
            this.keyItem = this.responseJSON.Item.PhoneNumber.S;
            this.PhoneNumber = this.responseJSON.Item.PhoneNumber.S;
            this.Country = this.responseJSON.Item.Country.S;
            this.IVRLanguageName = this.responseJSON.Item.IVRLanguageName.S;
            this.ReportingBrand = this.responseJSON.Item.ReportingBrand.S;
            this.ProductCategory = this.responseJSON.Item.ProductCategory.S;
            this.UnileverNGN = this.responseJSON.Item.UnileverNGN.S;
            if(this.responseJSON.Item.PromptBrandName){
            this.PromptBrandName = this.responseJSON.Item.PromptBrandName.S; 
            }else{
            this.PromptBrandName = "";   
            }    
            this.responseTrue = true;
            this.error = "undefined";
		})
		.catch(error => {
			this.error = error;
            console.log(this.error);
		})
	} 

}