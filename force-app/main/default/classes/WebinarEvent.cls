/**
 * Created by atrifunovic on 7/15/2022.
 */

public with sharing class WebinarEvent {
    private static List<WebinarEvent__e> createWebinarEvents(){
        List<WebinarEvent__e> webinarEvents = new List<WebinarEvent__e>();
        webinarEvents.add(new WebinarEvent__e(salesforce_id__c = 'Sales1'));
        webinarEvents.add(new WebinarEvent__e(salesforce_id__c = 'Sales2'));
        webinarEvents.add(new WebinarEvent__e(salesforce_id__c = 'Sales3'));
        webinarEvents.add(new WebinarEvent__e(salesforce_id__c = 'Sales4'));
        return webinarEvents;
    }
    public static void publishEvents(){
        List<WebinarEvent__e> webinars = createWebinarEvents();
        List<Database.SaveResult> results = EventBus.publish(webinars);

        for(Database.SaveResult saveResult : results){
            if(saveResult.isSuccess()){
                System.debug('We did it guys!!!');
            }else{
                for(Database.Error error: saveResult.getErrors()){
                    System.debug('We fudged up, it is because: ' +
                            error.getStatusCode() + ' - ' +
                            error.getMessage());
                }
            }
        }
    }
}