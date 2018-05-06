export default class Person {

  constructor(userid, name) {
      this.userid = userid;
      this.name = name;
      this.totalPoints = 0;
      this.plants = ['null'];
  }
  toString(){
	  return this.name;
  }
  addPoints(pointvalue){
	  this.totalPoints += pointvalue;
  }
  addPlant(plantname, pointvalue){
	  var str = plantname + " - " + pointvalue + " pts";
	  this.plants.push(str);
	  this.addPoints(pointvalue);
  }
  getUserId(){
	  return this.userid;
  }
  getName(){
	  return this.name;
  }
  getTotalPoints(){
	  return this.totalPoints;
  }
  getPlants(){
	  return this.plants;
  }
}