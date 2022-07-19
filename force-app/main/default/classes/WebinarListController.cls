public with sharing class WebinarListController {
    @AuraEnabled
    public static Webinar__c[] getWebinars(String queryLimit){
        return [SELECT Name, Description__c, Cost__c, Status__c, Approval_Status__c
        FROM Webinar__c
        WHERE Approval_Status__c = 'Pending'
        LIMIT :Integer.valueOf(queryLimit)
        ];
    }
}