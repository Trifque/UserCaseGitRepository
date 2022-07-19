public with sharing class WebinarTeamControllerHelper {
    @AuraEnabled
    public static Webinar__c[] getWebinars(Integer queryLimit){
        return [SELECT Type__c,Name,Status__c, Approval_Status__c, Cost__c FROM Webinar__c WHERE Approval_Status__c = 'Pending' LIMIT :queryLimit];
    }
}