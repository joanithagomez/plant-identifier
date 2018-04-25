export default class Room {

  constructor(roomname, endingtime, allpoints) {
      this.roomname = roomname;
	  this.endingtime = endingtime;
      this.allpoints = allpoints;
	  this.people = [];
  }
  toString(){
	  return this.roomname;
  }
  personExists(userid){
    var i;
    for(i = 0; i < this.people.length; i++){
      if(userid == this.people[i].getUserId()){
        return true;
      }
    }
    return false;
  }
  addPeople(person){
      this.people.push(person);
  }
  getRoomName(){
	  return this.roomname;
  }
  getEndingTime(){
	  return this.endingtime;
  }
  getAllPoints(){
	  return this.allpoints;
  }
  getPeople(){
	  return this.people;
  }
  getWinner(){ // returns a string of the winner and his/her points :)
    var max = 0;
    var username = "";
    var i;
    for(i = 0; i < this.people.length; i++){
      var temppoints = this.people[i].getTotalPoints();
      if(max < temppoints){
        max = temppoints;
        username = this.people[i].getName();
      }
    }
    return username + " has won with " + max + " pts!";
  }
  getPerson(userid){
    var i;
    for(i = 0; i < this.people.length; i++){
      if(userid == this.people[i].getUserId()){
        return this.people[i];
      }
    }
  }
  updatePersonPoints(userid, plant, index){
    var i;
    for(i = 0; i < this.people.length; i++){
      if(userid == this.people[i].getUserId()){

        this.people[i].addPlant(plant, this.allpoints[index]);
        break;
      }
    }
  }
}