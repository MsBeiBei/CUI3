function test(){
    try{

    }catch(error){
        
    }
}

class UserAccount {
    name: string;
    accountType:number = undefined;
   
    email: string | undefined = undefined;
 
    address: string | undefined;
   
    constructor(name: string) {
      this.name = name;
      // Note that this.email is not set
    }
  }