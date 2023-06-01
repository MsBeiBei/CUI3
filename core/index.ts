function test(){
    try{

    }catch(error){
        
    }
}

class UserAccount {
    name: string;
   
    email: string | undefined = undefined;
 
    address: string | undefined;
   
    constructor(name: string) {
      this.name = name;
      // Note that this.email is not set
    }
  }

  function Person(name:String, age:String) {
    this.name = name;
    this.age = age;
  }
  