#STAGE 1 - NOTIFICATION PRIORITY 

##Problem Statement 
Design a notification system that can handle different types of notifications and prioritize them based on user preferences and urgency(Top 10 notifications in this case). The system should be scalable to accommodate a large number of users and notifications.

##Solution 
This solution fetches notifications from an API and processes them to display the **Top 10 most important notifications** based on priority and recency.

##Approach 

### Creating weight maps 

placement> result> event

assigned priority weights:
bash ''' Placement: 3,
Result: 2,
Event: 1 '''

### Sorting 

1. a and b are compared for the weights.
2. If two notifications have the same priority:
   -They are compared using their timestamps.
   -More recent notifications are given preference.
3. After sorting, the first 10 notifications are selected using array slicing.
4. Display output.

### Handling real time notification
A **Min Heap (Priority Queue)** of size 10 can be used.

Working:
1. Insert each new notification into the heap.
2. If heap size exceeds 10:
    -Remove the lowest-priority notification.
4. This ensures only the top 10 are maintained at all times.


## Folder Structure

- created auth.js for api calls and secrets (didnot push that).
- stage.js for main code login.
- access_token is hidden.
- terminal output png attached.


