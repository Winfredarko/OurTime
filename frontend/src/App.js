import React, { Component } from 'react';
import MenuContainer from "./MenuContainer";
import Calendar from "react-big-calendar";
import moment from "moment";
import Header from './Header.js';
import "./App.css";



import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class App extends Component {

  constructor(props) {
    super(props);

    const token = this.props.tokenFromLogIn;

    var groups = {};
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    fetch('http://localhost:4000/profile/getallgroups', {
    method: 'GET',
    headers: myHeaders,
    })
      .then(function(response) { 
      return response.json();
      })
      .then(function(myJson) {
        console.log("IN APPP.JS \n\n\n")
        // console.log(JSON.stringify(myJson));
        myJson.groups.forEach(function(group){
          // console.log(group.groupId);
          groups[group.groupId] = group;
        });
        console.log(groups);
           
      }
      );

    this.state = { 
      isAuthenticated: false,
      user: null,
      token: token,
      stateCalAllGroups: [], 
      stateCalSingleGroup: [],
      isSingleGroup: false,
      count: 0,
      groups: groups,
      dbInfo: ''
    };

    console.log(this.state.groups);

    // this.
      
      this.createGroup = this.createGroup.bind(this);
      this.deleteGroup = this.deleteGroup.bind(this);
      this.updateGroup = this.updateGroup.bind(this);
      this.viewSingleGroup = this.viewSingleGroup.bind(this);
      this.viewAllGroups = this.viewAllGroups.bind(this);
      this.getmyFreeTime = this.getmyFreeTime.bind(this);
  }

  // TO BE DEFINED IN LOGINPAGE.JS
  // logout = () => {
  //     this.setState({isAuthenticated: false, token: '', user: null})
  // };

  onFailure = (error) => {
      alert(error);
  };


  getmyFreeTime = () => {
          
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', this.state.token);

    fetch('http://localhost:4000/profile/myfreetime', {
    method: 'GET',
    headers: myHeaders,
    })
          .then(function(response) { 
          return response.json();
          })
          .then(function(myJson) {
            //console.log("in getmyFreeTime")
            //console.log(JSON.stringify(myJson.events));
            this.setState({
              stateCalAllGroups: myJson.events,
              isSingleGroup: false
            });
        }.bind(this)
        );
  }

  // Shows the free times of a singular group, given the groupID
  viewGroup = (groupID, isSingle) => {
    //console.log(groupID)
    console.log("Call to view group with ID: " + groupID);
    

/** */
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', this.state.token);
    myHeaders.append('groupid', groupID)

    fetch('http://localhost:4000/profile/viewsinglegroup', {
    method: 'GET',
    headers: myHeaders,
    })
          .then(function(response) { 
          return response.json();
          })
          .then(function(group) {
            // do 
            console.log(group)
            if (group.group.freetimes)
            {
              const groupFreeTimes = [];
              group.group.freetimes[0].forEach(function(event){
                var date = {start: new Date(event.start),
                            end: new Date(event.end),
                            title: group.group.groupName}
                groupFreeTimes.push(date);
              });
              console.log( groupFreeTimes);
              if (isSingle){
                this.setState({ 
                  //
                  stateCalSingleGroup: groupFreeTimes,
                  isSingleGroup: true
                });
              }
              else 
              {
                var allGroups = new Set(this.state.stateCalAllGroups.concat(groupFreeTimes));
                this.setState({
                  //
                  stateCalAllGroups: [...allGroups],
                  isSingleGroup: false
                });
              }
              
            //console.log(this.state.stateCalSingleGroup, this.state.isSingleGroup);
          }
        }.bind(this)
        );
      }





/**** */
  viewSingleGroup = (groupId) => {
    console.log("Call to view single group");
    this.viewGroup(groupId, true);
  }
    

  viewAllGroups = () => {
    console.log("Call to view all groups");
    console.log(Object.keys(this.state.groups));
    Object.keys(this.state.groups).forEach(function(groupId) {
      this.viewGroup(groupId, false);
      
      console.log("Groups: ", this.state.groups[groupId]);
    }.bind(this))
  }

    //var allGroupTimes = new Set();
    // for (var group in this.state.groups) {
    //   if (group.events)
    //     allGroupTimes.add(group.events);
    // // }
    // var groups = {};
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Authorization', this.state.token);

    // fetch('http://localhost:4000/profile/getallgroups', {
    // method: 'GET',
    // headers: myHeaders,
    // })
    //   .then(function(response) { 
    //   return response.json();
    //   })
    //   .then(function(myJson) {
    //     console.log("IN APPP.JS \n\n\n")
    //     // console.log(JSON.stringify(myJson));
    //     myJson.groups.forEach(function(group){
    //       // console.log(group.groupId);
    //       groups[group.groupId] = group;
    //     });
         
    //   }
    //   );

    //   console.log("Call for groups", groups[1547608759503]);
    //   for (const [groupId, group] of Object.entries(groups))
    //   console.log("Call for groups: ", group);   

    // const groupFreeTimes = [];
    // //for (var group in groups) console.log(group);

    // // console.log("Group free times: " + groups[groupId].group.freetimes);
    // Object.keys(groups).forEach(function(groupId) {
    // //this.viewGroup(groupId, false);
    
    //   console.log("Groups: ", groups[groupId]);
    //   if (groups[groupId].group.freetimes)
    //   {
        
        
    //     groups[groupId].group.freetimes[0].forEach(function(event){
    //       var date = {start: new Date(event.start),
    //                   end: new Date(event.end),
    //                   title: groups[groupId].group.groupName}
    //       groupFreeTimes.add(date);
    //     });
    //   }

    //   console.log("Call to view group with ID: " + groupId);
    

/** */

    // let allGroupTimesArray = [];
    
    // allGroupTimes.forEach(v => allGroupTimesArray.push(v));
    // console.log("Ideal calendar state", allGroupTimesArray);

    // this.setState({
    //   stateCalAllGroups: allGroupTimesArray,
    //   isSingleGroup: false
    // });

    // console.log("Current Calendar State", this.state.stateCalAllGroups, this.state.isSingleGroup);
  
  // }); 

  // this.setState({
  //   //
  //   stateCalAllGroups: groupFreeTimes,
  //   isSingleGroup: false
  // });

  // console.log(this.state.stateCalAllGroups);
  // console.log(groupFreeTimes);
// }
        

/* Changes state of groups 
  ADD: Adds group given group nickname and a Set object of emails
  DELETE: Deletes group given groupID
  UPDATE: Updates group members given groupID, a Set object of
          emails to delete, and a Set object of emails to add */
  
  createGroup = (groupName, groupEmails, groupId) => {
    //groupID = ; // NEED TO SET TO UNIQUE NUMBER NOT IN APP (perhaps hashing of group name?)
    // id = Date.now()
    //groupEmails = new Set(groupEmails.replace(/\s+/g, '').split(","));

    var newGroup = {
      groupName: groupName, 
      groupEmails: groupEmails,
      groupId: groupId,
    };

    // send data to database
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', this.state.token);
    myHeaders.append('groupid', newGroup.groupId)
    myHeaders.append('groupname', newGroup.groupName)
    myHeaders.append('groupemails', newGroup.groupEmails)
    
    fetch('http://localhost:4000/profile/creategroup', {
          method: 'GET',
          headers: myHeaders,
      })
      .then(function(response) {  
          return response.json();
      })
      .then(function(group) {
          //console.log(JSON.stringify(myJson)); ///* myJson consists of a group: groupName,groupId,users, invalidUsers,events,freetimes*/
          // this.setState({dbInfo: myJson.here}); 
          // Get events of group from database
          //newGroup.events = myJson.events;
          
          var currGroups = this.state.groups;
      
          

            // var freetimes = group.freetimes;
            // // console.log(freetimes);
            // if (freetimes)
            // {
              
            //   freetimes.map(function(freetime){
            //     freetime.title = groupName;
            //     return freetime;
            // });
            // }
            // else console.log("Event doesn't exist");
            

            var newGroup = {
              groupName: groupName, 
              groupEmails: groupEmails, 
              groupId: groupId,
              // freetimes: freetimes
            };
            
            currGroups[groupId] = newGroup;
            // console.log("New group events: " + newGroup.events);
            // console.log("New group: ", currGroups[groupID].events);
            this.setState({groups: currGroups});

            console.log("Added this group: " + currGroups[groupId].groupId + ", " + currGroups[groupId].groupName);//this.state.groups);
        }.bind(this)
    );
  }


  deleteGroup = (groupID) => {
    var filteredGroups = this.state.groups;
    delete filteredGroups[groupID];
    
    this.setState({groups: filteredGroups});
    //console.log(this.state.groups);
    //console.log("djsandkajsndkas", groupID)

    /**********/
    // send data to database
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', this.state.token);
    myHeaders.append('groupid', groupID)
    
      fetch('http://localhost:4000/profile/deletegroup', {
            method: 'GET',
            headers: myHeaders,
        })
        .then(function(response) {  
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
            this.setState({dbInfo: myJson.here}); 
        }.bind(this)
    );
    /*************/



  }


  // newMembers and oldMembers are list
  updateGroup = (groupID, newMembers, oldMembers) => {

    var updatedGroups = this.state.groups;
    //console.log(updatedGroups[groupID] == true);
    if (updatedGroups[groupID])
    {
      //console.log("Yup");
      for (var newMember of newMembers)
        updatedGroups[groupID].emails.add(newMember);
      for (var oldMember of oldMembers)
        updatedGroups[groupID].emails.delete(oldMember);
    }
    // send data to database
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', this.state.token);
    myHeaders.append('groupid', groupID)
    myHeaders.append('oldgroupmembers', oldMembers)
    myHeaders.append('newgroupmembers', newMembers)

      fetch('http://localhost:4000/profile/updategroup', {
            method: 'GET',
            headers: myHeaders,
        })
        .then(function(response) {  
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
            this.setState({dbInfo: myJson.here}); 
            console.log("Current state info: " + this.state.dbInfo);
        }.bind(this)
    );
  }


    



  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {

    return (
        <div>
        <div>
           <Header 
              logout={this.props.logout}/>
        </div>
        
          <div className="row">
            <div className="column menu">
              <MenuContainer 
                createGroup={this.createGroup}
                deleteGroup={this.deleteGroup}
                updateGroup={this.updateGroup}
                onSubmit={this.onGroupFormSubmit}
                viewAllGroups={this.viewAllGroups}
                viewSingleGroup={this.viewSingleGroup}
                groups={this.state.groups}
              />
            </div>

            <div className="column calendar">
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                //events = {[]}
                events={this.state.isSingleGroup ? this.state.stateCalSingleGroup : this.state.stateCalAllGroups}
                style={{height: "80vh" }}
              />
            </div>
          
          </div>

          {/* <div style={{ padding: "10px" }}>
            
            <button onClick={() => this.getmyFreeTime()}>
              GET MY FREE TIME
            </button>

          </div> */}

        
  
        </div>
      );
    }
  }
  
  export default App;
    
    