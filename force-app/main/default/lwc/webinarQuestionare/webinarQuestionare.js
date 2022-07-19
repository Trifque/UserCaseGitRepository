import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, getRecord } from 'lightning/uiRecordApi';
import {NavigationMixin} from 'lightning/navigation';

import QUESTIONNAIRE_OBJECT from '@salesforce/schema/Questionnaire__c';
import AGE_FIELD from '@salesforce/schema/Questionnaire__c.Age__c';
import ATTENDANCE_FIELD from '@salesforce/schema/Questionnaire__c.Attendance__c';
import FEEDBACK_FIELD from '@salesforce/schema/Questionnaire__c.Feedback_Comments__c';
import REASON_FIELD from '@salesforce/schema/Questionnaire__c.Why__c';
import RECOMMEND_FIELD from '@salesforce/schema/Questionnaire__c.Recommend__c';
import SCORE_FIELD from '@salesforce/schema/Questionnaire__c.Score__c';
import WEBINAR_FIELD from '@salesforce/schema/Questionnaire__c.Webinar__c';

export default class WebinarQuestionare extends NavigationMixin(LightningElement) {

    @api toastMessage;

    @api recordId; // webinar Id
    questionnaireApiName = QUESTIONNAIRE_OBJECT;
    questionnaireId;
    questionnaireHeader = 'Hi ';

    @wire( getRecord, { recordId: userId, fields: [userNameFld]})
    userDetails({error, data}){
        if(data){
            this.questionnaireHeader += data.fields.Name.value + '! Share your feedback with us!';
        } else if(error){
            console.error(error);
        }
    }

    fields = [
        AGE_FIELD, ATTENDANCE_FIELD, FEEDBACK_FIELD,
         REASON_FIELD, RECOMMEND_FIELD, SCORE_FIELD,
    ];

    handleQuestionnaireSubmit(event){
        event.preventDefault();
        let eventFields = event.detail.fields;
        eventFields.Webinar__c = this.recordId;

        console.log(eventFields);

        const recordInput = {
            apiName : QUESTIONNAIRE_OBJECT.objectApiName,
            fields: eventFields,
        };

        createRecord(recordInput).then(questionnaire =>{
            this.questionnaireId = questionnaire.id;
            this.handleSuccess();
        }).catch(error =>{
            console.error(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
    }

    handleSuccess(){
        const evt = new ShowToastEvent({
           title: 'Questionnaire created!',
           message: this.toastMessage,
           variant: 'success',
        });
        this.dispatchEvent(evt);
    }

    navigateToQuestionnaire(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.questionnaireId,
                objectApiName: QUESTIONNAIRE_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

}