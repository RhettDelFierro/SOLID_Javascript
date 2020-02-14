/*
*
Interface segregation principle

Organize by separating the things something cares about which leads to decoupling.
We can have many garages as we want.

wife     kids     me
  \      |       /
       garage
        .get_tools()
        .get_decorations()
        .get_toys()

The garage offers a single general interface to all of it’s clients.
Each has access to every public method the garage offers and the responsibility of understanding them, even though each client is only interested in a subset of those methods.

The Integration Segregation Principle states that multiple client specific interaces are better than having a single general interface. In other words, give each of your clients their own garage:

wife                                   kids                                   me
   |                                        |                                  |
wife_garage                        kids_garage                        my_garage
   .get_decorations()                   .get_decorations()             .get_tools()
                     \                      |                    /
                      \                     |                   /
                                          GARAGE

-Three new interfaces, each specific to the client they serve.
-They only include the methods that each client cares about. No more, no less.
-This dramatically reduces the scope of knowledge that clients need to interact with the garage object.
-A new engineer on one of these client teams would ramp up much more quickly on the project because they didn’t have to understand the entire garage class.
 Rather, they only had to understand the smaller surface area of  the client-specific interface.

This technique works best when the clients have different interests and minimal overlapping functionality.
However, it is possible to take a popular method and make it available across multiple interfaces.
For example: the garden hose may be used for different reasons by all three clients:

wife                                              kids                                      me
   |                                               |                                         |
wife_garage                                    kids_garage                                 my_garage
   .get_decorations()                              .get_decorations()                        .get_tools()
   .get_hose()                                     .get_hose()                               .get_hose()
                            \                      |                               /
                             \                     |                              /

                                                 GARAGE

-Interestingly, the garden hose implementations might be identical or may be different behind each interface.
-The vital part is that the implementation detail is hidden away from the client.
 They neither know, nor care. All they know is they have a garden hose to use, full stop.

-The Integration Segregation Principle states that many client-specific interfaces are better than one generic interface.


In code:
If you have a enormous user data access object that sometimes represents an admin, sometimes represents a free trial user, and sometimes just a plain user. The admin parts of the code don’t care about free users or plain users, they only really care about the admin functionality. The free trial upgrade part of the application doesn’t care about admins or plain users, it only cares about free trial functionality.
Given this, you should be able to create client-specific interfaces in between the big user data access object and the code that actually uses it:


member page                                         admin page                                   upgrade page
        |                                                |                                              |
member_user                                         admin_user                                     trial_user
   .address()                                            .ldap_user()                                   .days_left()
   .name()                                               .name()                                        .name()
                            \                            |                               /
                             \                           |                              /

                             					                  USER

Note that everything that is common (.name()), is available in each interface.

So, while you may not be able to change the fact that you have an enormous data access object in the system, you are now protecting other teams from that knowledge using client-specific interfaces.

Approach #1 extraction

*
*
*
* */