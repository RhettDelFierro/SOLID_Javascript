
/*
* IDEALLY, we'd like to avoid making changes to these view components. The view is fine.
*
* All we really want to change out is the server no longer using the paintjs2000 server
* and instead using the resources that the super investor is offering through their services.
*
* If it were as simple as chaning the url, we'd be fine but their services work differently and
* their returned data shape and keys/values is drastically different. There is no id property and no color property.
*
* We need to update the code in order to be able to bounce back and forth between the two separate sets of services.
*
*
* Before we go making any changes to the code, we first want to go through and take a look at what parts of the code are:
* 1. The high-level policy.
* 2. The low-level implementation details.
*
* We find that:
*
* The App component which generally is going to be all about high-level policy, this is about the highest level we can get in our application.
* It KNOWS that it needs to be able to fetchColorData
* It KNOWS that it needs to be able to updateColorCount
* Both of these are high-level POLICIES - they talk about the kind of CAPABILITIES that the system needs to be able to have.
*
* Inside of these policies (both functions - the function body):
* These are the low-level implementation details.
* The fact that we are using http requests with ajax/fetch rather than websockets or something else. This transport level is an implementation detail.
* The fact that we are hitting the painjs2000.com server is an implementation detail.
* The fact that we are using mode: cors is an implementation detail.
* The fact that we are pulling json out with res.json() is an implementation detail.
* etc.
*
* However,
* In the final .then, where this.setState({colorData: payload.colors}) are called:
* THIS IS MORE OF A HIGH-LEVEL POLICY KIND OF CONCERN because we're saying that given a certain payload/response/data we have retrieved, we're going to hand this over to the state/to the color data.
* Then we know that there are other view-level concerns that are going to figure out how display that.
*
* This means that we really need to remove everything in both of those functions up to the this.setState({}) call.
* extract it out so that we can separate our high-level policy and our low-level implementation details.
*
* Now, before we go make changes to the logic: before we add new servers or new transports, new logic to the way we're dealing with data,
* We want to extract out these low-level implementation details so that we can then later do that swap out very cleanly.
* The high-level details will stay in place and everything else needs to be delegated off to something else:
* Perhaps a client: perhaps we need some kind of data client that we're going to hit.
* */